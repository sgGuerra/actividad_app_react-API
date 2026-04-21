import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

export class GetTeamById {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(id: string): Promise<Team | null> {
    return await this.teamRepository.findById(id);
  }
}
