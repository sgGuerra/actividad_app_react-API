/**
 * ITeamRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de equipos.
 *
 * Todos los métodos son async porque consultan TheSportsDB API
 * en tiempo real. Incluye búsqueda por nombre, por ID,
 * por liga, y obtención de la plantilla de jugadores.
 * ─────────────────────────────────────────────────────────────
 */
import { Team } from "../entities/Team";
import { Player } from "../entities/Player";
export interface ITeamRepository {
    /** Buscar equipos por nombre */
    searchByName(name: string): Promise<Team[]>;
    /** Obtener un equipo por su ID */
    findById(id: string): Promise<Team | null>;
    /** Obtener todos los equipos de una liga */
    getByLeague(league: string): Promise<Team[]>;
    /** Obtener la plantilla de jugadores de un equipo */
    getPlayers(teamId: string): Promise<Player[]>;
}
//# sourceMappingURL=ITeamRepository.d.ts.map