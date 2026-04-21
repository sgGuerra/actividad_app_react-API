import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class GetTeamsByLeague {
    private teamRepository;
    constructor(teamRepository: ITeamRepository);
    execute(league: string): Promise<Team[]>;
}
//# sourceMappingURL=GetTeamsByLeague.d.ts.map