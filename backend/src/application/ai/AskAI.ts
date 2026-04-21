import { Country } from "../../domain/entities/Country";
import { Team } from "../../domain/entities/Team";
import {
  askAI,
  ChatMessage,
  SportsContext,
} from "../../infrastructure/external/NovitaAIService";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { GetPlayerDetail, PlayerDetail } from "./../players/GetPlayerDetail";

export class AskAI {
  private getPlayerDetail: GetPlayerDetail;

  constructor(
    private teamRepository: ITeamRepository,
    private playerRepository: IPlayerRepository
  ) {
    this.getPlayerDetail = new GetPlayerDetail(playerRepository);
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
  async execute(
    question: string,
    country: Country | null,
    playerName: string | null,
    teamName: string | null,
    chatHistory: ChatMessage[] = []
  ): Promise<string> {
    let playerDetails: PlayerDetail[] = [];
    let teams: Team[] = [];

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

    const sportsContext: SportsContext = {
      players: playerDetails,
      teams: teams,
    };

    // Enviar a la IA con ambos contextos
    return askAI(question, country, sportsContext, chatHistory);
  }
}
