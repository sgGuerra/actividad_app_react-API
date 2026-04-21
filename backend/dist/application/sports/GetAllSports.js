"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSports = void 0;
class GetAllSports {
    /**
     * El repositorio se inyecta por constructor.
     * Esto es "Dependency Injection" — una pieza clave de Clean Architecture.
     */
    constructor(sportRepository) {
        this.sportRepository = sportRepository;
    }
    /**
     * Ejecuta el caso de uso.
     * @returns Lista de todos los deportes
     */
    execute() {
        return this.sportRepository.findAll();
    }
}
exports.GetAllSports = GetAllSports;
//# sourceMappingURL=GetAllSports.js.map