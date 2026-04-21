"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheSportsDBTeamRepository = void 0;
const TheSportsDBService_1 = require("../external/TheSportsDBService");
class TheSportsDBTeamRepository {
    constructor() {
        this.service = new TheSportsDBService_1.TheSportsDBService();
    }
    async searchByName(name) {
        return await this.service.searchTeams(name);
    }
    async findById(id) {
        return await this.service.lookupTeam(id);
    }
    async getByLeague(league) {
        return await this.service.getTeamsByLeague(league);
    }
    async getPlayers(teamId) {
        return await this.service.getPlayersByTeam(teamId);
    }
}
exports.TheSportsDBTeamRepository = TheSportsDBTeamRepository;
//# sourceMappingURL=TheSportsDBTeamRepository.js.map