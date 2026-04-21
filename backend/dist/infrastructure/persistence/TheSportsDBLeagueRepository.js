"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheSportsDBLeagueRepository = void 0;
const TheSportsDBService_1 = require("../external/TheSportsDBService");
class TheSportsDBLeagueRepository {
    constructor() {
        this.service = new TheSportsDBService_1.TheSportsDBService();
    }
    /**
     * Devuelve todas las ligas. Nota: TheSportsDB no tiene un endpoint para todas las ligas,
     * as� que obtenemos ligas de deportes populares.
     */
    async findAll() {
        const sports = await this.service.getAllSports();
        const leagues = [];
        for (const sport of sports.slice(0, 3)) { // Limitar a primeros 3 deportes para evitar demasiadas llamadas
            const sportLeagues = await this.service.getLeaguesBySport(sport.strSport);
            leagues.push(...sportLeagues.map((league) => ({
                id: parseInt(league.idLeague),
                name: league.strLeague,
                country: league.strCountry,
                sport_id: parseInt(league.idSport),
            })));
        }
        return leagues;
    }
    /**
     * Busca una liga por su ID.
     */
    async findById(id) {
        const leagues = await this.findAll();
        return leagues.find((league) => league.id === id) ?? null;
    }
}
exports.TheSportsDBLeagueRepository = TheSportsDBLeagueRepository;
//# sourceMappingURL=TheSportsDBLeagueRepository.js.map