import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

export class GetTeamsByLeague {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(league: string): Promise<Team[]> {
    return await this.teamRepository.getByLeague(league);
  }
}
