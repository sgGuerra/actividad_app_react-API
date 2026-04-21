import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";

export class GetPlayerById {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(id: string): Promise<Player | null> {
    return await this.playerRepository.findById(id);
  }
}
