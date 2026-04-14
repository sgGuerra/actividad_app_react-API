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

/** URL de la API externa — solo pedimos los campos que necesitamos */
const COUNTRIES_API_URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng,region,subregion";

export class RestCountriesRepository implements ICountryRepository {
  /**
   * Cache en memoria para no llamar a la API externa en cada request.
   * Se llena la primera vez que se llama a findAll().
   */
  private cache: Country[] | null = null;

  /**
   * Obtiene todos los países de la REST Countries API.
   * Cachea el resultado para peticiones posteriores.
   */
  async findAll(): Promise<Country[]> {
    // Si ya tenemos datos cacheados, devolverlos directo
    if (this.cache) {
      return this.cache;
    }

    // Llamar a la API externa
    const response = await fetch(COUNTRIES_API_URL);

    if (!response.ok) {
      throw new Error(`REST Countries API error: ${response.status}`);
    }

    const data: Country[] = await response.json();

    // Guardar en cache para futuras peticiones
    this.cache = data;
    return data;
  }

  /**
   * Obtiene un país aleatorio.
   * Primero carga todos los países (usa cache si existe),
   * luego elige uno al azar.
   */
  async findRandom(): Promise<Country | null> {
    const countries = await this.findAll();
    if (countries.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }
}
