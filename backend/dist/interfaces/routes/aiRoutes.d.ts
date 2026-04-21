/**
 * aiRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Ruta para el endpoint de IA.
 * Recibe preguntas y devuelve respuestas inteligentes
 * con contexto de países y deportes.
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { AIController } from "../controllers/AIController";
export declare function createAIRoutes(controller: AIController): Router;
//# sourceMappingURL=aiRoutes.d.ts.map