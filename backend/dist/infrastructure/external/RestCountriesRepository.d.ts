/**
 * RestCountriesRepository.ts
 * ─────────────────────────────────────────────────────────────
 * Implementación del repositorio de países.
 *
 * A diferencia de los repos deportivos (in-memory), este repo
 * actúa como PROXY a la REST Countries API externa.
 *
 * El backend actúa como "puente": el frontend llama al backend,
 * y el backend llama a restcountries.com.
 *
 * ¿Por qué no llamar directo desde el frontend?
 * → Centralizar todas las APIs en un solo punto
 * → Poder cachear, transformar, o agregar lógica sin tocar el front
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
export declare class RestCountriesRepository implements ICountryRepository {
    /**
     * Cache en memoria para no llamar a la API externa en cada request.
     * Se llena la primera vez que se llama a findAll().
     */
    private cache;
    /**
     * Obtiene todos los países de la REST Countries API.
     * Cachea el resultado para peticiones posteriores.
     */
    findAll(): Promise<Country[]>;
    /**
     * Obtiene un país aleatorio.
     * Primero carga todos los países (usa cache si existe),
     * luego elige uno al azar.
     */
    findRandom(): Promise<Country | null>;
}
//# sourceMappingURL=RestCountriesRepository.d.ts.map