/**
 * sportRoutes.ts
 * ─────────────────────────────────────────────────────────────
 * Define las rutas HTTP para el recurso "deportes".
 *
 * Las rutas SOLO mapean URLs a métodos del controller.
 * No contienen lógica — eso va en el controller y los casos de uso.
 *
 * Patrón: Router → Controller → Use Case → Repository
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { SportController } from "../controllers/SportController";
export declare function createSportRoutes(controller: SportController): Router;
//# sourceMappingURL=sportRoutes.d.ts.map