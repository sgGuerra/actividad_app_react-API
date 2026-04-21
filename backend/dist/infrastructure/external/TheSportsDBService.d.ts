/**
 * TheSportsDBService.ts
 * ─────────────────────────────────────────────────────────────
 * Servicio para interactuar con la API v1 de TheSportsDB.
 *
 * Encapsula todas las llamadas HTTP a TheSportsDB,
 * manejando la API key, URLs base, y manejo de errores.
 *
 * Usamos la versión V1 gratuita de la API (key: 3 para free tier).
 *
 * Endpoints implementados:
 *   - Búsqueda de jugadores y equipos por nombre
 *   - Lookup de jugadores y equipos por ID
 *   - Historial de jugadores (former teams, honours, contracts, milestones)
 *   - Jugadores de un equipo
 *   - Equipos de una liga
 * ─────────────────────────────────────────────────────────────
 */
export declare class TheSportsDBService {
    /** URL base con la API key incluida */
    private get baseUrl();
    /**
     * Método genérico para hacer fetch con manejo de errores.
     */
    private fetchJSON;
    /**
     * Busca jugadores por nombre.
     * Endpoint: searchplayers.php?p={name}
     */
    searchPlayers(name: string): Promise<any[]>;
    /**
     * Obtiene un jugador por su ID (datos completos).
     * Endpoint: lookupplayer.php?id={id}
     */
    lookupPlayer(id: string): Promise<any | null>;
    /**
     * Obtiene los jugadores de un equipo.
     * Endpoint: lookup_all_players.php?id={teamId}
     */
    getPlayersByTeam(teamId: string): Promise<any[]>;
    /**
     * Obtiene el historial de equipos anteriores de un jugador.
     * Endpoint: lookupformerteams.php?id={playerId}
     */
    lookupFormerTeams(playerId: string): Promise<any[]>;
    /**
     * Obtiene los títulos/honores de un jugador.
     * Endpoint: lookuphonours.php?id={playerId}
     */
    lookupHonours(playerId: string): Promise<any[]>;
    /**
     * Obtiene los contratos de un jugador.
     * Endpoint: lookupcontracts.php?id={playerId}
     */
    lookupContracts(playerId: string): Promise<any[]>;
    /**
     * Obtiene los hitos de un jugador.
     * Endpoint: lookupmilestones.php?id={playerId}
     */
    lookupMilestones(playerId: string): Promise<any[]>;
    /**
     * Busca equipos por nombre.
     * Endpoint: searchteams.php?t={name}
     */
    searchTeams(name: string): Promise<any[]>;
    /**
     * Obtiene un equipo por su ID (datos completos).
     * Endpoint: lookupteam.php?id={id}
     */
    lookupTeam(id: string): Promise<any | null>;
    /**
     * Obtiene todos los equipos de una liga.
     * Endpoint: search_all_teams.php?l={league}
     */
    getTeamsByLeague(league: string): Promise<any[]>;
}
//# sourceMappingURL=TheSportsDBService.d.ts.map