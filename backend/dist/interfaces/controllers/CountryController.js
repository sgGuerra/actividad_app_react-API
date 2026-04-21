"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
class CountryController {
    constructor(getAllCountries, getRandomCountry) {
        this.getAllCountries = getAllCountries;
        this.getRandomCountry = getRandomCountry;
        /** GET /api/countries — Todos los países */
        this.getAll = async (_req, res) => {
            try {
                const countries = await this.getAllCountries.execute();
                res.json(countries);
            }
            catch (error) {
                console.error("Error al obtener países:", error);
                res.status(500).json({ error: "No se pudieron obtener los países" });
            }
        };
        /** GET /api/countries/random — Un país aleatorio */
        this.getRandom = async (_req, res) => {
            try {
                const country = await this.getRandomCountry.execute();
                if (!country) {
                    res.status(500).json({ error: "No se pudo obtener un país aleatorio" });
                    return;
                }
                res.json(country);
            }
            catch (error) {
                console.error("Error al obtener país aleatorio:", error);
                res.status(500).json({ error: "No se pudo obtener un país aleatorio" });
            }
        };
    }
}
exports.CountryController = CountryController;
//# sourceMappingURL=CountryController.js.map