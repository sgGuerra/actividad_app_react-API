/**
 * Match.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un partido/encuentro deportivo.
 *
 * Un partido tiene dos equipos (local y visitante), una fecha,
 * un estado ("scheduled" o "finished"), y opcionalmente un marcador.
 * ─────────────────────────────────────────────────────────────
 */
/** Marcador del partido (solo presente si el partido ya terminó) */
export interface MatchScore {
    home: number;
    away: number;
}
export interface Match {
    /** Identificador único del partido */
    id: number;
    /** ID de la liga donde se juega este partido */
    league_id: number;
    /** ID del equipo local */
    home_team_id: number;
    /** ID del equipo visitante */
    away_team_id: number;
    /** Fecha y hora del partido en formato ISO 8601 */
    date: string;
    /** Estado: "scheduled" (programado) o "finished" (finalizado) */
    status: "scheduled" | "finished";
    /** Marcador final (solo si status === "finished") */
    score?: MatchScore;
}
//# sourceMappingURL=Match.d.ts.map