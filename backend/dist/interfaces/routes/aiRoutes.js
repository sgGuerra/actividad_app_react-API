"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAIRoutes = createAIRoutes;
/**
 * aiRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Ruta para el endpoint de IA.
 * Recibe preguntas y devuelve respuestas inteligentes
 * con contexto de países y deportes.
 * ─────────────────────────────────────────────────────────────
 */
const express_1 = require("express");
function createAIRoutes(controller) {
    const router = (0, express_1.Router)();
    /**
     * POST /api/ask
     * Body: { question: string, country: object|null, history: array }
     *
     * Este endpoint recibe datos en el BODY (no en params ni query)
     * porque estamos enviando objetos complejos (país, historial).
     */
    router.post("/", controller.ask);
    return router;
}
//# sourceMappingURL=aiRoutes.js.map