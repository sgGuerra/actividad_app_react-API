"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheSportsDBPlayerRepository = void 0;
const TheSportsDBService_1 = require("../external/TheSportsDBService");
class TheSportsDBPlayerRepository {
    constructor() {
        this.service = new TheSportsDBService_1.TheSportsDBService();
    }
    async searchByName(name) {
        return await this.service.searchPlayers(name);
    }
    async findById(id) {
        return await this.service.lookupPlayer(id);
    }
    async getByTeamId(teamId) {
        return await this.service.getPlayersByTeam(teamId);
    }
    async getFormerTeams(playerId) {
        return await this.service.lookupFormerTeams(playerId);
    }
    async getHonours(playerId) {
        return await this.service.lookupHonours(playerId);
    }
    async getContracts(playerId) {
        return await this.service.lookupContracts(playerId);
    }
    async getMilestones(playerId) {
        return await this.service.lookupMilestones(playerId);
    }
}
exports.TheSportsDBPlayerRepository = TheSportsDBPlayerRepository;
//# sourceMappingURL=TheSportsDBPlayerRepository.js.map