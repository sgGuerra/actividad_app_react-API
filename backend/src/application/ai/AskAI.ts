/**
 * AskAI.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: enviar una pregunta a la IA.
 *
 * Este caso de uso coordina:
 *   1. Recibir la pregunta y el contexto según el gameMode
 *   2. Obtener los datos deportivos de los repositorios
 *   3. Enviar todo al servicio de IA (NovitaAIService)
 *   4. Devolver la respuesta
 *
 * Soporta 3 modos: "country", "team", "player".
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { Team } from "../../domain/entities/Team";
import { Player } from "../../domain/entities/Player";
import { ISportRepository } from "../../domain/repositories/ISportRepository";
import { ILeagueRepository } from "../../domain/repositories/ILeagueRepository";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { IMatchRepository } from "../../domain/repositories/IMatchRepository";
import {
  askAI,
  ChatMessage,
  SportsContext,
  GameMode,
} from "../../infrastructure/external/NovitaAIService";

export class AskAI {
  constructor(
    private sportRepository: ISportRepository,
    private leagueRepository: ILeagueRepository,
    private teamRepository: ITeamRepository,
    private playerRepository: IPlayerRepository,
    private matchRepository: IMatchRepository
  ) {}

  /**
   * Ejecuta el caso de uso: envía la pregunta a la IA según el modo de juego.
   *
   * @param question     - La pregunta del usuario
   * @param country      - El país secreto (solo para mode "country")
   * @param chatHistory  - Historial de mensajes previos
   * @param gameMode     - Modo de juego: "country" | "team" | "player"
   * @param secretTeam   - Equipo secreto (solo para mode "team")
   * @param secretPlayer - Jugador secreto (solo para mode "player")
   * @returns            - La respuesta de la IA
   */
  async execute(
    question: string,
    country: Country | null,
    chatHistory: ChatMessage[] = [],
    gameMode: GameMode = "country",
    secretTeam: Team | null = null,
    secretPlayer: Player | null = null
  ): Promise<string> {
    // Recopilar TODOS los datos deportivos de los repositorios
    const sportsContext: SportsContext = {
      sports: this.sportRepository.findAll(),
      leagues: this.leagueRepository.findAll(),
      teams: this.teamRepository.findAll(),
      players: this.playerRepository.findAll(),
      matches: this.matchRepository.findAll(),
    };

    // Enviar a la IA con el contexto adecuado según el modo
    return askAI(question, country, sportsContext, chatHistory, gameMode, secretTeam, secretPlayer);
  }
}
