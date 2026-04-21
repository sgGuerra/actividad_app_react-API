"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCountryRoutes = createCountryRoutes;
/**
 * countryRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "países".
 * El backend actúa como proxy a REST Countries API.
 * ─────────────────────────────────────────────────────────────
 */
const express_1 = require("express");
function createCountryRoutes(controller) {
    const router = (0, express_1.Router)();
    /** GET /api/countries — Todos los países */
    router.get("/", controller.getAll);
    /** GET /api/countries/random — Un país aleatorio para el juego */
    router.get("/random", controller.getRandom);
    return router;
}
//# sourceMappingURL=countryRoutes.js.map