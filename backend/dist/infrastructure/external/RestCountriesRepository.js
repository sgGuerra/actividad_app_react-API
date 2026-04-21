"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestCountriesRepository = void 0;
/** URL de la API externa — solo pedimos los campos que necesitamos */
const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng,region,subregion";
class RestCountriesRepository {
    constructor() {
        /**
         * Cache en memoria para no llamar a la API externa en cada request.
         * Se llena la primera vez que se llama a findAll().
         */
        this.cache = null;
    }
    /**
     * Obtiene todos los países de la REST Countries API.
     * Cachea el resultado para peticiones posteriores.
     */
    async findAll() {
        // Si ya tenemos datos cacheados, devolverlos directo
        if (this.cache) {
            return this.cache;
        }
        // Llamar a la API externa
        const response = await fetch(COUNTRIES_API_URL);
        if (!response.ok) {
            throw new Error(`REST Countries API error: ${response.status}`);
        }
        const data = (await response.json());
        // Guardar en cache para futuras peticiones
        this.cache = data;
        return data;
    }
    /**
     * Obtiene un país aleatorio.
     * Primero carga todos los países (usa cache si existe),
     * luego elige uno al azar.
     */
    async findRandom() {
        const countries = await this.findAll();
        if (countries.length === 0)
            return null;
        const randomIndex = Math.floor(Math.random() * countries.length);
        return countries[randomIndex];
    }
}
exports.RestCountriesRepository = RestCountriesRepository;
//# sourceMappingURL=RestCountriesRepository.js.map