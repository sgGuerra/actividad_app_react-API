"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSportById = void 0;
class GetSportById {
    constructor(sportRepository) {
        this.sportRepository = sportRepository;
    }
    /**
     * Busca un deporte por ID.
     * @param id - ID del deporte (viene de req.params.id)
     * @returns El deporte encontrado, o null si no existe
     */
    execute(id) {
        return this.sportRepository.findById(id);
    }
}
exports.GetSportById = GetSportById;
//# sourceMappingURL=GetSportById.js.map