import { Request, Response } from "express";
import { SearchPlayers } from "../../application/players/SearchPlayers";
import { GetPlayerById } from "../../application/players/GetPlayerById";
import { GetPlayerDetail } from "../../application/players/GetPlayerDetail";
import { GetPlayersByTeam } from "../../application/players/GetPlayersByTeam";
export declare class PlayerController {
    private searchPlayers;
    private getPlayerById;
    private getPlayerDetail;
    private getPlayersByTeam;
    constructor(searchPlayers: SearchPlayers, getPlayerById: GetPlayerById, getPlayerDetail: GetPlayerDetail, getPlayersByTeam: GetPlayersByTeam);
    search: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    getDetail: (req: Request, res: Response) => Promise<void>;
    getByTeam: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=PlayerController.d.ts.map