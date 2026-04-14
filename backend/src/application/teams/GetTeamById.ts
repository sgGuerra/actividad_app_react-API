/**
 * GetTeamById.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener un equipo por su ID.
 * Se usa con: GET /api/teams/:id
 * ─────────────────────────────────────────────────────────────
 */
import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

export class GetTeamById {
  constructor(private teamRepository: ITeamRepository) {}

  execute(id: number): Team | null {
    return this.teamRepository.findById(id);
  }
}
