/**
 * FormerTeam.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un equipo anterior de un jugador.
 *
 * Contiene el historial de transferencias/cesiones de un jugador,
 * incluyendo fechas de ingreso y salida, y tipo de movimiento.
 * ─────────────────────────────────────────────────────────────
 */
export interface FormerTeam {
  /** ID del registro */
  id: string;

  /** ID del jugador */
  idPlayer: string;

  /** ID del equipo anterior */
  idFormerTeam: string;

  /** Deporte */
  strSport: string;

  /** Nombre del jugador */
  strPlayer: string;

  /** Nombre del equipo anterior */
  strFormerTeam: string;

  /** Tipo de movimiento: Permanent, Loan, Youth, International */
  strMoveType: string;

  /** URL del escudo del equipo */
  strBadge: string | null;

  /** Año de ingreso */
  strJoined: string;

  /** Año de salida */
  strDeparted: string;
}
