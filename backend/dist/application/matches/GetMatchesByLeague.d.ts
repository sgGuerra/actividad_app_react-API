/**
 * GetMatchesByLeague.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener partidos filtrados por liga.
 *
 * Se usa con QUERY PARAMS: GET /api/matches?league_id=10
 *
 * Si no se envía league_id, devuelve TODOS los partidos.
 * ─────────────────────────────────────────────────────────────
 */
import { Match } from "../../domain/entities/Match";
import { IMatchRepository } from "../../domain/repositories/IMatchRepository";
export declare class GetMatchesByLeague {
    private matchRepository;
    constructor(matchRepository: IMatchRepository);
    /**
     * @param leagueId - ID de la liga (opcional, viene de req.query.league_id)
     * @returns Partidos filtrados por liga, o todos si no se filtra
     */
    execute(leagueId?: number): Match[];
}
//# sourceMappingURL=GetMatchesByLeague.d.ts.map