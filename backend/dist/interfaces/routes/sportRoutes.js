"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSportRoutes = createSportRoutes;
/**
 * sportRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Define las rutas HTTP para el recurso "deportes".
 *
 * Las rutas SOLO mapean URLs a métodos del controller.
 * No contienen lógica — eso va en el controller y los casos de uso.
 *
 * Patrón: Router → Controller → Use Case → Repository
 * ─────────────────────────────────────────────────────────────
 */
const express_1 = require("express");
function createSportRoutes(controller) {
    const router = (0, express_1.Router)();
    /**
     * GET /api/sports
     * Devuelve la lista completa de deportes.
     */
    router.get("/", controller.getAll);
    /**
     * GET /api/sports/:id
     * Devuelve un deporte específico.
     * :id es un ROUTE PARAM — se accede con req.params.id
     */
    router.get("/:id", controller.getById);
    return router;
}
//# sourceMappingURL=sportRoutes.js.map