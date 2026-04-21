import { Player } from "../../domain/entities/Player";
import { FormerTeam } from "../../domain/entities/FormerTeam";
import { Honour } from "../../domain/entities/Honour";
import { Contract } from "../../domain/entities/Contract";
import { Milestone } from "../../domain/entities/Milestone";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { TheSportsDBService } from "../external/TheSportsDBService";

export class TheSportsDBPlayerRepository implements IPlayerRepository {
  private service = new TheSportsDBService();

  async searchByName(name: string): Promise<Player[]> {
    return await this.service.searchPlayers(name);
  }

  async findById(id: string): Promise<Player | null> {
    return await this.service.lookupPlayer(id);
  }

  async getByTeamId(teamId: string): Promise<Player[]> {
    return await this.service.getPlayersByTeam(teamId);
  }

  async getFormerTeams(playerId: string): Promise<FormerTeam[]> {
    return await this.service.lookupFormerTeams(playerId);
  }

  async getHonours(playerId: string): Promise<Honour[]> {
    return await this.service.lookupHonours(playerId);
  }

  async getContracts(playerId: string): Promise<Contract[]> {
    return await this.service.lookupContracts(playerId);
  }

  async getMilestones(playerId: string): Promise<Milestone[]> {
    return await this.service.lookupMilestones(playerId);
  }
}
