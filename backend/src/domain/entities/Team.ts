/**
 * Team.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un equipo deportivo.
 * Cada equipo pertenece a una liga y a un deporte.
 *
 * Ejemplo: Manchester United → league_id: 10, sport_id: 1
 * ─────────────────────────────────────────────────────────────
 */
export interface Team {
  /** Identificador único del equipo */
  id: number;

  /** Nombre del equipo (ej: "Manchester United") */
  name: string;

  /** ID de la liga a la que pertenece */
  league_id: number;

  /** ID del deporte que practica */
  sport_id: number;
}
