/**
 * app/game/team/page.tsx  →  Route: /game/team
 * ─────────────────────────────────────────────────────────────
 * The Team Guessing Game Page.
 * Uses SportsGameBoard with mode="team".
 * ─────────────────────────────────────────────────────────────
 */

import SportsGameBoard from "@/components/SportsGameBoard";
import Link from "next/link";

export const metadata = {
  title: "Guess the Team — GeoQuest",
  description: "Guess the mystery sports team in 20 questions!",
};

export default function TeamGamePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">
          🏟️ Guess the Team
        </h1>
        <p className="text-gray-500 text-sm">
          A mystery sports team has been chosen. Ask up to 20 questions to figure out which one!
        </p>
      </div>

      {/* ── Quick Rules ──────────────────────────────────────── */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h2 className="text-sm font-bold text-emerald-800 mb-2">📋 Quick Rules</h2>
        <ul className="text-xs text-emerald-700 space-y-1">
          <li>✅ Ask about the sport, league, country, or players</li>
          <li>✅ You can guess the team name at any time (uses 1 question)</li>
          <li>❌ The AI won't reveal the team name directly</li>
          <li>❌ Running out of questions = game over</li>
        </ul>
      </div>

      {/* ── The Game ─────────────────────────────────────────── */}
      <SportsGameBoard mode="team" />

      {/* ── Back link ────────────────────────────────────────── */}
      <div className="text-center">
        <Link
          href="/game"
          className="text-sm text-gray-400 hover:text-emerald-600 transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>

    </div>
  );
}
