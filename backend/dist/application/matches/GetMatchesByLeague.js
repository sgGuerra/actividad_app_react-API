"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMatchesByLeague = void 0;
class GetMatchesByLeague {
    constructor(matchRepository) {
        this.matchRepository = matchRepository;
    }
    /**
     * @param leagueId - ID de la liga (opcional, viene de req.query.league_id)
     * @returns Partidos filtrados por liga, o todos si no se filtra
     */
    execute(leagueId) {
        if (leagueId !== undefined) {
            return this.matchRepository.findByLeagueId(leagueId);
        }
        return this.matchRepository.findAll();
    }
}
exports.GetMatchesByLeague = GetMatchesByLeague;
//# sourceMappingURL=GetMatchesByLeague.js.map