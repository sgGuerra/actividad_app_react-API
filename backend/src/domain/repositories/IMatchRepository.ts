/**
 * IMatchRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de partidos.
 * Soporta filtrado por liga usando query params.
 * ─────────────────────────────────────────────────────────────
 */
import { Match } from "../entities/Match";

export interface IMatchRepository {
  /** Obtener todos los partidos */
  findAll(): Match[];

  /** Obtener un partido por su ID */
  findById(id: number): Match | null;

  /**
   * Obtener partidos filtrados por liga.
   * Se usa con query params: GET /api/matches?league_id=10
   */
  findByLeagueId(leagueId: number): Match[];
}
