/**
 * Contract.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un contrato de un jugador.
 *
 * Contiene información sobre el equipo, período del contrato
 * y salario (cuando está disponible).
 * ─────────────────────────────────────────────────────────────
 */
export interface Contract {
  /** ID del registro */
  id: string;

  /** ID del jugador */
  idPlayer: string;

  /** ID del equipo */
  idTeam: string;

  /** Deporte */
  strSport: string;

  /** Nombre del jugador */
  strPlayer: string;

  /** Nombre del equipo */
  strTeam: string;

  /** URL del escudo del equipo */
  strBadge: string | null;

  /** Año de inicio del contrato */
  strYearStart: string;

  /** Año de fin del contrato */
  strYearEnd: string;

  /** Salario (puede estar vacío) */
  strWage: string;
}
