import { Request, Response } from "express";
import { SearchPlayers } from "../../application/players/SearchPlayers";
import { GetPlayerById } from "../../application/players/GetPlayerById";
import { GetPlayerDetail } from "../../application/players/GetPlayerDetail";
import { GetPlayersByTeam } from "../../application/players/GetPlayersByTeam";

export class PlayerController {
  constructor(
    private searchPlayers: SearchPlayers,
    private getPlayerById: GetPlayerById,
    private getPlayerDetail: GetPlayerDetail,
    private getPlayersByTeam: GetPlayersByTeam
  ) {}

  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.query.name?.toString();
      if (!name) {
        res.status(400).json({ error: "Query param 'name' es requerido" });
        return;
      }
      const players = await this.searchPlayers.execute(name);
      res.json(players);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id?.toString();
      const player = await this.getPlayerById.execute(id);
      if (!player) {
        res.status(404).json({ error: "Jugador no encontrado" });
        return;
      }
      res.json(player);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };

  getDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id?.toString();
      const playerDetail = await this.getPlayerDetail.execute(id);
      if (!playerDetail) {
        res.status(404).json({ error: "Jugador no encontrado" });
        return;
      }
      res.json(playerDetail);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };

  getByTeam = async (req: Request, res: Response): Promise<void> => {
    try {
      const teamId = req.params.teamId?.toString();
      const players = await this.getPlayersByTeam.execute(teamId);
      res.json(players);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
  };
}
