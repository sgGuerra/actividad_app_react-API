import { Request, Response } from "express";
import { SearchTeams } from "../../application/teams/SearchTeams";
import { GetTeamById } from "../../application/teams/GetTeamById";
import { GetTeamsByLeague } from "../../application/teams/GetTeamsByLeague";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class TeamController {
    private searchTeams;
    private getTeamById;
    private getTeamsByLeague;
    private teamRepository;
    constructor(searchTeams: SearchTeams, getTeamById: GetTeamById, getTeamsByLeague: GetTeamsByLeague, teamRepository: ITeamRepository);
    search: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    getByLeague: (req: Request, res: Response) => Promise<void>;
    getPlayers: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=TeamController.d.ts.map