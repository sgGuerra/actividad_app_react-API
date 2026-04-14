/**
 * GetAllSports.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener todos los deportes.
 *
 * Un caso de uso representa UNA operación de negocio.
 * Recibe un repositorio por inyección de dependencias (constructor)
 * y expone un método execute() para ejecutar la lógica.
 *
 * El caso de uso NO sabe si los datos vienen de memoria, SQL, o
 * una API externa — solo conoce la interfaz del repositorio.
 * ─────────────────────────────────────────────────────────────
 */
import { Sport } from "../../domain/entities/Sport";
import { ISportRepository } from "../../domain/repositories/ISportRepository";

export class GetAllSports {
  /**
   * El repositorio se inyecta por constructor.
   * Esto es "Dependency Injection" — una pieza clave de Clean Architecture.
   */
  constructor(private sportRepository: ISportRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @returns Lista de todos los deportes
   */
  execute(): Sport[] {
    return this.sportRepository.findAll();
  }
}
