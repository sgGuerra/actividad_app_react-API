/**
 * matchRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "partidos".
 * Soporta filtrado por liga: GET /api/matches?league_id=10
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { MatchController } from "../controllers/MatchController";

export function createMatchRoutes(controller: MatchController): Router {
  const router = Router();

  /** GET /api/matches — Todos los partidos (opcionalmente filtrados por liga) */
  router.get("/", controller.getAll);

  return router;
}
