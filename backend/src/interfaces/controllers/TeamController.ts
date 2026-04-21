import { Request, Response } from "express";
import { SearchTeams } from "../../application/teams/SearchTeams";
import { GetTeamById } from "../../application/teams/GetTeamById";
import { GetTeamsByLeague } from "../../application/teams/GetTeamsByLeague";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

export class TeamController {
  constructor(
    private searchTeams: SearchTeams,
    private getTeamById: GetTeamById,
    private getTeamsByLeague: GetTeamsByLeague,
    private teamRepository: ITeamRepository // Atajo para obtener jugadores
  ) {}

  search = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.query.name?.toString();
        if (!name) {
          res.status(400).json({ error: "Query param 'name' es requerido" });
          return;
        }
        const teams = await this.searchTeams.execute(name);
        res.json(teams);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id?.toString();
        const team = await this.getTeamById.execute(id);
        if (!team) {
            res.status(404).json({ error: "Equipo no encontrado" });
            return;
        }
        res.json(team);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };

  getByLeague = async (req: Request, res: Response): Promise<void> => {
    try {
        const league = req.params.league?.toString();
        const teams = await this.getTeamsByLeague.execute(league);
        res.json(teams);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };

  getPlayers = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id?.toString();
        const players = await this.teamRepository.getPlayers(id);
        res.json(players);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };
}
