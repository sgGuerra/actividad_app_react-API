"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportController = void 0;
class SportController {
    constructor(getAllSports, getSportById) {
        this.getAllSports = getAllSports;
        this.getSportById = getSportById;
        /**
         * GET /api/sports
         * Devuelve todos los deportes.
         */
        this.getAll = (_req, res) => {
            const sports = this.getAllSports.execute();
            res.json(sports);
        };
        /**
         * GET /api/sports/:id
         * Devuelve un deporte por su ID.
         *
         * req.params.id contiene el valor del :id en la URL.
         * Ejemplo: GET /api/sports/1 → req.params.id === "1"
         *
         * Nota: req.params.id siempre es STRING, hay que convertirlo a número.
         */
        this.getById = (req, res) => {
            // Extraer el route param y convertir a número
            const id = parseInt(req.params.id, 10);
            // Validar que el ID sea un número válido
            if (isNaN(id)) {
                res.status(400).json({ error: "El ID debe ser un número válido" });
                return;
            }
            const sport = this.getSportById.execute(id);
            // Si no se encontró, devolver 404
            if (!sport) {
                res.status(404).json({ error: `Deporte con ID ${id} no encontrado` });
                return;
            }
            res.json(sport);
        };
    }
}
exports.SportController = SportController;
//# sourceMappingURL=SportController.js.map