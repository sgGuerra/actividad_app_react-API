"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskAI = void 0;
const NovitaAIService_1 = require("../../infrastructure/external/NovitaAIService");
const GetPlayerDetail_1 = require("./../players/GetPlayerDetail");
class AskAI {
    constructor(teamRepository, playerRepository) {
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
        this.getPlayerDetail = new GetPlayerDetail_1.GetPlayerDetail(playerRepository);
    }
    /**
     * Ejecuta el caso de uso: envía la pregunta a la IA con ambos contextos.
     *
     * @param question    - La pregunta del usuario
     * @param country     - El país secreto del juego (puede ser null)
     * @param playerName  - Nombre del jugador para buscar
     * @param teamName    - Nombre del equipo para buscar
     * @param chatHistory - Historial de mensajes previos
     * @returns           - La respuesta de la IA
     */
    async execute(question, country, playerName, teamName, chatHistory = []) {
        let playerDetails = [];
        let teams = [];
        // Buscar jugador en tiempo real si se especificó
        if (playerName) {
            const playersFound = await this.playerRepository.searchByName(playerName);
            if (playersFound && playersFound.length > 0) {
                // Obtenemos detalle completo de los primeros 2 para evitar payloads muy grandes
                for (const p of playersFound.slice(0, 2)) {
                    const detail = await this.getPlayerDetail.execute(p.idPlayer);
                    if (detail) {
                        playerDetails.push(detail);
                    }
                }
            }
        }
        // Buscar equipo en tiempo real si se especificó
        if (teamName) {
            const teamsFound = await this.teamRepository.searchByName(teamName);
            if (teamsFound && teamsFound.length > 0) {
                teams = teamsFound.slice(0, 3);
            }
        }
        const sportsContext = {
            players: playerDetails,
            teams: teams,
        };
        // Enviar a la IA con ambos contextos
        return (0, NovitaAIService_1.askAI)(question, country, sportsContext, chatHistory);
    }
}
exports.AskAI = AskAI;
//# sourceMappingURL=AskAI.js.map