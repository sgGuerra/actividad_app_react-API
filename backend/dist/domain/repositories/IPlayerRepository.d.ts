/**
 * IPlayerRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de jugadores.
 *
 * Todos los métodos son async porque consultan TheSportsDB API
 * en tiempo real. Incluye métodos para obtener el historial
 * completo de un jugador (equipos anteriores, títulos, etc.)
 * ─────────────────────────────────────────────────────────────
 */
import { Player } from "../entities/Player";
import { FormerTeam } from "../entities/FormerTeam";
import { Honour } from "../entities/Honour";
import { Contract } from "../entities/Contract";
import { Milestone } from "../entities/Milestone";
export interface IPlayerRepository {
    /** Buscar jugadores por nombre */
    searchByName(name: string): Promise<Player[]>;
    /** Obtener un jugador por su ID */
    findById(id: string): Promise<Player | null>;
    /** Obtener todos los jugadores de un equipo por ID de equipo */
    getByTeamId(teamId: string): Promise<Player[]>;
    /** Obtener el historial de equipos anteriores de un jugador */
    getFormerTeams(playerId: string): Promise<FormerTeam[]>;
    /** Obtener los títulos/honores de un jugador */
    getHonours(playerId: string): Promise<Honour[]>;
    /** Obtener los contratos de un jugador */
    getContracts(playerId: string): Promise<Contract[]>;
    /** Obtener los hitos de un jugador */
    getMilestones(playerId: string): Promise<Milestone[]>;
}
//# sourceMappingURL=IPlayerRepository.d.ts.map