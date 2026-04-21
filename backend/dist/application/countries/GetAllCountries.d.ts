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
export declare class GetAllCountries {
    private countryRepository;
    constructor(countryRepository: ICountryRepository);
    execute(): Promise<Country[]>;
}
//# sourceMappingURL=GetAllCountries.d.ts.map