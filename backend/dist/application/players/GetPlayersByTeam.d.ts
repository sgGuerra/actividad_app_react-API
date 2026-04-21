import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
export declare class GetPlayersByTeam {
    private playerRepository;
    constructor(playerRepository: IPlayerRepository);
    execute(teamId: string): Promise<Player[]>;
}
//# sourceMappingURL=GetPlayersByTeam.d.ts.map