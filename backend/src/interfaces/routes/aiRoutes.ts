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

export function createAIRoutes(controller: AIController): Router {
  const router = Router();

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
