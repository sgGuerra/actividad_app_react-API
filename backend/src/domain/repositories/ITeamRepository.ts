/**
 * ITeamRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de equipos.
 * ─────────────────────────────────────────────────────────────
 */
import { Team } from "../entities/Team";

export interface ITeamRepository {
  /** Obtener todos los equipos */
  findAll(): Team[];

  /** Obtener un equipo por su ID */
  findById(id: number): Team | null;
}
