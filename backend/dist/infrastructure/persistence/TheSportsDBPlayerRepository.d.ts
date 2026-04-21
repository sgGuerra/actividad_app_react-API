import { Player } from "../../domain/entities/Player";
import { FormerTeam } from "../../domain/entities/FormerTeam";
import { Honour } from "../../domain/entities/Honour";
import { Contract } from "../../domain/entities/Contract";
import { Milestone } from "../../domain/entities/Milestone";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
export declare class TheSportsDBPlayerRepository implements IPlayerRepository {
    private service;
    searchByName(name: string): Promise<Player[]>;
    findById(id: string): Promise<Player | null>;
    getByTeamId(teamId: string): Promise<Player[]>;
    getFormerTeams(playerId: string): Promise<FormerTeam[]>;
    getHonours(playerId: string): Promise<Honour[]>;
    getContracts(playerId: string): Promise<Contract[]>;
    getMilestones(playerId: string): Promise<Milestone[]>;
}
//# sourceMappingURL=TheSportsDBPlayerRepository.d.ts.map