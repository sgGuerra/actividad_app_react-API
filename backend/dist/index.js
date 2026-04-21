"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./interfaces/routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express_1.default.json());
app.use("/api", (0, routes_1.setupRoutes)());
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
//# sourceMappingURL=index.js.map