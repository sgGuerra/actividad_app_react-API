/**
 * PlayerController.ts
 * ─────────────────────────────────────────────────────────────
 * Controller para el recurso "jugadores".
 *
 * Este controller demuestra el uso de QUERY PARAMS:
 *   GET /api/players?team_id=100
 *
 * Los query params se acceden con req.query.team_id
 * (a diferencia de route params que usan req.params.id)
 * ─────────────────────────────────────────────────────────────
 */
import { Request, Response } from "express";
import { GetPlayersByTeam } from "../../application/players/GetPlayersByTeam";

export class PlayerController {
  constructor(private getPlayersByTeam: GetPlayersByTeam) {}

  /**
   * GET /api/players
   * GET /api/players?team_id=100
   *
   * Si se envía team_id como query param, filtra por equipo.
   * Si NO se envía, devuelve todos los jugadores.
   *
   * DIFERENCIA entre params y query:
   *   /api/players/1     → req.params.id = "1"     (route param)
   *   /api/players?team_id=100 → req.query.team_id = "100" (query param)
   */
  getAll = (req: Request, res: Response): void => {
    // Extraer el query param (viene como string o undefined)
    const teamIdParam = req.query.team_id as string | undefined;

    // Si se proporcionó team_id, convertir a número
    let teamId: number | undefined;
    if (teamIdParam) {
      teamId = parseInt(teamIdParam, 10);
      if (isNaN(teamId)) {
        res.status(400).json({ error: "team_id debe ser un número válido" });
        return;
      }
    }

    const players = this.getPlayersByTeam.execute(teamId);
    res.json(players);
  };
}
