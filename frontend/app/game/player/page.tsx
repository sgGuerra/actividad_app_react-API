/**
 * app/game/player/page.tsx  →  Route: /game/player
 * ─────────────────────────────────────────────────────────────
 * The Player Guessing Game Page.
 * Uses SportsGameBoard with mode="player".
 * ─────────────────────────────────────────────────────────────
 */

import SportsGameBoard from "@/components/SportsGameBoard";
import Link from "next/link";

export const metadata = {
  title: "Guess the Player — GeoQuest",
  description: "Guess the mystery sports player in 20 questions!",
};

export default function PlayerGamePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">
          ⭐ Guess the Player
        </h1>
        <p className="text-gray-500 text-sm">
          A mystery player has been chosen. Ask up to 20 questions to figure out who!
        </p>
      </div>

      {/* ── Quick Rules ──────────────────────────────────────── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-sm font-bold text-amber-800 mb-2">📋 Quick Rules</h2>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>✅ Ask about position, stats, team, or league</li>
          <li>✅ You can guess the player name at any time (uses 1 question)</li>
          <li>❌ The AI won't reveal the player name directly</li>
          <li>❌ Running out of questions = game over</li>
        </ul>
      </div>

      {/* ── The Game ─────────────────────────────────────────── */}
      <SportsGameBoard mode="player" />

      {/* ── Back link ────────────────────────────────────────── */}
      <div className="text-center">
        <Link
          href="/game"
          className="text-sm text-gray-400 hover:text-amber-600 transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>

    </div>
  );
}
