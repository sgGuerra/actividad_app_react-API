/**
 * Team.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un equipo deportivo.
 *
 * Los campos reflejan la respuesta real de TheSportsDB API v1.
 * Se incluyen descripciones, imágenes, estadio y más para
 * dar contexto completo al agente de IA.
 * ─────────────────────────────────────────────────────────────
 */
export interface Team {
    /** ID único del equipo en TheSportsDB */
    idTeam: string;
    /** Nombre del equipo */
    strTeam: string;
    /** Nombre corto / abreviatura */
    strTeamShort: string | null;
    /** Nombres alternativos */
    strTeamAlternate: string | null;
    /** Año de fundación */
    intFormedYear: string | null;
    /** Deporte que practica */
    strSport: string;
    /** Liga principal */
    strLeague: string;
    /** ID de la liga principal */
    idLeague: string;
    /** País del equipo */
    strCountry: string;
    /** Nombre del estadio */
    strStadium: string | null;
    /** Capacidad del estadio */
    intStadiumCapacity: string | null;
    /** Ubicación */
    strLocation: string | null;
    /** Descripción en inglés */
    strDescriptionEN: string | null;
    /** Descripción en español */
    strDescriptionES: string | null;
    /** Sitio web */
    strWebsite: string | null;
    /** Redes sociales */
    strFacebook: string | null;
    strTwitter: string | null;
    strInstagram: string | null;
    strYoutube: string | null;
    /** URLs de imágenes */
    strBadge: string | null;
    strLogo: string | null;
    strBanner: string | null;
    strEquipment: string | null;
    /** Colores del equipo */
    strColour1: string | null;
    strColour2: string | null;
    strColour3: string | null;
    /** Keywords / apodos */
    strKeywords: string | null;
}
//# sourceMappingURL=Team.d.ts.map