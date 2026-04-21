"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPlayers = void 0;
class SearchPlayers {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async execute(name) {
        return await this.playerRepository.searchByName(name);
    }
}
exports.SearchPlayers = SearchPlayers;
//# sourceMappingURL=SearchPlayers.js.map