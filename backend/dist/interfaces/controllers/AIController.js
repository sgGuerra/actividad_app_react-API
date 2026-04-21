"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
class AIController {
    constructor(askAI) {
        this.askAI = askAI;
        this.ask = async (req, res) => {
            try {
                const { question, country, playerName, teamName, history } = req.body;
                if (!question) {
                    res.status(400).json({ error: "La pregunta es obligatoria" });
                    return;
                }
                const answer = await this.askAI.execute(question, country ?? null, playerName ?? null, teamName ?? null, history ?? []);
                res.json({ answer });
            }
            catch (error) {
                console.error("Error en AI Controller:", error);
                res.status(500).json({ error: "Algo salió mal. Intenta de nuevo." });
            }
        };
    }
}
exports.AIController = AIController;
//# sourceMappingURL=AIController.js.map