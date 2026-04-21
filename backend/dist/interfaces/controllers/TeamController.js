"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
class TeamController {
    constructor(searchTeams, getTeamById, getTeamsByLeague, teamRepository // Atajo para obtener jugadores
    ) {
        this.searchTeams = searchTeams;
        this.getTeamById = getTeamById;
        this.getTeamsByLeague = getTeamsByLeague;
        this.teamRepository = teamRepository;
        this.search = async (req, res) => {
            try {
                const name = req.query.name?.toString();
                if (!name) {
                    res.status(400).json({ error: "Query param 'name' es requerido" });
                    return;
                }
                const teams = await this.searchTeams.execute(name);
                res.json(teams);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id?.toString();
                const team = await this.getTeamById.execute(id);
                if (!team) {
                    res.status(404).json({ error: "Equipo no encontrado" });
                    return;
                }
                res.json(team);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getByLeague = async (req, res) => {
            try {
                const league = req.params.league?.toString();
                const teams = await this.getTeamsByLeague.execute(league);
                res.json(teams);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getPlayers = async (req, res) => {
            try {
                const id = req.params.id?.toString();
                const players = await this.teamRepository.getPlayers(id);
                res.json(players);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
    }
}
exports.TeamController = TeamController;
//# sourceMappingURL=TeamController.js.map