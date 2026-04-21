import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
export declare class SearchPlayers {
    private playerRepository;
    constructor(playerRepository: IPlayerRepository);
    execute(name: string): Promise<Player[]>;
}
//# sourceMappingURL=SearchPlayers.d.ts.map