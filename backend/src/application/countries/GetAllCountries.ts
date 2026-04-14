/**
 * GetAllCountries.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener todos los países.
 *
 * Este caso de uso es ASYNC porque el repositorio hace
 * un fetch externo a REST Countries API.
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";

export class GetAllCountries {
  constructor(private countryRepository: ICountryRepository) {}

  async execute(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }
}
