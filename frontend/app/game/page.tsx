/**
 * app/game/page.tsx  →  Route: /game
 * ─────────────────────────────────────────────────────────────
 * Category Selector Page.
 * The user chooses which guessing game to play:
 *   - 🌍 Guess the Country
 *   - 🏟️ Guess the Team
 *   - ⭐ Guess the Player
 * ─────────────────────────────────────────────────────────────
 */

import Link from "next/link";

export const metadata = {
  title: "Choose a Category — GeoQuest",
  description: "Pick your game mode: guess a country, a sports team, or a player!",
};

const CATEGORIES = [
  {
    id: "country",
    href: "/game/country",
    emoji: "🌍",
    title: "Guess the Country",
    description: "A random country is chosen from 250+ nations. Ask smart questions and figure out which one!",
    gradient: "from-indigo-500 to-purple-600",
    hoverGlow: "hover:shadow-indigo-200",
    borderColor: "border-indigo-100",
    bgAccent: "bg-indigo-50",
  },
  {
    id: "team",
    href: "/game/team",
    emoji: "🏟️",
    title: "Guess the Team",
    description: "A mystery sports team is hiding. Ask about its league, players, and history to find it!",
    gradient: "from-emerald-500 to-teal-600",
    hoverGlow: "hover:shadow-emerald-200",
    borderColor: "border-emerald-100",
    bgAccent: "bg-emerald-50",
  },
  {
    id: "player",
    href: "/game/player",
    emoji: "⭐",
    title: "Guess the Player",
    description: "A secret player awaits. Ask about position, stats, and team to uncover their identity!",
    gradient: "from-amber-500 to-orange-600",
    hoverGlow: "hover:shadow-amber-200",
    borderColor: "border-amber-100",
    bgAccent: "bg-amber-50",
  },
];

export default function GameSelectorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          🎮 Choose Your Challenge
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Each mode picks a random secret. You have 20 questions to figure it out.
          Pick a category and start guessing!
        </p>
      </div>

      {/* ── Category Cards ──────────────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className={`group relative bg-white border ${cat.borderColor} rounded-2xl p-6 text-center shadow-sm hover:shadow-xl ${cat.hoverGlow} hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4`}
          >
            {/* Gradient circle with emoji */}
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {cat.emoji}
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
              {cat.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed">
              {cat.description}
            </p>

            {/* Play button indicator */}
            <div
              className={`mt-auto px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${cat.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
            >
              Play →
            </div>
          </Link>
        ))}
      </div>

      {/* ── Back link ───────────────────────────────────────── */}
      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-indigo-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}
