"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTeamsByLeague = void 0;
class GetTeamsByLeague {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async execute(league) {
        return await this.teamRepository.getByLeague(league);
    }
}
exports.GetTeamsByLeague = GetTeamsByLeague;
//# sourceMappingURL=GetTeamsByLeague.js.map