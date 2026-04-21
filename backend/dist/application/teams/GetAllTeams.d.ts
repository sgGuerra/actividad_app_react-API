/**
 * GetAllTeams.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener todos los equipos.
 * ─────────────────────────────────────────────────────────────
 */
import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class GetAllTeams {
    private teamRepository;
    constructor(teamRepository: ITeamRepository);
    execute(): Team[];
}
//# sourceMappingURL=GetAllTeams.d.ts.map