/**
 * TeamController.ts
 * ─────────────────────────────────────────────────────────────
 * Controller para el recurso "equipos".
 * Maneja GET /api/teams y GET /api/teams/:id
 * ─────────────────────────────────────────────────────────────
 */
import { Request, Response } from "express";
import { GetAllTeams } from "../../application/teams/GetAllTeams";
import { GetTeamById } from "../../application/teams/GetTeamById";

export class TeamController {
  constructor(
    private getAllTeams: GetAllTeams,
    private getTeamById: GetTeamById
  ) {}

  /** GET /api/teams — Todos los equipos */
  getAll = (_req: Request, res: Response): void => {
    const teams = this.getAllTeams.execute();
    res.json(teams);
  };

  /** GET /api/teams/:id — Equipo por ID (route param) */
  getById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número válido" });
      return;
    }

    const team = this.getTeamById.execute(id);

    if (!team) {
      res.status(404).json({ error: `Equipo con ID ${id} no encontrado` });
      return;
    }

    res.json(team);
  };
}
