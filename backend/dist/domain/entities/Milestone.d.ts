/**
 * Milestone.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un hito de un jugador.
 *
 * Contiene logros especiales, records y momentos destacados
 * en la carrera del jugador.
 * ─────────────────────────────────────────────────────────────
 */
export interface Milestone {
    /** ID del registro */
    id: string;
    /** ID del jugador */
    idPlayer: string;
    /** Deporte */
    strSport: string;
    /** Nombre del jugador */
    strPlayer: string;
    /** Descripción del hito */
    strMilestone: string;
}
//# sourceMappingURL=Milestone.d.ts.map