/**
 * AskAI.ts
 * ─────────────────────────────────────────────────────────────
 * Caso de uso: enviar una pregunta a la IA.
 *
 * Este caso de uso coordina:
 *   1. Recibir la pregunta y el contexto del país
 *   2. Obtener los datos deportivos de los repositorios
 *   3. Enviar todo al servicio de IA (NovitaAIService)
 *   4. Devolver la respuesta
 *
 * Es el "cerebro" que conecta ambos contextos (países + deportes)
 * y los envía a la IA para que responda.
 * ─────────────────────────────────────────────────────────────
 */
import { Country } from "../../domain/entities/Country";
import { ISportRepository } from "../../domain/repositories/ISportRepository";
import { ILeagueRepository } from "../../domain/repositories/ILeagueRepository";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { IMatchRepository } from "../../domain/repositories/IMatchRepository";
import {
  askAI,
  ChatMessage,
  SportsContext,
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
   * Ejecuta el caso de uso: envía la pregunta a la IA con ambos contextos.
   *
   * @param question    - La pregunta del usuario
   * @param country     - El país secreto del juego (puede ser null)
   * @param chatHistory - Historial de mensajes previos
   * @returns           - La respuesta de la IA
   */
  async execute(
    question: string,
    country: Country | null,
    chatHistory: ChatMessage[] = []
  ): Promise<string> {
    // Recopilar TODOS los datos deportivos de los repositorios
    const sportsContext: SportsContext = {
      sports: this.sportRepository.findAll(),
      leagues: this.leagueRepository.findAll(),
      teams: this.teamRepository.findAll(),
      players: this.playerRepository.findAll(),
      matches: this.matchRepository.findAll(),
    };

    // Enviar a la IA con ambos contextos (país + deportes)
    return askAI(question, country, sportsContext, chatHistory);
  }
}
