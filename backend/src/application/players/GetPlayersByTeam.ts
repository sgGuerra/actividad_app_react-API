import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";

export class GetPlayersByTeam {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(teamId: string): Promise<Player[]> {
    return await this.playerRepository.getByTeamId(teamId);
  }
}
