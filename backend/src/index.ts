/**
 * index.ts — Entry Point del Backend
 * ─────────────────────────────────────────────────────────────
 * Este archivo crea y configura el servidor Express.
 *
 * Es el punto de entrada de la aplicación:
 *   1. Configura middlewares (CORS, JSON parsing)
 *   2. Monta todas las rutas bajo /api
 *   3. Inicia el servidor en el puerto 3001
 *
 * El frontend (Next.js en puerto 3000) enviará todas sus
 * peticiones API aquí, gracias al rewrite en next.config.js.
 * ─────────────────────────────────────────────────────────────
 */
import express from "express";
import cors from "cors";
import { setupRoutes } from "./interfaces/routes";

// ── Crear la aplicación Express ──────────────────────────────
const app = express();
const PORT = process.env.PORT || 3005;

// ── Middlewares ──────────────────────────────────────────────

/**
 * CORS (Cross-Origin Resource Sharing)
 * Permite que el frontend (puerto 3000) haga peticiones
 * al backend (puerto 3001) sin ser bloqueado por el navegador.
 */
app.use(
  cors({
    origin: "http://localhost:3000", // Solo permitir el frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

/**
 * express.json()
 * Parsea automáticamente el body de peticiones con Content-Type: application/json.
 * Sin esto, req.body sería undefined en los endpoints POST.
 */
app.use(express.json());

// ── Montar todas las rutas bajo /api ─────────────────────────
app.use("/api", setupRoutes());

// ── Ruta raíz — verificación rápida ─────────────────────────
app.get("/", (_req, res) => {
  res.json({
    message: "🏟️ Sports & Countries API — Backend",
    version: "1.0.0",
    endpoints: {
      sports: "/api/sports",
      teams: "/api/teams",
      players: "/api/players?team_id=100",
      matches: "/api/matches?league_id=10",
      countries: "/api/countries",
      randomCountry: "/api/countries/random",
      askAI: "POST /api/ask",
    },
  });
});

// ── Iniciar el servidor ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║  🏟️  Sports & Countries API                          ║
║  Servidor corriendo en: http://localhost:${PORT}         ║
║                                                       ║
║  Endpoints disponibles:                               ║
║    GET  /api/sports          → Todos los deportes     ║
║    GET  /api/sports/:id      → Deporte por ID         ║
║    GET  /api/teams           → Todos los equipos      ║
║    GET  /api/teams/:id       → Equipo por ID          ║
║    GET  /api/players?team_id → Jugadores por equipo   ║
║    GET  /api/matches?league_id → Partidos por liga    ║
║    GET  /api/countries       → Todos los países       ║
║    GET  /api/countries/random→ País aleatorio          ║
║    POST /api/ask             → Pregunta a la IA       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
