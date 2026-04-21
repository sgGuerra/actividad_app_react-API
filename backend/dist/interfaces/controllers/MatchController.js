"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
class MatchController {
    constructor(getMatchesByLeague) {
        this.getMatchesByLeague = getMatchesByLeague;
        /**
         * GET /api/matches
         * GET /api/matches?league_id=10
         *
         * Filtra partidos por liga si se envía league_id como query param.
         */
        this.getAll = (req, res) => {
            const leagueIdParam = req.query.league_id;
            let leagueId;
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
}
exports.MatchController = MatchController;
//# sourceMappingURL=MatchController.js.map