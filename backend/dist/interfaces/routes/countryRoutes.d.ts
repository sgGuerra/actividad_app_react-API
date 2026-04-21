/**
 * countryRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "países".
 * El backend actúa como proxy a REST Countries API.
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { CountryController } from "../controllers/CountryController";
export declare function createCountryRoutes(controller: CountryController): Router;
//# sourceMappingURL=countryRoutes.d.ts.map