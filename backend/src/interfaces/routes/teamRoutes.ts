import { Router } from "express";
import { TeamController } from "../controllers/TeamController";

export function createTeamRoutes(controller: TeamController): Router {
  const router = Router();

  router.get("/search", controller.search);
  router.get("/league/:league", controller.getByLeague);
  router.get("/:id/players", controller.getPlayers);
  router.get("/:id", controller.getById);

  return router;
}
