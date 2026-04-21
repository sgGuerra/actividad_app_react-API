import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { setupRoutes } from "./interfaces/routes";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api", setupRoutes());

app.get("/", (_req, res) => {
  res.json({
    message: "🌍🏆 Sports & Countries API – Backend",
    version: "2.0.0",
    endpoints: {
      players: {
        search: "/api/players/search?name=Messi",
        detail: "/api/players/:id/detail",
        byTeam: "/api/players/team/:teamId"
      },
      teams: {
        search: "/api/teams/search?name=Arsenal",
        byLeague: "/api/teams/league/:league",
        players: "/api/teams/:id/players"
      },
      countries: "/api/countries",
      randomCountry: "/api/countries/random",
      askAI: "POST /api/ask",
    },
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  🌍🏆  Sports & Countries API                          ║
║  Servidor corriendo en: http://localhost:${PORT}         ║
║                                                        ║
║  Endpoints disponibles:                                ║
║    GET  /api/players/search?name=X                     ║
║    GET  /api/players/:id/detail                        ║
║    GET  /api/teams/search?name=Y                       ║
║    GET  /api/teams/league/:league                      ║
║    GET  /api/countries                                 ║
║    GET  /api/countries/random                          ║
║    POST /api/ask                                       ║
╚════════════════════════════════════════════════════════╝
  `);
});
