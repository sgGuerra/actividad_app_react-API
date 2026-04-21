import { Team } from "../../domain/entities/Team";
import { Player } from "../../domain/entities/Player";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class TheSportsDBTeamRepository implements ITeamRepository {
    private service;
    searchByName(name: string): Promise<Team[]>;
    findById(id: string): Promise<Team | null>;
    getByLeague(league: string): Promise<Team[]>;
    getPlayers(teamId: string): Promise<Player[]>;
}
//# sourceMappingURL=TheSportsDBTeamRepository.d.ts.map