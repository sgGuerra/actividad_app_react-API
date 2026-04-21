import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class GetTeamById {
    private teamRepository;
    constructor(teamRepository: ITeamRepository);
    execute(id: string): Promise<Team | null>;
}
//# sourceMappingURL=GetTeamById.d.ts.map