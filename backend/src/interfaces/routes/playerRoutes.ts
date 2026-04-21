import { Router } from "express";
import { PlayerController } from "../controllers/PlayerController";

export function createPlayerRoutes(controller: PlayerController): Router {
  const router = Router();

  router.get("/search", controller.search);
  router.get("/team/:teamId", controller.getByTeam);
  router.get("/:id/detail", controller.getDetail);
  router.get("/:id", controller.getById);

  return router;
}
