/**
 * IPlayerRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de jugadores.
 * Soporta filtrado por equipo usando query params.
 * ─────────────────────────────────────────────────────────────
 */
import { Player } from "../entities/Player";

export interface IPlayerRepository {
  /** Obtener todos los jugadores */
  findAll(): Player[];

  /** Obtener un jugador por su ID */
  findById(id: number): Player | null;

  /**
   * Obtener jugadores filtrados por equipo.
   * Se usa con query params: GET /api/players?team_id=100
   */
  findByTeamId(teamId: number): Player[];
}
