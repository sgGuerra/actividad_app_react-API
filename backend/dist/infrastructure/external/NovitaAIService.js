"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = askAI;
const openai_1 = __importDefault(require("openai"));
// Inicializar OpenAI usando la configuración de Novita AI
const openai = new openai_1.default({
    baseURL: "https://api.novita.ai/v3/openai",
    // Usar la clave de Novita configurada en el .env, o fallback
    apiKey: process.env.NOVITA_API_KEY || "YOUR_NOVITA_API_KEY",
});
/**
 * Función principal para interactuar con la IA.
 * Construye el sistema, formatea el historial y envía la consulta.
 */
async function askAI(question, country, sportsCtx, chatHistory = []) {
    // Construir el "System Prompt" (instrucciones maestras)
    const systemPrompt = buildSystemPrompt(country, sportsCtx);
    // Mapear el historial del formato de nuestra app al formato de OpenAI/Novita
    const messages = chatHistory.map((msg) => ({
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
    }
    catch (error) {
        console.error("Error al llamar a Novita AI:", error);
        throw new Error("No se pudo conectar con la IA.");
    }
}
/**
 * buildSystemPrompt
 * Crea las instrucciones iniciales para la IA.
 * Le dice qué rol jugar y le inyecta la información que necesita saber.
 */
function buildSystemPrompt(country, sportsCtx) {
    const baseInstructions = `
Eres un game host divertido y también un experto en deportes mundiales.
Tus respuestas deben ser precisas, amigables y ayudar al usuario.
Puedes responder en el mismo idioma en el que te pregunten.
`;
    let countryInstructions = "";
    if (country) {
        countryInstructions = buildCountryContext(country);
    }
    else {
        countryInstructions = `
No hay ningún país secreto en juego en este momento.
Si el usuario pregunta sobre un país para adivinar, dile que el modo juego no está activo.
`;
    }
    const sportsInstructions = buildSportsContext(sportsCtx);
    return `
${baseInstructions.trim()}

--- CONTEXTO MODO JUEGO (PAÍS SECRETO) ---
${countryInstructions.trim()}

--- CONTEXTO DEPORTIVO (DATOS REALES) ---
Aquí tienes información en tiempo real sobre los deportes, equipos o jugadores que el usuario mencionó:
${sportsInstructions.trim()}
`;
}
/**
 * buildCountryContext
 * Extrae y formatea los datos clave del país secreto para que la IA los conozca.
 */
function buildCountryContext(country) {
    const name = country.name.common;
    const capital = country.capital?.[0] ?? "Unknown";
    const region = country.region ?? "Unknown";
    const subregion = country.subregion ?? "Unknown";
    const currencyCode = country.currencies
        ? Object.keys(country.currencies)[0]
        : null;
    const currencyName = currencyCode && country.currencies
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
3. Si adivina CORRECTAMENTE: "¡🎉 Sí! ¡El país es ${name}!"
4. Si adivina MAL: "❌ No, ese no es. ¡Sigue intentando!"
5. Máximo 15 palabras por respuesta en modo juego.
  `.trim();
}
/**
 * buildSportsContext
 * Construye la sección del prompt con todos los datos deportivos dinámicos.
 */
function buildSportsContext(ctx) {
    let contextParts = [];
    if (ctx.players && ctx.players.length > 0) {
        contextParts.push("JUGADORES ENCONTRADOS:");
        for (const p of ctx.players) {
            contextParts.push(`- Nombre: ${p.strPlayer}`);
            contextParts.push(`  Deporte: ${p.strSport}, Equipo Actual: ${p.strTeam}, Nacionalidad: ${p.strNationality}`);
            contextParts.push(`  Posición: ${p.strPosition}, Estado: ${p.strStatus}`);
            if (p.strDescriptionEN)
                contextParts.push(`  Bio: ${p.strDescriptionEN.substring(0, 500)}...`);
            if (p.formerTeams && p.formerTeams.length > 0) {
                const fTeams = p.formerTeams.map((t) => t.strFormerTeam).join(", ");
                contextParts.push(`  Equipos Anteriores: ${fTeams}`);
            }
            if (p.honours && p.honours.length > 0) {
                const h = p.honours.map((t) => `${t.strHonour} (${t.strSeason})`).join(", ");
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
            if (t.strDescriptionEN)
                contextParts.push(`  Descripción: ${t.strDescriptionEN.substring(0, 500)}...`);
        }
    }
    return contextParts.length > 0 ? contextParts.join("\n") : "No hay contexto de jugadores o equipos activo en esta consulta.";
}
//# sourceMappingURL=NovitaAIService.js.map