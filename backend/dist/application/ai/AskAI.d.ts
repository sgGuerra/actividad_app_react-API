import { Country } from "../../domain/entities/Country";
import { ChatMessage } from "../../infrastructure/external/NovitaAIService";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
export declare class AskAI {
    private teamRepository;
    private playerRepository;
    private getPlayerDetail;
    constructor(teamRepository: ITeamRepository, playerRepository: IPlayerRepository);
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
    execute(question: string, country: Country | null, playerName: string | null, teamName: string | null, chatHistory?: ChatMessage[]): Promise<string>;
}
//# sourceMappingURL=AskAI.d.ts.map