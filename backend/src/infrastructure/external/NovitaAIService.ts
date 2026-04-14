/**
 * NovitaAIService.ts
 * ─────────────────────────────────────────────────────────────
 * Servicio que maneja la comunicación con la API de novita.ai.
 *
 * Este servicio construye el SYSTEM PROMPT con contexto de:
 *   1. País secreto (para el juego de geografía)
 *   2. Datos deportivos (para responder sobre deportes)
 *
 * La IA detecta automáticamente si la pregunta es sobre
 * geografía o deportes y responde apropiadamente.
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

/**
 * askAI
 * ─────────────────────────────────────────────────────────────
 * Envía la pregunta del usuario a novita.ai con contexto dual:
 *   - Datos del país secreto (juego de geografía)
 *   - Datos deportivos (consultas sobre deportes)
 *
 * @param userQuestion  - La pregunta del usuario
 * @param country       - El país secreto del juego (puede ser null)
 * @param sportsContext - Todos los datos deportivos en memoria
 * @param chatHistory   - Historial de mensajes previos
 * @returns             - La respuesta de la IA
 * ─────────────────────────────────────────────────────────────
 */
export async function askAI(
  userQuestion: string,
  country: Country | null,
  sportsContext: SportsContext,
  chatHistory: ChatMessage[] = []
): Promise<string> {
  // 1. Construir el system prompt con AMBOS contextos
  const systemPrompt = buildSystemPrompt(country, sportsContext);

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
 * Construye las instrucciones completas para la IA con
 * contexto de países Y deportes.
 *
 * La IA detecta automáticamente el tema de la pregunta y
 * responde usando el contexto apropiado.
 * ─────────────────────────────────────────────────────────────
 */
function buildSystemPrompt(
  country: Country | null,
  sportsContext: SportsContext
): string {
  // ── Construir contexto de país ─────────────────────────────
  const countrySection = buildCountryContext(country);

  // ── Construir contexto deportivo ───────────────────────────
  const sportsSection = buildSportsContext(sportsContext);

  return `
Eres un asistente inteligente y amigable que puede responder sobre DOS temas principales.
Detecta automáticamente si la pregunta del usuario es sobre GEOGRAFÍA o sobre DEPORTES y responde apropiadamente.

═══════════════════════════════════════════════════
MODO 1: JUEGO DE GEOGRAFÍA (Guess the Country)
═══════════════════════════════════════════════════
${countrySection}

═══════════════════════════════════════════════════
MODO 2: INFORMACIÓN DEPORTIVA
═══════════════════════════════════════════════════
Si el usuario pregunta sobre deportes, equipos, jugadores, partidos o ligas,
usa la siguiente base de datos para responder con información precisa:

${sportsSection}

REGLAS GENERALES:
- Responde siempre en el mismo idioma que el usuario usa para preguntar.
- Si la pregunta es sobre geografía, sigue las reglas del juego de adivinanza.
- Si la pregunta es sobre deportes, responde directamente con los datos que tienes.
- Si no tienes la información, di honestamente que no la tienes.
- Mantén las respuestas concisas y útiles.
  `.trim();
}

/**
 * buildCountryContext
 * Construye la sección del prompt relacionada con el juego de países.
 */
function buildCountryContext(country: Country | null): string {
  if (!country) {
    return `No hay un país secreto seleccionado actualmente.
Si el usuario pregunta sobre el juego de geografía, dile que inicie una nueva partida.`;
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
Si el usuario hace preguntas sobre un país misterioso, eres un game host divertido.

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
  `.trim();
}

/**
 * buildSportsContext
 * Construye la sección del prompt con todos los datos deportivos.
 * Los formatea como texto legible para que la IA pueda buscar en ellos.
 */
function buildSportsContext(ctx: SportsContext): string {
  // Formatear deportes
  const sportsText = ctx.sports
    .map((s) => `- ${s.name} (ID: ${s.id})`)
    .join("\n");

  // Formatear ligas con su deporte
  const leaguesText = ctx.leagues
    .map((l) => {
      const sport = ctx.sports.find((s) => s.id === l.sport_id);
      return `- ${l.name} (ID: ${l.id}) — País: ${l.country}, Deporte: ${sport?.name ?? "?"}`;
    })
    .join("\n");

  // Formatear equipos con su liga
  const teamsText = ctx.teams
    .map((t) => {
      const league = ctx.leagues.find((l) => l.id === t.league_id);
      return `- ${t.name} (ID: ${t.id}) — Liga: ${league?.name ?? "?"} `;
    })
    .join("\n");

  // Formatear jugadores con su equipo y stats
  const playersText = ctx.players
    .map((p) => {
      const team = ctx.teams.find((t) => t.id === p.team_id);
      const statsStr = Object.entries(p.stats)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ");
      return `- ${p.name} (#${p.number}, ${p.position}) — Equipo: ${team?.name ?? "?"} — Stats: ${statsStr}`;
    })
    .join("\n");

  // Formatear partidos
  const matchesText = ctx.matches
    .map((m) => {
      const home = ctx.teams.find((t) => t.id === m.home_team_id);
      const away = ctx.teams.find((t) => t.id === m.away_team_id);
      const scoreStr =
        m.status === "finished" && m.score
          ? ` — Resultado: ${m.score.home}-${m.score.away}`
          : "";
      return `- ${home?.name ?? "?"} vs ${away?.name ?? "?"} (${m.date}) — Estado: ${m.status}${scoreStr}`;
    })
    .join("\n");

  return `
DEPORTES:
${sportsText}

LIGAS:
${leaguesText}

EQUIPOS:
${teamsText}

JUGADORES:
${playersText}

PARTIDOS:
${matchesText}
  `.trim();
}
