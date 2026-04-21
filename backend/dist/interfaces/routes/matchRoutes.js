"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatchRoutes = createMatchRoutes;
/**
 * matchRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "partidos".
 * Soporta filtrado por liga: GET /api/matches?league_id=10
 * ─────────────────────────────────────────────────────────────
 */
const express_1 = require("express");
function createMatchRoutes(controller) {
    const router = (0, express_1.Router)();
    /** GET /api/matches — Todos los partidos (opcionalmente filtrados por liga) */
    router.get("/", controller.getAll);
    return router;
}
//# sourceMappingURL=matchRoutes.js.map