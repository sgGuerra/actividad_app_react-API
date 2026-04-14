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

export class MatchController {
  constructor(private getMatchesByLeague: GetMatchesByLeague) {}

  /**
   * GET /api/matches
   * GET /api/matches?league_id=10
   *
   * Filtra partidos por liga si se envía league_id como query param.
   */
  getAll = (req: Request, res: Response): void => {
    const leagueIdParam = req.query.league_id as string | undefined;

    let leagueId: number | undefined;
    if (leagueIdParam) {
      leagueId = parseInt(leagueIdParam, 10);
      if (isNaN(leagueId)) {
        res.status(400).json({ error: "league_id debe ser un número válido" });
        return;
      }
    }

    const matches = this.getMatchesByLeague.execute(leagueId);
    res.json(matches);
  };
}
