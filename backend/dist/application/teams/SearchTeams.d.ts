import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class SearchTeams {
    private teamRepository;
    constructor(teamRepository: ITeamRepository);
    execute(name: string): Promise<Team[]>;
}
//# sourceMappingURL=SearchTeams.d.ts.map