import { Team } from "../../domain/entities/Team";
import { Player } from "../../domain/entities/Player";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { TheSportsDBService } from "../external/TheSportsDBService";

export class TheSportsDBTeamRepository implements ITeamRepository {
  private service = new TheSportsDBService();

  async searchByName(name: string): Promise<Team[]> {
    return await this.service.searchTeams(name);
  }

  async findById(id: string): Promise<Team | null> {
    return await this.service.lookupTeam(id);
  }

  async getByLeague(league: string): Promise<Team[]> {
    return await this.service.getTeamsByLeague(league);
  }

  async getPlayers(teamId: string): Promise<Player[]> {
    return await this.service.getPlayersByTeam(teamId);
  }
}
