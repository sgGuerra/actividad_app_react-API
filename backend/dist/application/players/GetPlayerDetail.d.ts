import { Player } from "../../domain/entities/Player";
import { FormerTeam } from "../../domain/entities/FormerTeam";
import { Honour } from "../../domain/entities/Honour";
import { Contract } from "../../domain/entities/Contract";
import { Milestone } from "../../domain/entities/Milestone";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
export interface PlayerDetail extends Player {
    formerTeams: FormerTeam[];
    honours: Honour[];
    contracts: Contract[];
    milestones: Milestone[];
}
export declare class GetPlayerDetail {
    private playerRepository;
    constructor(playerRepository: IPlayerRepository);
    execute(id: string): Promise<PlayerDetail | null>;
}
//# sourceMappingURL=GetPlayerDetail.d.ts.map