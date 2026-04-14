/**
 * ILeagueRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de ligas.
 * Define qué operaciones se pueden hacer con las ligas,
 * sin decir CÓMO se implementan.
 * ─────────────────────────────────────────────────────────────
 */
import { League } from "../entities/League";

export interface ILeagueRepository {
  /** Obtener todas las ligas */
  findAll(): League[];

  /** Obtener una liga por su ID */
  findById(id: number): League | null;

  /** Obtener ligas filtradas por deporte */
  findBySportId(sportId: number): League[];
}
