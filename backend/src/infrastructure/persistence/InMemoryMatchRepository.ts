/**
 * InMemoryMatchRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Implementación concreta del repositorio de partidos.
 *
 * Soporta filtrado por liga — se usa con query params:
 *   GET /api/matches?league_id=10
 * ─────────────────────────────────────────────────────────────
 */
import { Match } from "../../domain/entities/Match";
import { IMatchRepository } from "../../domain/repositories/IMatchRepository";
import { matchesData } from "./inMemoryData";

export class InMemoryMatchRepository implements IMatchRepository {
  findAll(): Match[] {
    return matchesData;
  }

  findById(id: number): Match | null {
    return matchesData.find((match) => match.id === id) ?? null;
  }

  /**
   * Filtra partidos por liga.
   * Ejemplo: findByLeagueId(10) → [partido 500 (Man Utd vs Real Madrid)]
   *
   * Se ejecuta cuando el frontend hace:
   *   GET /api/matches?league_id=10
   */
  findByLeagueId(leagueId: number): Match[] {
    return matchesData.filter((match) => match.league_id === leagueId);
  }
}
