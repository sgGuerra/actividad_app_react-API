"use client";
/**
 * useGame.ts
 * ─────────────────────────────────────────────────────────────
 * Custom React hook que maneja TODO el estado y la lógica del juego.
 *
 * CAMBIOS respecto a la versión anterior:
 *   - Ya NO llama directamente a restcountries.com
 *   - Llama al BACKEND (Express) que actúa como puente:
 *       /api/countries       → todos los países
 *       /api/countries/random → país aleatorio
 *       /api/ask             → pregunta a la IA
 *
 *   - Gracias a los rewrites en next.config.js, estas URLs
 *     se redirigen transparentemente al backend (puerto 3001).
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { getRandomCountry, checkGuess } from "@/utils/countryUtils";
import { Country, ChatMessage, GameCategory } from "@/utils/types";

// How many questions the player gets per game
const MAX_QUESTIONS = 20;
const SPORTS_PLAYERS = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Kylian Mbappe",
  "Alexia Putellas",
  "Erling Haaland",
  "Aitana Bonmati",
];

const SPORTS_TEAMS = [
  "Real Madrid",
  "Manchester City",
  "Barcelona",
  "Bayern Munich",
  "Boca Juniors",
  "River Plate",
];

function normalizeText(text?: string) {
  return text?.trim().toLowerCase() ?? "";
}

export function useGame(initialCategory: GameCategory = "country") {
  // ── State declarations ───────────────────────────────────────

  // The secret country (never shown to the user during the game)
  const [secretCountry, setSecretCountry] = useState<Country | null>(null);

  // All countries loaded from the API (used to pick a random one)
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  // The chat history: array of { role: "user"|"ai", text: string }
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // How many questions the user has asked so far
  const [questionsUsed, setQuestionsUsed] = useState<number>(0);

  // Game status: "loading" | "playing" | "won" | "lost"
  const [gameStatus, setGameStatus] = useState<"loading" | "playing" | "won" | "lost">("loading");

  // Whether the AI is currently generating a response
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Any error message to show the user
  const [error, setError] = useState<string | null>(null);
  const [gameCategory, setGameCategory] = useState<GameCategory>(initialCategory);
  const [secretPlayer, setSecretPlayer] = useState<string | null>(null);
  const [secretTeam, setSecretTeam] = useState<string | null>(null);

  // ── Fetch countries on first load ───────────────────────────
  // CAMBIO: Ahora llama al BACKEND (/api/countries) en vez de
  //         restcountries.com directamente.
  useEffect(() => {
    async function loadCountries() {
      try {
        setGameStatus("loading");

        // Llamar al backend (el rewrite redirige a localhost:3001)
        const res = await fetch("/api/countries");

        if (!res.ok) throw new Error("No se pudieron cargar los datos. Intenta recargar.");

        const data = await res.json();
        setAllCountries(data);

        // Pick a random country and start the game using requested category
        const chosen = getRandomCountry(data);
        startNewGame(initialCategory, chosen);
      } catch (err: any) {
        setError(err.message);
        setGameStatus("loading"); // stays on loading so error shows
      }
    }

    loadCountries();
  }, [initialCategory]); // Empty array = run once when component mounts

  // ── Start (or restart) the game ─────────────────────────────
  const startNewGame = useCallback(
    (category: GameCategory = gameCategory, country: Country | null = null) => {
      const newCountry = category === "country" ? country ?? getRandomCountry(allCountries) : null;
      const newPlayer =
        category === "player"
          ? SPORTS_PLAYERS[Math.floor(Math.random() * SPORTS_PLAYERS.length)]
          : null;
      const newTeam =
        category === "team"
          ? SPORTS_TEAMS[Math.floor(Math.random() * SPORTS_TEAMS.length)]
          : null;

      console.log(
        "[TESTING] Respuesta secreta:",
        category === "country"
          ? newCountry?.name.common
          : category === "player"
            ? newPlayer
            : newTeam
      );

      setGameCategory(category);
      setSecretCountry(newCountry);
      setSecretPlayer(newPlayer);
      setSecretTeam(newTeam);
      setMessages([
        {
          role: "ai",
          text:
            category === "country"
              ? "Estoy pensando en un país. Tienes 20 preguntas para descubrir cuál es."
              : category === "player"
                ? "Estoy pensando en un jugador famoso. Tienes 20 preguntas para adivinarlo."
                : "Estoy pensando en un equipo de fútbol. Tienes 20 preguntas para acertarlo.",
        },
      ]);
      setQuestionsUsed(0);
      setGameStatus("playing");
      setIsAiThinking(false);
      setError(null);
    },
    [allCountries, gameCategory]
  );

  // ── Handle a question from the user ─────────────────────────
  const askQuestion = useCallback(
    async (questionText: string) => {
      // Guard: don't allow questions if game isn't active
      if (gameStatus !== "playing" || isAiThinking) return;
      if (!questionText.trim()) return;

      const newQuestionCount = questionsUsed + 1;

      // Add the user's message to the chat
      setMessages((prev) => [
        ...prev,
        { role: "user", text: questionText },
      ]);
      setQuestionsUsed(newQuestionCount);
      setIsAiThinking(true);
      setError(null);

      try {
        // Build the chat history in the format the AI service expects
        const historyForAI = messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        }));

        /**
         * CAMBIO: Llama a /api/ask que se redirige al backend Express.
         * El backend tiene el aiService que construye el prompt con
         * AMBOS contextos (países + deportes).
         */
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionText,
            country: gameCategory === "country" ? secretCountry : null,
            playerName: gameCategory === "player" ? secretPlayer : null,
            teamName: gameCategory === "team" ? secretTeam : null,
            history: historyForAI,
          }),
        });

        if (!res.ok) throw new Error("No pudimos obtener una respuesta. Intenta de nuevo.");

        const { answer } = await res.json();

        // Add AI response to chat
        setMessages((prev) => [...prev, { role: "ai", text: answer }]);

        // Check if the player has run out of questions
        if (newQuestionCount >= MAX_QUESTIONS) {
          setGameStatus("lost");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsAiThinking(false);
      }
    },
    [gameStatus, isAiThinking, questionsUsed, messages, secretCountry, gameCategory, secretPlayer, secretTeam]
  );

  // ── Handle a country guess from the user ────────────────────
  const submitGuess = useCallback(
    async (guessText: string) => {
      if (gameStatus !== "playing" || isAiThinking) return;
      if (!guessText.trim()) return;

      const isCorrect =
        gameCategory === "country"
          ? checkGuess(guessText, secretCountry)
          : gameCategory === "player"
            ? normalizeText(guessText) === normalizeText(secretPlayer ?? "")
            : normalizeText(guessText) === normalizeText(secretTeam ?? "");
      const newQuestionCount = questionsUsed + 1;

      // Add the guess as a user message
      setMessages((prev) => [
        ...prev,
        { role: "user", text: `Adivino: ${guessText}` },
      ]);
      setQuestionsUsed(newQuestionCount);

      if (isCorrect) {
        // Player wins!
        setMessages((prev) => [
          ...(prev as ChatMessage[]),
          {
            role: "ai" as const,
            text:
              gameCategory === "country"
                ? `Correcto. Era **${secretCountry?.name.common}**.`
                : gameCategory === "player"
                  ? `Correcto. Era **${secretPlayer}**.`
                  : `Correcto. Era **${secretTeam}**.`,
          },
        ]);
        setGameStatus("won");
      } else {
        // Wrong guess — counts as a used question
        const remaining = MAX_QUESTIONS - newQuestionCount;
        setMessages((prev) => [
          ...(prev as ChatMessage[]),
          {
            role: "ai" as const,
            text:
              remaining > 0
                ? `No es correcto. Te quedan ${remaining} pregunta${remaining !== 1 ? "s" : ""}.`
                : gameCategory === "country"
                  ? `Agotaste tus preguntas. La respuesta era **${secretCountry?.name.common}**.`
                  : gameCategory === "player"
                    ? `Agotaste tus preguntas. La respuesta era **${secretPlayer}**.`
                    : `Agotaste tus preguntas. La respuesta era **${secretTeam}**.`,
          },
        ]);

        if (newQuestionCount >= MAX_QUESTIONS) {
          setGameStatus("lost");
        }
      }
    },
    [gameStatus, isAiThinking, questionsUsed, secretCountry, gameCategory, secretPlayer, secretTeam]
  );

  const changeCategory = useCallback(
    (nextCategory: GameCategory) => {
      startNewGame(nextCategory);
    },
    [startNewGame]
  );

  const checkAutoGuess = useCallback((text: string) => {
    if (gameStatus !== "playing" || isAiThinking) return;
    if (!text.trim()) return;

    const isCorrect =
      gameCategory === "country"
        ? checkGuess(text, secretCountry)
        : gameCategory === "player"
          ? normalizeText(text) === normalizeText(secretPlayer ?? "")
          : normalizeText(text) === normalizeText(secretTeam ?? "");

    if (isCorrect) {
      submitGuess(text);
    }
  }, [gameStatus, isAiThinking, gameCategory, secretCountry, secretPlayer, secretTeam, submitGuess]);

  // ── Return everything the UI needs ──────────────────────────
  return {
    secretCountry,
    messages,
    questionsUsed,
    questionsRemaining: MAX_QUESTIONS - questionsUsed,
    maxQuestions: MAX_QUESTIONS,
    gameStatus,
    isAiThinking,
    error,
    gameCategory,
    askQuestion,
    submitGuess,
    checkAutoGuess,
    changeCategory,
    restartGame: () => startNewGame(gameCategory),
  };
}
