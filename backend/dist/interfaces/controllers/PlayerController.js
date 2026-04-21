"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
class PlayerController {
    constructor(searchPlayers, getPlayerById, getPlayerDetail, getPlayersByTeam) {
        this.searchPlayers = searchPlayers;
        this.getPlayerById = getPlayerById;
        this.getPlayerDetail = getPlayerDetail;
        this.getPlayersByTeam = getPlayersByTeam;
        this.search = async (req, res) => {
            try {
                const name = req.query.name?.toString();
                if (!name) {
                    res.status(400).json({ error: "Query param 'name' es requerido" });
                    return;
                }
                const players = await this.searchPlayers.execute(name);
                res.json(players);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id?.toString();
                const player = await this.getPlayerById.execute(id);
                if (!player) {
                    res.status(404).json({ error: "Jugador no encontrado" });
                    return;
                }
                res.json(player);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getDetail = async (req, res) => {
            try {
                const id = req.params.id?.toString();
                const playerDetail = await this.getPlayerDetail.execute(id);
                if (!playerDetail) {
                    res.status(404).json({ error: "Jugador no encontrado" });
                    return;
                }
                res.json(playerDetail);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getByTeam = async (req, res) => {
            try {
                const teamId = req.params.teamId?.toString();
                const players = await this.getPlayersByTeam.execute(teamId);
                res.json(players);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
    }
}
exports.PlayerController = PlayerController;
//# sourceMappingURL=PlayerController.js.map