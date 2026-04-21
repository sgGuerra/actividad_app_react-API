/**
 * Honour.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un título/honor ganado por un jugador.
 *
 * Incluye la temporada, el equipo con el que lo ganó,
 * y el nombre del campeonato/trofeo.
 * ─────────────────────────────────────────────────────────────
 */
export interface Honour {
    /** ID del registro */
    id: string;
    /** ID del jugador */
    idPlayer: string;
    /** ID del equipo con el que ganó */
    idTeam: string;
    /** Deporte */
    strSport: string;
    /** Nombre del jugador */
    strPlayer: string;
    /** Nombre del equipo */
    strTeam: string;
    /** URL del escudo del equipo */
    strTeamBadge: string | null;
    /** Nombre del honor/título ganado */
    strHonour: string;
    /** Temporada en que lo ganó */
    strSeason: string;
}
//# sourceMappingURL=Honour.d.ts.map