/**
 * playerRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "jugadores".
 *
 * Usa QUERY PARAMS para filtrar:
 *   GET /api/players?team_id=100
 *
 * El query param se extrae en el controller, no aquí.
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { PlayerController } from "../controllers/PlayerController";

export function createPlayerRoutes(controller: PlayerController): Router {
  const router = Router();

  /**
   * GET /api/players
   * GET /api/players?team_id=100
   *
   * La misma ruta soporta ambos: sin filtro y con filtro.
   * El controller decide qué hacer según req.query.team_id.
   */
  router.get("/", controller.getAll);

  return router;
}
