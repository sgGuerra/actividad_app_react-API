import { Player } from "../../domain/entities/Player";
import { FormerTeam } from "../../domain/entities/FormerTeam";
import { Honour } from "../../domain/entities/Honour";
import { Contract } from "../../domain/entities/Contract";
import { Milestone } from "../../domain/entities/Milestone";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";

export interface PlayerDetail extends Player {
  formerTeams: FormerTeam[];
  honours: Honour[];
  contracts: Contract[];
  milestones: Milestone[];
}

export class GetPlayerDetail {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(id: string): Promise<PlayerDetail | null> {
    const player = await this.playerRepository.findById(id);
    if (!player) return null;

    const [formerTeams, honours, contracts, milestones] = await Promise.all([
      this.playerRepository.getFormerTeams(id),
      this.playerRepository.getHonours(id),
      this.playerRepository.getContracts(id),
      this.playerRepository.getMilestones(id),
    ]);

    return {
      ...player,
      formerTeams,
      honours,
      contracts,
      milestones,
    };
  }
}
