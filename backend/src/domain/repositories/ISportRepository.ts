/**
 * ISportRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz (contrato) del repositorio de deportes.
 *
 * En Clean Architecture, el DOMINIO define las interfaces,
 * pero la INFRAESTRUCTURA las implementa.
 *
 * Esto permite cambiar la implementación (ej: de memoria a MySQL)
 * sin modificar los casos de uso ni las entidades.
 * ─────────────────────────────────────────────────────────────
 */
import { Sport } from "../entities/Sport";

export interface ISportRepository {
  /** Obtener todos los deportes */
  findAll(): Sport[];

  /** Obtener un deporte por su ID, o null si no existe */
  findById(id: number): Sport | null;
}
