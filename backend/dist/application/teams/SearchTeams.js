"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTeams = void 0;
class SearchTeams {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async execute(name) {
        return await this.teamRepository.searchByName(name);
    }
}
exports.SearchTeams = SearchTeams;
//# sourceMappingURL=SearchTeams.js.map