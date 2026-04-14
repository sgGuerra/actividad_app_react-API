/**
 * InMemoryPlayerRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Implementación concreta del repositorio de jugadores.
 *
 * Soporta filtrado por equipo — se usa con query params:
 *   GET /api/players?team_id=100
 * ─────────────────────────────────────────────────────────────
 */
import { Player } from "../../domain/entities/Player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { playersData } from "./inMemoryData";

export class InMemoryPlayerRepository implements IPlayerRepository {
  findAll(): Player[] {
    return playersData;
  }

  findById(id: number): Player | null {
    return playersData.find((player) => player.id === id) ?? null;
  }

  /**
   * Filtra jugadores por equipo.
   * Ejemplo: findByTeamId(100) → [Cristiano Ronaldo]
   *
   * Esto es lo que se ejecuta cuando el frontend hace:
   *   GET /api/players?team_id=100
   * El controller extrae req.query.team_id y llama a este método.
   */
  findByTeamId(teamId: number): Player[] {
    return playersData.filter((player) => player.team_id === teamId);
  }
}
