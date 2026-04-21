/**
 * TheSportsDBSportRepository.ts
 * -------------------------------------------------------------
 * Implementaci�n del repositorio de deportes usando TheSportsDB API.
 *
 * Esta clase implementa la interfaz ISportRepository definida en el dominio,
 * pero obtiene los datos de la API externa de TheSportsDB.
 * -------------------------------------------------------------
 */
import { Sport } from "../../domain/entities/Sport";
import { ISportRepository } from "../../domain/repositories/ISportRepository";
export declare class TheSportsDBSportRepository implements ISportRepository {
    private service;
    /**
     * Devuelve todos los deportes de TheSportsDB API.
     */
    findAll(): Promise<Sport[]>;
    /**
     * Busca un deporte por su ID.
     */
    findById(id: number): Promise<Sport | null>;
}
//# sourceMappingURL=TheSportsDBSportRepository.d.ts.map