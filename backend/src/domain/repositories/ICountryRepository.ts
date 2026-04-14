/**
 * ICountryRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Interfaz del repositorio de países.
 *
 * A diferencia de los repos deportivos (in-memory),
 * este repo se implementa como proxy a la REST Countries API.
 * Pero el dominio no necesita saber eso — solo define el contrato.
 *
 * Los métodos son async porque la implementación hará fetch externo.
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../entities/Country";

export interface ICountryRepository {
  /** Obtener todos los países (campos limitados para eficiencia) */
  findAll(): Promise<Country[]>;

  /** Obtener un país aleatorio de la lista */
  findRandom(): Promise<Country | null>;
}
