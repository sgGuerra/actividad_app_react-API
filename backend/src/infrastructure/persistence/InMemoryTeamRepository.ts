/**
 * InMemoryTeamRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Implementación concreta del repositorio de equipos.
 * ─────────────────────────────────────────────────────────────
 */
import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { teamsData } from "./inMemoryData";

export class InMemoryTeamRepository implements ITeamRepository {
  findAll(): Team[] {
    return teamsData;
  }

  findById(id: number): Team | null {
    return teamsData.find((team) => team.id === id) ?? null;
  }
}
