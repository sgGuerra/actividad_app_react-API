/**
 * NovitaAIService.ts
 * ─────────────────────────────────────────────────────────────
 * Servicio que maneja la comunicación con la API de novita.ai.
 *
 * Este servicio construye el SYSTEM PROMPT según el gameMode:
 *   - "country" → Juego de adivinanza de país
 *   - "team"    → Juego de adivinanza de equipo deportivo
 *   - "player"  → Juego de adivinanza de jugador deportivo
 *
 * La API key viene de la variable de entorno NOVITA_API_KEY.
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { Sport } from "../../domain/entities/Sport";
import { League } from "../../domain/entities/League";
import { Team } from "../../domain/entities/Team";
import { Player } from "../../domain/entities/Player";
import { Match } from "../../domain/entities/Match";

// ── Configuración de novita.ai ───────────────────────────────
const NOVITA_BASE_URL = "https://api.novita.ai/v3/openai";
const MODEL = "meta-llama/llama-3.1-8b-instruct";

/** Estructura de un mensaje en el historial de chat */
export interface ChatMessage {
  role: "user" | "ai" | "system" | "assistant";
  text?: string;
  content?: string;
}

/** Todos los datos deportivos agrupados */
export interface SportsContext {
  sports: Sport[];
  leagues: League[];
  teams: Team[];
  players: Player[];
  matches: Match[];
}

/** Modo de juego */
export type GameMode = "country" | "team" | "player";

/**
 * askAI
 * ─────────────────────────────────────────────────────────────
 * Envía la pregunta del usuario a novita.ai con el prompt
 * adecuado según el gameMode.
 *
 * @param userQuestion  - La pregunta del usuario
 * @param country       - El país secreto (solo para mode "country")
 * @param sportsContext - Todos los datos deportivos en memoria
 * @param chatHistory   - Historial de mensajes previos
 * @param gameMode      - Modo de juego: "country" | "team" | "player"
 * @param secretTeam    - Equipo secreto (solo para mode "team")
 * @param secretPlayer  - Jugador secreto (solo para mode "player")
 * @returns             - La respuesta de la IA
 * ─────────────────────────────────────────────────────────────
 */
export async function askAI(
  userQuestion: string,
  country: Country | null,
  sportsContext: SportsContext,
  chatHistory: ChatMessage[] = [],
  gameMode: GameMode = "country",
  secretTeam: Team | null = null,
  secretPlayer: Player | null = null
): Promise<string> {
  // 1. Construir el system prompt según el modo de juego
  const systemPrompt = buildSystemPrompt(country, sportsContext, gameMode, secretTeam, secretPlayer);

  // 2. Armar el array de mensajes para la API
  const messages = [
    { role: "system", content: systemPrompt },
    // Incluir historial previo (máx 10 turnos para ahorrar tokens)
    ...chatHistory.slice(-10).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content || m.text || "",
    })),
    { role: "user", content: userQuestion },
  ];

  // 3. Llamar a la API de novita.ai
  const response = await fetch(`${NOVITA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  // 4. Manejar errores
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * buildSystemPrompt
 * ─────────────────────────────────────────────────────────────
 * Construye las instrucciones para la IA según el gameMode.
 * Cada modo tiene su propio prompt enfocado.
 * ─────────────────────────────────────────────────────────────
 */
function buildSystemPrompt(
  country: Country | null,
  sportsContext: SportsContext,
  gameMode: GameMode,
  secretTeam: Team | null,
  secretPlayer: Player | null
): string {
  if (gameMode === "team") {
    return buildTeamGamePrompt(secretTeam, sportsContext);
  }

  if (gameMode === "player") {
    return buildPlayerGamePrompt(secretPlayer, sportsContext);
  }

  // Default: country mode
  return buildCountryGamePrompt(country);
}

/**
 * buildCountryGamePrompt
 * Prompt completo para el modo "Guess the Country".
 */
function buildCountryGamePrompt(country: Country | null): string {
  if (!country) {
    return `Eres un asistente amigable. No hay un país secreto seleccionado. Dile al usuario que inicie una nueva partida.`;
  }

  const name = country.name?.common ?? "Unknown";
  const capital = country.capital?.[0] ?? "Unknown";
  const region = country.region ?? "Unknown";
  const subregion = country.subregion ?? "Unknown";

  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : null;
  const currencyName =
    currencyCode && country.currencies
      ? country.currencies[currencyCode].name
      : "Unknown";

  const lat = country.latlng?.[0] ?? 0;
  const lng = country.latlng?.[1] ?? 0;
  const hemisphere = lat >= 0 ? "Northern Hemisphere" : "Southern Hemisphere";

  return `
Eres un game host divertido para el juego "Guess the Country".
El jugador debe adivinar un país secreto haciendo preguntas.

El país secreto es: ${name}

Datos del país:
- Capital: ${capital}
- Región: ${region}
- Subregión: ${subregion}
- Moneda: ${currencyName} (${currencyCode})
- Ubicación: ${hemisphere}, ~${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(lng)}°${lng >= 0 ? "E" : "W"}

REGLAS DEL JUEGO:
1. NUNCA digas el nombre del país directamente, a menos que el jugador lo adivine.
2. Responde con SÍ, NO, o una pista muy breve.
3. Si adivina CORRECTAMENTE: "🎉 ¡Sí! ¡El país es ${name}!"
4. Si adivina MAL: "❌ No, ese no es. ¡Sigue intentando!"
5. Máximo 15 palabras por respuesta en modo juego.
6. Responde siempre en el mismo idioma que el usuario usa para preguntar.
  `.trim();
}

/**
 * buildTeamGamePrompt
 * Prompt completo para el modo "Guess the Team".
 */
function buildTeamGamePrompt(secretTeam: Team | null, ctx: SportsContext): string {
  if (!secretTeam) {
    return `Eres un asistente amigable. No hay un equipo secreto seleccionado. Dile al usuario que inicie una nueva partida.`;
  }

  const league = ctx.leagues.find((l) => l.id === secretTeam.league_id);
  const sport = ctx.sports.find((s) => s.id === secretTeam.sport_id);
  const teamPlayers = ctx.players.filter((p) => p.team_id === secretTeam.id);
  const teamMatches = ctx.matches.filter(
    (m) => m.home_team_id === secretTeam.id || m.away_team_id === secretTeam.id
  );

  const playersInfo = teamPlayers
    .map((p) => {
      const statsStr = Object.entries(p.stats).map(([k, v]) => `${k}: ${v}`).join(", ");
      return `- ${p.name} (#${p.number}, ${p.position}) — Stats: ${statsStr}`;
    })
    .join("\n");

  const matchesInfo = teamMatches
    .map((m) => {
      const home = ctx.teams.find((t) => t.id === m.home_team_id);
      const away = ctx.teams.find((t) => t.id === m.away_team_id);
      const scoreStr = m.status === "finished" && m.score ? ` — ${m.score.home}-${m.score.away}` : "";
      return `- ${home?.name ?? "?"} vs ${away?.name ?? "?"} (${m.date}) ${m.status}${scoreStr}`;
    })
    .join("\n");

  return `
Eres un game host divertido para el juego "Guess the Team".
El jugador debe adivinar un equipo deportivo secreto haciendo preguntas.

El equipo secreto es: ${secretTeam.name}

Datos del equipo:
- Deporte: ${sport?.name ?? "Unknown"}
- Liga: ${league?.name ?? "Unknown"}
- País de la liga: ${league?.country ?? "Unknown"}

Jugadores del equipo:
${playersInfo || "- No hay jugadores registrados"}

Partidos del equipo:
${matchesInfo || "- No hay partidos registrados"}

REGLAS DEL JUEGO:
1. NUNCA digas el nombre del equipo directamente, a menos que el jugador lo adivine.
2. Responde con SÍ, NO, o una pista muy breve.
3. Puedes dar pistas sobre el deporte, la liga, el país o los jugadores, pero NUNCA el nombre del equipo.
4. Si adivina CORRECTAMENTE: "🎉 ¡Sí! ¡El equipo es ${secretTeam.name}!"
5. Si adivina MAL: "❌ No, ese no es. ¡Sigue intentando!"
6. Máximo 15 palabras por respuesta en modo juego.
7. Responde siempre en el mismo idioma que el usuario usa para preguntar.
  `.trim();
}

/**
 * buildPlayerGamePrompt
 * Prompt completo para el modo "Guess the Player".
 */
function buildPlayerGamePrompt(secretPlayer: Player | null, ctx: SportsContext): string {
  if (!secretPlayer) {
    return `Eres un asistente amigable. No hay un jugador secreto seleccionado. Dile al usuario que inicie una nueva partida.`;
  }

  const team = ctx.teams.find((t) => t.id === secretPlayer.team_id);
  const league = team ? ctx.leagues.find((l) => l.id === team.league_id) : null;
  const sport = team ? ctx.sports.find((s) => s.id === team.sport_id) : null;
  const statsStr = Object.entries(secretPlayer.stats)
    .map(([key, val]) => `${key}: ${val}`)
    .join(", ");

  return `
Eres un game host divertido para el juego "Guess the Player".
El jugador debe adivinar un jugador deportivo secreto haciendo preguntas.

El jugador secreto es: ${secretPlayer.name}

Datos del jugador:
- Posición: ${secretPlayer.position}
- Número: ${secretPlayer.number}
- Equipo: ${team?.name ?? "Unknown"}
- Liga: ${league?.name ?? "Unknown"}
- Deporte: ${sport?.name ?? "Unknown"}
- Estadísticas: ${statsStr}

REGLAS DEL JUEGO:
1. NUNCA digas el nombre del jugador directamente, a menos que el usuario lo adivine.
2. Responde con SÍ, NO, o una pista muy breve.
3. Puedes dar pistas sobre la posición, el número, el equipo, la liga, el deporte o las estadísticas, pero NUNCA el nombre.
4. Si adivina CORRECTAMENTE: "🎉 ¡Sí! ¡El jugador es ${secretPlayer.name}!"
5. Si adivina MAL: "❌ No, ese no es. ¡Sigue intentando!"
6. Máximo 15 palabras por respuesta en modo juego.
7. Responde siempre en el mismo idioma que el usuario usa para preguntar.
  `.trim();
}
