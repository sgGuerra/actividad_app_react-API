/**
 * GetAllTeams.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener todos los equipos.
 * ─────────────────────────────────────────────────────────────
 */
import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

export class GetAllTeams {
  constructor(private teamRepository: ITeamRepository) {}

  execute(): Team[] {
    return this.teamRepository.findAll();
  }
}
