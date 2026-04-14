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

export class CountryController {
  constructor(
    private getAllCountries: GetAllCountries,
    private getRandomCountry: GetRandomCountry
  ) {}

  /** GET /api/countries — Todos los países */
  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const countries = await this.getAllCountries.execute();
      res.json(countries);
    } catch (error) {
      console.error("Error al obtener países:", error);
      res.status(500).json({ error: "No se pudieron obtener los países" });
    }
  };

  /** GET /api/countries/random — Un país aleatorio */
  getRandom = async (_req: Request, res: Response): Promise<void> => {
    try {
      const country = await this.getRandomCountry.execute();

      if (!country) {
        res.status(500).json({ error: "No se pudo obtener un país aleatorio" });
        return;
      }

      res.json(country);
    } catch (error) {
      console.error("Error al obtener país aleatorio:", error);
      res.status(500).json({ error: "No se pudo obtener un país aleatorio" });
    }
  };
}
