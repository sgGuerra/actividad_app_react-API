"use client";
/**
 * useSportsGame.ts
 * ─────────────────────────────────────────────────────────────
 * Custom React hook for the sports guessing games.
 * Supports two modes: "team" and "player".
 *
 * - Fetches teams/players from the backend
 * - Picks a random secret element
 * - Sends questions to the AI with the correct gameMode
 * - Handles guessing logic
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { Team, Player, ChatMessage, GameMode } from "@/utils/types";

const MAX_QUESTIONS = 20;

export function useSportsGame(mode: "team" | "player") {
  // ── State declarations ───────────────────────────────────────
  const [secretTeam, setSecretTeam] = useState<Team | null>(null);
  const [secretPlayer, setSecretPlayer] = useState<Player | null>(null);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionsUsed, setQuestionsUsed] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<"loading" | "playing" | "won" | "lost">("loading");
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch data on first load ─────────────────────────────────
  useEffect(() => {
    async function loadData() {
      try {
        setGameStatus("loading");

        if (mode === "team") {
          const res = await fetch("/api/teams");
          if (!res.ok) throw new Error("Could not load teams. Try refreshing.");
          const data: Team[] = await res.json();
          setAllTeams(data);
          startNewGame(data, []);
        } else {
          // mode === "player"
          // Fetch both players and teams (we need team info for display)
          const [playersRes, teamsRes] = await Promise.all([
            fetch("/api/players"),
            fetch("/api/teams"),
          ]);
          if (!playersRes.ok) throw new Error("Could not load players. Try refreshing.");
          if (!teamsRes.ok) throw new Error("Could not load teams. Try refreshing.");
          const playersData: Player[] = await playersRes.json();
          const teamsData: Team[] = await teamsRes.json();
          setAllPlayers(playersData);
          setAllTeams(teamsData);
          startNewGame(teamsData, playersData);
        }
      } catch (err: any) {
        setError(err.message);
        setGameStatus("loading");
      }
    }

    loadData();
  }, []);

  // ── Start (or restart) the game ─────────────────────────────
  const startNewGame = useCallback(
    (teams: Team[] = allTeams, players: Player[] = allPlayers) => {
      if (mode === "team") {
        const list = teams.length > 0 ? teams : allTeams;
        if (list.length === 0) return;
        const chosen = list[Math.floor(Math.random() * list.length)];
        setSecretTeam(chosen);
        setSecretPlayer(null);
        setMessages([
          {
            role: "ai",
            text: "🏟️ I'm thinking of a sports team... You have 20 questions to find out which one! Ask me anything!",
          },
        ]);
      } else {
        const list = players.length > 0 ? players : allPlayers;
        if (list.length === 0) return;
        const chosen = list[Math.floor(Math.random() * list.length)];
        setSecretPlayer(chosen);
        setSecretTeam(null);
        setMessages([
          {
            role: "ai",
            text: "🧑‍🤝‍🧑 I'm thinking of a sports player... You have 20 questions to find out who! Ask me anything!",
          },
        ]);
      }

      setQuestionsUsed(0);
      setGameStatus("playing");
      setIsAiThinking(false);
      setError(null);
    },
    [allTeams, allPlayers, mode]
  );

  // ── Handle a question from the user ─────────────────────────
  const askQuestion = useCallback(
    async (questionText: string) => {
      if (gameStatus !== "playing" || isAiThinking) return;
      if (!questionText.trim()) return;

      const newQuestionCount = questionsUsed + 1;

      setMessages((prev) => [
        ...prev,
        { role: "user", text: questionText },
      ]);
      setQuestionsUsed(newQuestionCount);
      setIsAiThinking(true);
      setError(null);

      try {
        const historyForAI = messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        }));

        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionText,
            country: null,
            history: historyForAI,
            gameMode: mode as GameMode,
            secretTeam: mode === "team" ? secretTeam : null,
            secretPlayer: mode === "player" ? secretPlayer : null,
          }),
        });

        if (!res.ok) throw new Error("Could not get an answer. Try again.");

        const { answer } = await res.json();

        setMessages((prev) => [...prev, { role: "ai", text: answer }]);

        if (newQuestionCount >= MAX_QUESTIONS) {
          setGameStatus("lost");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsAiThinking(false);
      }
    },
    [gameStatus, isAiThinking, questionsUsed, messages, secretTeam, secretPlayer, mode]
  );

  // ── Handle a guess from the user ────────────────────────────
  const submitGuess = useCallback(
    async (guessText: string) => {
      if (gameStatus !== "playing" || isAiThinking) return;
      if (!guessText.trim()) return;

      const normalized = guessText.trim().toLowerCase();
      let isCorrect = false;
      let secretName = "";

      if (mode === "team" && secretTeam) {
        secretName = secretTeam.name;
        isCorrect = normalized === secretTeam.name.toLowerCase();
      } else if (mode === "player" && secretPlayer) {
        secretName = secretPlayer.name;
        isCorrect = normalized === secretPlayer.name.toLowerCase();
      }

      const newQuestionCount = questionsUsed + 1;

      setMessages((prev) => [
        ...prev,
        { role: "user", text: `🔍 My guess: ${guessText}` },
      ]);
      setQuestionsUsed(newQuestionCount);

      if (isCorrect) {
        setMessages((prev) => [
          ...(prev as ChatMessage[]),
          {
            role: "ai" as const,
            text: `🎉 YES! You got it! The ${mode} was **${secretName}**! Incredible skills! 🌟`,
          },
        ]);
        setGameStatus("won");
      } else {
        const remaining = MAX_QUESTIONS - newQuestionCount;
        setMessages((prev) => [
          ...(prev as ChatMessage[]),
          {
            role: "ai" as const,
            text:
              remaining > 0
                ? `❌ Nope, that's not it! You have ${remaining} question${remaining !== 1 ? "s" : ""} left. Keep thinking!`
                : `❌ Wrong guess! You've used all your questions. The ${mode} was **${secretName}**. Better luck next time!`,
          },
        ]);

        if (newQuestionCount >= MAX_QUESTIONS) {
          setGameStatus("lost");
        }
      }
    },
    [gameStatus, isAiThinking, questionsUsed, secretTeam, secretPlayer, mode]
  );

  // ── Return everything the UI needs ──────────────────────────
  return {
    secretTeam,
    secretPlayer,
    allTeams,
    messages,
    questionsUsed,
    questionsRemaining: MAX_QUESTIONS - questionsUsed,
    maxQuestions: MAX_QUESTIONS,
    gameStatus,
    isAiThinking,
    error,
    askQuestion,
    submitGuess,
    restartGame: () => startNewGame(),
  };
}
