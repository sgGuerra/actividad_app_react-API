/**
 * InMemoryLeagueRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Implementación concreta del repositorio de ligas.
 * ─────────────────────────────────────────────────────────────
 */
import { League } from "../../domain/entities/League";
import { ILeagueRepository } from "../../domain/repositories/ILeagueRepository";
import { leaguesData } from "./inMemoryData";

export class InMemoryLeagueRepository implements ILeagueRepository {
  findAll(): League[] {
    return leaguesData;
  }

  findById(id: number): League | null {
    return leaguesData.find((league) => league.id === id) ?? null;
  }

  /**
   * Filtra ligas por deporte.
   * Ejemplo: findBySportId(1) → [Premier League, La Liga]
   */
  findBySportId(sportId: number): League[] {
    return leaguesData.filter((league) => league.sport_id === sportId);
  }
}
