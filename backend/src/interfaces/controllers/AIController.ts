import { Request, Response } from "express";
import { AskAI } from "../../application/ai/AskAI";

export class AIController {
  constructor(private askAI: AskAI) {}

  ask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { question, country, playerName, teamName, history } = req.body;

      if (!question) {
        res.status(400).json({ error: "La pregunta es obligatoria" });
        return;
      }

      const answer = await this.askAI.execute(
        question,
        country ?? null,
        playerName ?? null,
        teamName ?? null,
        history ?? []
      );

      res.json({ answer });
    } catch (error) {
      console.error("Error en AI Controller:", error);
      res.status(500).json({ error: "Algo salió mal. Intenta de nuevo." });
    }
  };
}
