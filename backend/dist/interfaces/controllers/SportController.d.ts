/**
 * SportController.ts
 * ─────────────────────────────────────────────────────────────
 * Controller para el recurso "deportes".
 *
 * En Clean Architecture, el controller:
 *   1. RECIBE la petición HTTP (req)
 *   2. EXTRAE los datos necesarios (params, query, body)
 *   3. LLAMA al caso de uso correspondiente
 *   4. DEVUELVE la respuesta HTTP (res)
 *
 * El controller NO contiene lógica de negocio — solo traduce
 * entre el mundo HTTP y los casos de uso.
 * ─────────────────────────────────────────────────────────────
 */
import { Request, Response } from "express";
import { GetAllSports } from "../../application/sports/GetAllSports";
import { GetSportById } from "../../application/sports/GetSportById";
export declare class SportController {
    private getAllSports;
    private getSportById;
    constructor(getAllSports: GetAllSports, getSportById: GetSportById);
    /**
     * GET /api/sports
     * Devuelve todos los deportes.
     */
    getAll: (_req: Request, res: Response) => void;
    /**
     * GET /api/sports/:id
     * Devuelve un deporte por su ID.
     *
     * req.params.id contiene el valor del :id en la URL.
     * Ejemplo: GET /api/sports/1 → req.params.id === "1"
     *
     * Nota: req.params.id siempre es STRING, hay que convertirlo a número.
     */
    getById: (req: Request, res: Response) => void;
}
//# sourceMappingURL=SportController.d.ts.map