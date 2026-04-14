/**
 * GetRandomCountry.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener un país aleatorio.
 * Se usa para iniciar una nueva partida del juego de geografía.
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";

export class GetRandomCountry {
  constructor(private countryRepository: ICountryRepository) {}

  async execute(): Promise<Country | null> {
    return this.countryRepository.findRandom();
  }
}
