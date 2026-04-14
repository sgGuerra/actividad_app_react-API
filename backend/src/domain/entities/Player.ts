/**
 * Player.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un jugador/deportista.
 * Cada jugador pertenece a un equipo y tiene estadísticas.
 *
 * Las stats son un objeto flexible porque varían según el deporte:
 *   - Football: { goals, assists }
 *   - Basketball: { points, rebounds, assists }
 * ─────────────────────────────────────────────────────────────
 */
export interface Player {
  /** Identificador único del jugador */
  id: number;

  /** Nombre completo del jugador */
  name: string;

  /** ID del equipo al que pertenece */
  team_id: number;

  /** Posición en la que juega (ej: "Forward", "Guard") */
  position: string;

  /** Número de camiseta */
  number: number;

  /**
   * Estadísticas del jugador.
   * Objeto flexible: las claves dependen del deporte.
   * Football: { goals: number, assists: number }
   * Basketball: { points: number, rebounds: number, assists: number }
   */
  stats: Record<string, number>;
}
