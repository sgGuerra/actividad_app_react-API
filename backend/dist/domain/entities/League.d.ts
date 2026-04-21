/**
 * League.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa una liga deportiva.
 * Cada liga pertenece a un deporte y a un país.
 *
 * Ejemplo: Premier League → sport_id: 1 (Football), country: "England"
 * ─────────────────────────────────────────────────────────────
 */
export interface League {
    /** Identificador único de la liga */
    id: number;
    /** Nombre de la liga (ej: "Premier League") */
    name: string;
    /** País donde opera la liga */
    country: string;
    /** ID del deporte al que pertenece esta liga */
    sport_id: number;
}
//# sourceMappingURL=League.d.ts.map