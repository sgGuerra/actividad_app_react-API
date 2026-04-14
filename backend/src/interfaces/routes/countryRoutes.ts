/**
 * countryRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "países".
 * El backend actúa como proxy a REST Countries API.
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { CountryController } from "../controllers/CountryController";

export function createCountryRoutes(controller: CountryController): Router {
  const router = Router();

  /** GET /api/countries — Todos los países */
  router.get("/", controller.getAll);

  /** GET /api/countries/random — Un país aleatorio para el juego */
  router.get("/random", controller.getRandom);

  return router;
}
