/**
 * TheSportsDBLeagueRepository.ts
 * -------------------------------------------------------------
 * Implementaci�n del repositorio de ligas usando TheSportsDB API.
 * -------------------------------------------------------------
 */
import { League } from "../../domain/entities/League";
import { ILeagueRepository } from "../../domain/repositories/ILeagueRepository";
export declare class TheSportsDBLeagueRepository implements ILeagueRepository {
    private service;
    /**
     * Devuelve todas las ligas. Nota: TheSportsDB no tiene un endpoint para todas las ligas,
     * as� que obtenemos ligas de deportes populares.
     */
    findAll(): Promise<League[]>;
    /**
     * Busca una liga por su ID.
     */
    findById(id: number): Promise<League | null>;
}
//# sourceMappingURL=TheSportsDBLeagueRepository.d.ts.map