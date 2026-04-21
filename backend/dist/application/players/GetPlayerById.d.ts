import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
export declare class GetPlayerById {
    private playerRepository;
    constructor(playerRepository: IPlayerRepository);
    execute(id: string): Promise<Player | null>;
}
//# sourceMappingURL=GetPlayerById.d.ts.map