import OpenAI from "openai";
import { Country } from "../../domain/entities/Country";

// Inicializar OpenAI usando la configuración de Novita AI
const openai = new OpenAI({
  baseURL: "https://api.novita.ai/v3/openai",
  // Usar la clave de Novita configurada en el .env, o fallback
  apiKey: process.env.NOVITA_API_KEY || "YOUR_NOVITA_API_KEY",
});

// Tipo de los mensajes de historial esperados desde el frontend
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Interfaz para agrupar los datos deportivos reales
export interface SportsContext {
  players: any[]; // Son de tipo PlayerDetail
  teams: any[];
}

/**
 * Función principal para interactuar con la IA.
 * Construye el sistema, formatea el historial y envía la consulta.
 */
export async function askAI(
  question: string,
  country: Country | null,
  sportsCtx: SportsContext,
  chatHistory: ChatMessage[] = []
): Promise<string> {
  // Construir el "System Prompt" (instrucciones maestras)
  const systemPrompt = buildSystemPrompt(country, sportsCtx);

  // Mapear el historial del formato de nuestra app al formato de OpenAI/Novita
  const messages: any[] = chatHistory.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // Añadir la pregunta actual del usuario al final
  messages.push({ role: "user", content: question });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: false, // Falso para esperar la respuesta completa
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.9,
    });

    return chatCompletion.choices[0].message?.content || "Sin respuesta.";
  } catch (error) {
    console.error("Error al llamar a Novita AI:", error);
    throw new Error("No se pudo conectar con la IA.");
  }
}

/**
 * buildSystemPrompt
 * Crea las instrucciones iniciales para la IA.
 * Le dice qué rol jugar y le inyecta la información que necesita saber.
 */
function buildSystemPrompt(
  country: Country | null,
  sportsCtx: SportsContext
): string {
  const baseInstructions = `
Eres un game host divertido y también un experto en deportes mundiales y geografía.
Tus respuestas deben ser precisas, amigables y ayudar al usuario.
Puedes responder en el mismo idioma en el que te pregunten.
`;

  let targetName = "";
  let targetCategory = "";
  let contextData = "";

  if (country) {
    targetName = country.name.common;
    targetCategory = "país";
    contextData = buildCountryContext(country);
  } else if (sportsCtx.players && sportsCtx.players.length > 0) {
    targetName = sportsCtx.players[0].strPlayer;
    targetCategory = "jugador";
    contextData = buildSportsContext(sportsCtx);
  } else if (sportsCtx.teams && sportsCtx.teams.length > 0) {
    targetName = sportsCtx.teams[0].strTeam;
    targetCategory = "equipo";
    contextData = buildSportsContext(sportsCtx);
  }

  let rules = "";
  if (targetName) {
    rules = `
REGLAS DEL JUEGO:
1. NUNCA digas el nombre del ${targetCategory} directamente ("${targetName}"), a menos que el jugador lo adivine exactamente.
2. El usuario te hará preguntas para intentar adivinar el ${targetCategory} secreto. Responde con SÍ o NO y si vas a dar pistas, NO DEBEN SER MUY EXACTAS ni obvias, tienen que ser sutiles para que el jugador logre deducir la respuesta correcta por su cuenta.
3. Si el jugador hace una adivinanza directa y es CORRECTA: "¡🎉 Sí! ¡El ${targetCategory} es ${targetName}!"
4. Si el jugador hace una adivinanza directa y es INCORRECTA: "❌ No, ese no es. ¡Sigue intentando!"
5. Máximo 15 palabras por respuesta en modo juego.
`;
  } else {
    contextData = `
No hay ninguna categoría secreta en juego en este momento.
Si el usuario pregunta para adivinar, dile que el modo juego no está activo.
`;
  }

  return `
${baseInstructions.trim()}

--- CONTEXTO MODO JUEGO ---
${contextData.trim()}

${rules.trim()}
`;
}

/**
 * buildCountryContext
 * Extrae y formatea los datos clave del país secreto para que la IA los conozca.
 */
function buildCountryContext(country: Country): string {
  const name = country.name.common;
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
El país secreto es: ${name}

Datos del país:
- Capital: ${capital}
- Región: ${region}
- Subregión: ${subregion}
- Moneda: ${currencyName} (${currencyCode})
- Ubicación: ${hemisphere}, ~${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(lng)}°${lng >= 0 ? "E" : "W"}
  `.trim();
}

/**
 * buildSportsContext
 * Construye la sección del prompt con todos los datos deportivos dinámicos.
 */
function buildSportsContext(ctx: SportsContext): string {
  let contextParts = [];

  if (ctx.players && ctx.players.length > 0) {
    contextParts.push("JUGADORES ENCONTRADOS:");
    for (const p of ctx.players) {
        contextParts.push(`- Nombre: ${p.strPlayer}`);
        contextParts.push(`  Deporte: ${p.strSport}, Equipo Actual: ${p.strTeam}, Nacionalidad: ${p.strNationality}`);
        contextParts.push(`  Posición: ${p.strPosition}, Estado: ${p.strStatus}`);
        if (p.strDescriptionEN) contextParts.push(`  Bio: ${p.strDescriptionEN.substring(0, 500)}...`);
        
        if (p.formerTeams && p.formerTeams.length > 0) {
            const fTeams = p.formerTeams.map((t: any) => t.strFormerTeam).join(", ");
            contextParts.push(`  Equipos Anteriores: ${fTeams}`);
        }
        
        if (p.honours && p.honours.length > 0) {
            const h = p.honours.map((t: any) => `${t.strHonour} (${t.strSeason})`).join(", ");
            contextParts.push(`  Títulos: ${h}`);
        }
    }
  }

  if (ctx.teams && ctx.teams.length > 0) {
    contextParts.push("EQUIPOS ENCONTRADOS:");
    for (const t of ctx.teams) {
        contextParts.push(`- Nombre: ${t.strTeam} (${t.strCountry})`);
        contextParts.push(`  Deporte: ${t.strSport}, Liga: ${t.strLeague}, Fundación: ${t.intFormedYear}`);
        contextParts.push(`  Estadio: ${t.strStadium} (Capacidad: ${t.intStadiumCapacity})`);
        if (t.strDescriptionEN) contextParts.push(`  Descripción: ${t.strDescriptionEN.substring(0, 500)}...`);
    }
  }

  return contextParts.length > 0 ? contextParts.join("\n") : "No hay contexto de jugadores o equipos activo en esta consulta.";
}
