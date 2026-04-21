"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTeams = void 0;
class GetAllTeams {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    execute() {
        return this.teamRepository.findAll();
    }
}
exports.GetAllTeams = GetAllTeams;
//# sourceMappingURL=GetAllTeams.js.map