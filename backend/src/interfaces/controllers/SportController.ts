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

export class SportController {
  constructor(
    private getAllSports: GetAllSports,
    private getSportById: GetSportById
  ) {}

  /**
   * GET /api/sports
   * Devuelve todos los deportes.
   */
  getAll = (_req: Request, res: Response): void => {
    const sports = this.getAllSports.execute();
    res.json(sports);
  };

  /**
   * GET /api/sports/:id
   * Devuelve un deporte por su ID.
   *
   * req.params.id contiene el valor del :id en la URL.
   * Ejemplo: GET /api/sports/1 → req.params.id === "1"
   *
   * Nota: req.params.id siempre es STRING, hay que convertirlo a número.
   */
  getById = (req: Request, res: Response): void => {
    // Extraer el route param y convertir a número
    const id = parseInt(req.params.id, 10);

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número válido" });
      return;
    }

    const sport = this.getSportById.execute(id);

    // Si no se encontró, devolver 404
    if (!sport) {
      res.status(404).json({ error: `Deporte con ID ${id} no encontrado` });
      return;
    }

    res.json(sport);
  };
}
