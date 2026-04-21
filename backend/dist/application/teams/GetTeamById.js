"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTeamById = void 0;
class GetTeamById {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async execute(id) {
        return await this.teamRepository.findById(id);
    }
}
exports.GetTeamById = GetTeamById;
//# sourceMappingURL=GetTeamById.js.map