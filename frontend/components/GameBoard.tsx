"use client";

import { useGame } from "@/hooks/useGame";
import { useEffect, useRef, useState } from "react";
import ChatBox from "@/components/ChatBox";
import GameUnifiedInput from "@/components/GameUnifiedInput";
import CountryCard from "@/components/CountryCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { GameCategory } from "@/utils/types";
interface GameBoardProps {
  initialCategory?: GameCategory;
}

export default function GameBoard({ initialCategory = "country" }: GameBoardProps) {
  const {
    secretCountry,
    messages,
    questionsUsed,
    questionsRemaining,
    maxQuestions,
    gameStatus,
    isAiThinking,
    error,
    gameCategory,
    askQuestion,
    submitGuess,
    checkAutoGuess,
    restartGame,
  } = useGame(initialCategory);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const isGameOver = gameStatus === "won" || gameStatus === "lost";
  const inputsDisabled = isAiThinking || isGameOver;
  const progressPercent = (questionsUsed / maxQuestions) * 100;

  useEffect(() => {
    const target = boardRef.current;
    if (!target) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (event: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    const handleEnter = () => setShowCursor(true);
    const handleLeave = () => setShowCursor(false);

    target.addEventListener("mouseenter", handleEnter);
    target.addEventListener("mouseleave", handleLeave);
    target.addEventListener("mousemove", handleMove);

    return () => {
      target.removeEventListener("mouseenter", handleEnter);
      target.removeEventListener("mouseleave", handleLeave);
      target.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    const target = boardRef.current;
    if (!target) return;

    const revealItems = Array.from(target.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4", "scale-[0.98]");
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [gameStatus]);

  if (gameStatus === "loading") {
    return (
      <div className="rounded-3xl border border-cyan-300/20 bg-black/80 p-6">
        <LoadingSpinner size="lg" message="Preparando la experiencia..." />
        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={boardRef} className="relative space-y-6 overflow-hidden rounded-3xl border border-indigo-300/20 bg-gradient-to-b from-[#0b1020]/90 to-black/90 p-4 sm:p-6 backdrop-blur-xl">
      {showCursor && (
        <span
          className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 transition-transform duration-150 ease-out"
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}

      <div data-reveal className="relative z-10 flex scale-[0.98] flex-col gap-4 opacity-0 translate-y-4 transition-all duration-700 ease-in-out">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
            Intentos usados
          </span>
          <span className="font-mono text-sm text-indigo-100">
            {questionsUsed} / {maxQuestions}
          </span>
        </div>
        <div className="h-8 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-in-out ${
              questionsRemaining <= 5 ? "bg-fuchsia-300/80" : "bg-cyan-300"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {gameStatus === "won" && (
        <GameOverBanner
          type="won"
          questionsUsed={questionsUsed}
          onRestart={restartGame}
        />
      )}
      {gameStatus === "lost" && (
        <GameOverBanner type="lost" onRestart={restartGame} />
      )}



      <ChatBox messages={messages} isAiThinking={isAiThinking} />

      {!isGameOver && (
        <div data-reveal className="relative z-10 rounded-2xl border border-cyan-300/20 bg-white/[0.05] p-4 sm:p-5 scale-[0.98] opacity-0 translate-y-4 transition-all duration-700 ease-in-out">
          <GameUnifiedInput
            onAsk={askQuestion}
            onGuess={submitGuess}
            onAutoCheck={checkAutoGuess}
            disabled={inputsDisabled}
            questionsRemaining={questionsRemaining}
          />
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {isGameOver && gameCategory === "country" && secretCountry && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white">
            Respuesta correcta
          </h3>
          <CountryCard country={secretCountry} />
          <button
            onClick={restartGame}
            className="h-12 w-full rounded-xl border border-white bg-white text-sm font-semibold uppercase tracking-wide text-black transition-all duration-300 ease-in-out hover:bg-transparent hover:text-white"
          >
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}

interface GameOverBannerProps {
  type: "won" | "lost";
  questionsUsed?: number;
  onRestart: () => void;
}

function GameOverBanner({ type, questionsUsed, onRestart }: GameOverBannerProps) {
  const isWin = type === "won";

  return (
    <div className="rounded-3xl border border-white/20 bg-white/[0.04] p-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {isWin ? "Acertaste" : "Fin de la partida"}
      </h2>
      <p className="mb-12 text-sm leading-7 text-white/70">
        {isWin
          ? `Excelente trabajo. Lo descubriste en ${questionsUsed} intento${questionsUsed !== 1 ? "s" : ""}.`
          : "Ya no quedan intentos. Reinicia para una nueva ronda."}
      </p>
      <button
        onClick={onRestart}
        className="h-40 rounded-2xl border border-white px-16 text-xs font-semibold uppercase tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        Reiniciar
      </button>
    </div>
  );
}

