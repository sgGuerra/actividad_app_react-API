import { Request, Response } from "express";
import { AskAI } from "../../application/ai/AskAI";
export declare class AIController {
    private askAI;
    constructor(askAI: AskAI);
    ask: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=AIController.d.ts.map