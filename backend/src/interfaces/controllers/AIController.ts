/**
 * AIController.ts
 * ─────────────────────────────────────────────────────────────
 * Controller para el endpoint de IA.
 *
 * Recibe la pregunta del usuario, el país del juego, y el historial,
 * y devuelve la respuesta de la IA con contexto dual
 * (países + deportes).
 * ─────────────────────────────────────────────────────────────
 */
import { Request, Response } from "express";
import { AskAI } from "../../application/ai/AskAI";

export class AIController {
  constructor(private askAI: AskAI) {}

  /**
   * POST /api/ask
   * Body: { question: string, country: object|null, history: array }
   *
   * El body se envía como JSON desde el frontend.
   * Express lo parsea automáticamente con express.json() middleware.
   */
  ask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { question, country, history } = req.body;

      // Validación básica
      if (!question) {
        res.status(400).json({ error: "La pregunta es obligatoria" });
        return;
      }

      // Llamar al caso de uso con la pregunta y los contextos
      const answer = await this.askAI.execute(
        question,
        country ?? null,
        history ?? []
      );

      res.json({ answer });
    } catch (error) {
      console.error("Error en AI Controller:", error);
      res.status(500).json({ error: "Algo salió mal. Intenta de nuevo." });
    }
  };
}
