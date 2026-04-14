/**
 * GetSportById.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener un deporte por su ID.
 *
 * Se usa cuando el cliente hace: GET /api/sports/:id
 * El controller extrae el :id del URL y lo pasa a execute().
 * ─────────────────────────────────────────────────────────────
 */
import { Sport } from "../../domain/entities/Sport";
import { ISportRepository } from "../../domain/repositories/ISportRepository";

export class GetSportById {
  constructor(private sportRepository: ISportRepository) {}

  /**
   * Busca un deporte por ID.
   * @param id - ID del deporte (viene de req.params.id)
   * @returns El deporte encontrado, o null si no existe
   */
  execute(id: number): Sport | null {
    return this.sportRepository.findById(id);
  }
}
