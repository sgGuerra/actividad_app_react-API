import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";

export class SearchPlayers {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(name: string): Promise<Player[]> {
    return await this.playerRepository.searchByName(name);
  }
}
