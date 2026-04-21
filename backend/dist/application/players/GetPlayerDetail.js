"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerDetail = void 0;
class GetPlayerDetail {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async execute(id) {
        const player = await this.playerRepository.findById(id);
        if (!player)
            return null;
        const [formerTeams, honours, contracts, milestones] = await Promise.all([
            this.playerRepository.getFormerTeams(id),
            this.playerRepository.getHonours(id),
            this.playerRepository.getContracts(id),
            this.playerRepository.getMilestones(id),
        ]);
        return {
            ...player,
            formerTeams,
            honours,
            contracts,
            milestones,
        };
    }
}
exports.GetPlayerDetail = GetPlayerDetail;
//# sourceMappingURL=GetPlayerDetail.js.map