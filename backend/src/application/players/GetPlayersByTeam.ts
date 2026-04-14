/**
 * GetPlayersByTeam.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener jugadores filtrados por equipo.
 *
 * Se usa con QUERY PARAMS: GET /api/players?team_id=100
 *
 * ¿Cuál es la diferencia con route params?
 *   - Route params (:id) → identifican UN recurso específico
 *   - Query params (?team_id=100) → FILTRAN una colección
 *
 * Si no se envía team_id, devuelve TODOS los jugadores.
 * ─────────────────────────────────────────────────────────────
 */
import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";

export class GetPlayersByTeam {
  constructor(private playerRepository: IPlayerRepository) {}

  /**
   * @param teamId - ID del equipo (opcional, viene de req.query.team_id)
   * @returns Jugadores filtrados por equipo, o todos si no se filtra
   */
  execute(teamId?: number): Player[] {
    // Si se proporcionó un team_id, filtrar por equipo
    if (teamId !== undefined) {
      return this.playerRepository.findByTeamId(teamId);
    }
    // Si no, devolver todos los jugadores
    return this.playerRepository.findAll();
  }
}
