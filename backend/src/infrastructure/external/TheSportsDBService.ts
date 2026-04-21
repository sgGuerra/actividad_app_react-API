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

const API_BASE_URL = "https://www.thesportsdb.com/api/v1/json";
const API_KEY = process.env.THESPORTSDB_API_KEY || "123";

export class TheSportsDBService {
  /** URL base con la API key incluida */
  private get baseUrl(): string {
    return `${API_BASE_URL}/${API_KEY}`;
  }

  /**
   * Método genérico para hacer fetch con manejo de errores.
   */
  private async fetchJSON(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    console.log(`[TheSportsDB] GET ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TheSportsDB API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // ══════════════════════════════════════════════════════════
  // JUGADORES
  // ══════════════════════════════════════════════════════════

  /**
   * Busca jugadores por nombre.
   * Endpoint: searchplayers.php?p={name}
   */
  async searchPlayers(name: string): Promise<any[]> {
    const data = await this.fetchJSON(
      `searchplayers.php?p=${encodeURIComponent(name)}`
    );
    return data.player || [];
  }

  /**
   * Obtiene un jugador por su ID (datos completos).
   * Endpoint: lookupplayer.php?id={id}
   */
  async lookupPlayer(id: string): Promise<any | null> {
    const data = await this.fetchJSON(`lookupplayer.php?id=${id}`);
    const players = data.players || [];
    return players.length > 0 ? players[0] : null;
  }

  /**
   * Obtiene los jugadores de un equipo.
   * Endpoint: lookup_all_players.php?id={teamId}
   */
  async getPlayersByTeam(teamId: string): Promise<any[]> {
    const data = await this.fetchJSON(`lookup_all_players.php?id=${teamId}`);
    return data.player || [];
  }

  /**
   * Obtiene el historial de equipos anteriores de un jugador.
   * Endpoint: lookupformerteams.php?id={playerId}
   */
  async lookupFormerTeams(playerId: string): Promise<any[]> {
    const data = await this.fetchJSON(`lookupformerteams.php?id=${playerId}`);
    return data.formerteams || [];
  }

  /**
   * Obtiene los títulos/honores de un jugador.
   * Endpoint: lookuphonours.php?id={playerId}
   */
  async lookupHonours(playerId: string): Promise<any[]> {
    const data = await this.fetchJSON(`lookuphonours.php?id=${playerId}`);
    return data.honours || [];
  }

  /**
   * Obtiene los contratos de un jugador.
   * Endpoint: lookupcontracts.php?id={playerId}
   */
  async lookupContracts(playerId: string): Promise<any[]> {
    const data = await this.fetchJSON(`lookupcontracts.php?id=${playerId}`);
    return data.contracts || [];
  }

  /**
   * Obtiene los hitos de un jugador.
   * Endpoint: lookupmilestones.php?id={playerId}
   */
  async lookupMilestones(playerId: string): Promise<any[]> {
    const data = await this.fetchJSON(`lookupmilestones.php?id=${playerId}`);
    return data.milestones || [];
  }

  // ══════════════════════════════════════════════════════════
  // EQUIPOS
  // ══════════════════════════════════════════════════════════

  /**
   * Busca equipos por nombre.
   * Endpoint: searchteams.php?t={name}
   */
  async searchTeams(name: string): Promise<any[]> {
    const data = await this.fetchJSON(
      `searchteams.php?t=${encodeURIComponent(name)}`
    );
    return data.teams || [];
  }

  /**
   * Obtiene un equipo por su ID (datos completos).
   * Endpoint: lookupteam.php?id={id}
   */
  async lookupTeam(id: string): Promise<any | null> {
    const data = await this.fetchJSON(`lookupteam.php?id=${id}`);
    const teams = data.teams || [];
    return teams.length > 0 ? teams[0] : null;
  }

  /**
   * Obtiene todos los equipos de una liga.
   * Endpoint: search_all_teams.php?l={league}
   */
  async getTeamsByLeague(league: string): Promise<any[]> {
    const data = await this.fetchJSON(
      `search_all_teams.php?l=${encodeURIComponent(league)}`
    );
    return data.teams || [];
  }
}
