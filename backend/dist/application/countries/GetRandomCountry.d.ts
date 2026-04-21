/**
 * GetRandomCountry.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: obtener un país aleatorio.
 * Se usa para iniciar una nueva partida del juego de geografía.
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
export declare class GetRandomCountry {
    private countryRepository;
    constructor(countryRepository: ICountryRepository);
    execute(): Promise<Country | null>;
}
//# sourceMappingURL=GetRandomCountry.d.ts.map