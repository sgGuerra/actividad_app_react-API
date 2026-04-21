"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerById = void 0;
class GetPlayerById {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async execute(id) {
        return await this.playerRepository.findById(id);
    }
}
exports.GetPlayerById = GetPlayerById;
//# sourceMappingURL=GetPlayerById.js.map