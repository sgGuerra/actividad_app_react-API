/**
 * Player.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un jugador/deportista.
 *
 * Los campos reflejan la respuesta real de TheSportsDB API v1.
 * Se incluyen todos los datos relevantes para que el agente
 * de IA tenga contexto completo sobre cada jugador.
 * ─────────────────────────────────────────────────────────────
 */
export interface Player {
    /** ID único del jugador en TheSportsDB */
    idPlayer: string;
    /** ID del equipo actual */
    idTeam: string;
    /** Nombre completo del jugador */
    strPlayer: string;
    /** Nombre alternativo del jugador */
    strPlayerAlternate: string | null;
    /** Nombre del equipo actual */
    strTeam: string;
    /** Deporte que practica */
    strSport: string;
    /** Nacionalidad */
    strNationality: string;
    /** Fecha de nacimiento (YYYY-MM-DD) */
    dateBorn: string | null;
    /** Lugar de nacimiento */
    strBirthLocation: string | null;
    /** Estado: Active, Retired, Free Agent, etc. */
    strStatus: string;
    /** Género */
    strGender: string;
    /** Posición en la que juega */
    strPosition: string;
    /** Número de camiseta */
    strNumber: string | null;
    /** Altura */
    strHeight: string | null;
    /** Peso */
    strWeight: string | null;
    /** Descripción/biografía en inglés */
    strDescriptionEN: string | null;
    /** Descripción/biografía en español */
    strDescriptionES: string | null;
    /** URL de la imagen thumbnail del jugador */
    strThumb: string | null;
    /** URL de la imagen recortada del jugador */
    strCutout: string | null;
    /** URL de la imagen render del jugador */
    strRender: string | null;
    /** Lado dominante: Left, Right, Both */
    strSide: string | null;
    /** Redes sociales */
    strFacebook: string | null;
    strTwitter: string | null;
    strInstagram: string | null;
}
//# sourceMappingURL=Player.d.ts.map