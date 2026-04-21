import { Country } from "../../domain/entities/Country";
export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}
export interface SportsContext {
    players: any[];
    teams: any[];
}
/**
 * Función principal para interactuar con la IA.
 * Construye el sistema, formatea el historial y envía la consulta.
 */
export declare function askAI(question: string, country: Country | null, sportsCtx: SportsContext, chatHistory?: ChatMessage[]): Promise<string>;
//# sourceMappingURL=NovitaAIService.d.ts.map