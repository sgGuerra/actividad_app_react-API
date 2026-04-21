/**
 * MatchController.ts
 * ─────────────────────────────────────────────────────────────
 * Controller para el recurso "partidos".
 *
 * Soporta filtrado por liga con query params:
 *   GET /api/matches?league_id=10
 * ─────────────────────────────────────────────────────────────
 */
import { Request, Response } from "express";
import { GetMatchesByLeague } from "../../application/matches/GetMatchesByLeague";
export declare class MatchController {
    private getMatchesByLeague;
    constructor(getMatchesByLeague: GetMatchesByLeague);
    /**
     * GET /api/matches
     * GET /api/matches?league_id=10
     *
     * Filtra partidos por liga si se envía league_id como query param.
     */
    getAll: (req: Request, res: Response) => void;
}
//# sourceMappingURL=MatchController.d.ts.map