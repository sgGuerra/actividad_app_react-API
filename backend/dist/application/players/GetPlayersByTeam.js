"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayersByTeam = void 0;
class GetPlayersByTeam {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async execute(teamId) {
        return await this.playerRepository.getByTeamId(teamId);
    }
}
exports.GetPlayersByTeam = GetPlayersByTeam;
//# sourceMappingURL=GetPlayersByTeam.js.map