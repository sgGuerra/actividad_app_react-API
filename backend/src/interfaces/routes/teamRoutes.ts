/**
 * teamRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "equipos".
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { TeamController } from "../controllers/TeamController";

export function createTeamRoutes(controller: TeamController): Router {
  const router = Router();

  /** GET /api/teams — Todos los equipos */
  router.get("/", controller.getAll);

  /** GET /api/teams/:id — Equipo por ID (route param) */
  router.get("/:id", controller.getById);

  return router;
}
