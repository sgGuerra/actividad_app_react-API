import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

export class SearchTeams {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(name: string): Promise<Team[]> {
    return await this.teamRepository.searchByName(name);
  }
}
