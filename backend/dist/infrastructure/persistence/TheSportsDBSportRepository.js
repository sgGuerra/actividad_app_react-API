"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheSportsDBSportRepository = void 0;
const TheSportsDBService_1 = require("../external/TheSportsDBService");
class TheSportsDBSportRepository {
    constructor() {
        this.service = new TheSportsDBService_1.TheSportsDBService();
    }
    /**
     * Devuelve todos los deportes de TheSportsDB API.
     */
    async findAll() {
        const sportsData = await this.service.getAllSports();
        return sportsData.map((sport) => ({
            id: parseInt(sport.idSport),
            name: sport.strSport,
            slug: sport.strSport.toLowerCase().replace(/\s+/g, '-'),
        }));
    }
    /**
     * Busca un deporte por su ID.
     */
    async findById(id) {
        const sports = await this.findAll();
        return sports.find((sport) => sport.id === id) ?? null;
    }
}
exports.TheSportsDBSportRepository = TheSportsDBSportRepository;
//# sourceMappingURL=TheSportsDBSportRepository.js.map