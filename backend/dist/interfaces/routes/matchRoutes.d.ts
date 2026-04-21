/**
 * matchRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Rutas para el recurso "partidos".
 * Soporta filtrado por liga: GET /api/matches?league_id=10
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { MatchController } from "../controllers/MatchController";
export declare function createMatchRoutes(controller: MatchController): Router;
//# sourceMappingURL=matchRoutes.d.ts.map