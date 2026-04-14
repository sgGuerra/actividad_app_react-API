/**
 * InMemorySportRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Implementación concreta del repositorio de deportes.
 *
 * Esta clase IMPLEMENTA la interfaz ISportRepository definida
 * en el dominio. Busca datos en el array en memoria.
 *
 * En Clean Architecture, la infraestructura implementa las
 * interfaces del dominio — nunca al revés.
 * ─────────────────────────────────────────────────────────────
 */
import { Sport } from "../../domain/entities/Sport";
import { ISportRepository } from "../../domain/repositories/ISportRepository";
import { sportsData } from "./inMemoryData";

export class InMemorySportRepository implements ISportRepository {
  /**
   * Devuelve todos los deportes del array en memoria.
   */
  findAll(): Sport[] {
    return sportsData;
  }

  /**
   * Busca un deporte por su ID.
   * Usa Array.find() — retorna undefined si no existe, convertido a null.
   */
  findById(id: number): Sport | null {
    return sportsData.find((sport) => sport.id === id) ?? null;
  }
}
