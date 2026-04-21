/**
 * CountryController.ts
 * ─────────────────────────────────────────────────────────────
 * Controller para el recurso "países".
 *
 * Este controller actúa como proxy: el frontend llama al backend,
 * y el backend llama a REST Countries API.
 * ─────────────────────────────────────────────────────────────
 */
import { Request, Response } from "express";
import { GetAllCountries } from "../../application/countries/GetAllCountries";
import { GetRandomCountry } from "../../application/countries/GetRandomCountry";
export declare class CountryController {
    private getAllCountries;
    private getRandomCountry;
    constructor(getAllCountries: GetAllCountries, getRandomCountry: GetRandomCountry);
    /** GET /api/countries — Todos los países */
    getAll: (_req: Request, res: Response) => Promise<void>;
    /** GET /api/countries/random — Un país aleatorio */
    getRandom: (_req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=CountryController.d.ts.map