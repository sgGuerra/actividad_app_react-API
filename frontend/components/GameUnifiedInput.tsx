"use client";

import { useState } from "react";

type InputMode = "question" | "guess";

interface GameUnifiedInputProps {
  onAsk: (text: string) => void;
  onGuess: (text: string) => void;
  onAutoCheck?: (text: string) => void;
  disabled: boolean;
  questionsRemaining: number;
}

export default function GameUnifiedInput({
  onAsk,
  onGuess,
  onAutoCheck,
  disabled,
  questionsRemaining,
}: GameUnifiedInputProps) {
  const [mode, setMode] = useState<InputMode>("question");
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    if (mode === "question") onAsk(trimmed);
    else onGuess(trimmed);

    setValue("");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex w-fit rounded-full border border-cyan-200/30 bg-gradient-to-r from-cyan-400/10 to-fuchsia-400/10 p-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMode("question")}
            className={`rounded-full px-4 py-2 text-xs tracking-wide transition-all duration-300 ease-in-out ${
              mode === "question"
                ? "bg-cyan-300 text-slate-900"
                : "text-white/80 hover:text-white"
            }`}
          >
            Preguntar
          </button>
          <button
            type="button"
            onClick={() => setMode("guess")}
            className={`rounded-full px-4 py-2 text-xs tracking-wide transition-all duration-300 ease-in-out ${
              mode === "guess" ? "bg-fuchsia-300 text-slate-900" : "text-white/80 hover:text-white"
            }`}
          >
            Adivinar
          </button>
        </div>

        <span className="w-fit rounded-full border border-indigo-200/30 bg-indigo-400/10 px-4 py-2 font-mono text-xs text-indigo-100">
          {questionsRemaining} restantes
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            setValue(val);
            if (onAutoCheck) onAutoCheck(val);
          }}
          placeholder={
            mode === "question"
              ? "Ej: ¿Está en Europa? ¿Juega de delantero?"
              : "Escribe tu respuesta final..."
          }
          disabled={disabled}
          className="h-12 flex-1 rounded-xl border border-cyan-200/25 bg-slate-950/70 px-4 text-sm text-white placeholder:text-slate-300/50 outline-none transition-all duration-300 ease-in-out focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="h-12 rounded-xl border border-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-5 text-sm font-semibold uppercase tracking-wide text-slate-900 transition-all duration-300 ease-in-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {mode === "question" ? "Enviar pregunta" : "Enviar respuesta"}
        </button>
      </form>

      <p className="text-xs text-white/60">
        {mode === "question"
          ? "Haz preguntas concretas para obtener pistas y ahorrar intentos."
          : "La adivinanza también consume un intento."}
      </p>
    </div>
  );
}
