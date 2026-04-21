/**
 * app/game/page.jsx  →  Route: /game
 * ─────────────────────────────────────────────────────────────
 * The Game Page. This is also a Server Component by default,
 * but GameBoard (which it renders) is a Client Component.
 *
 * Pattern: Server Component renders the shell/layout,
 * Client Component (GameBoard) handles all interactivity.
 *
 * This separation is a Next.js best practice.
 * ─────────────────────────────────────────────────────────────
 */

import GameBoard from "@/components/GameBoard";
import Link from "next/link";

// Page-specific metadata
export const metadata = {
  title: "Jugar — GeoQuest",
  description: "Adivina la categoría secreta en 20 intentos.",
};

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05070f] via-[#090b16] to-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section id="juego" className="mb-8">
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <CategoryCard
              href="/game/player"
              title="Adivinar jugador"
              subtitle="Fútbol internacional"
              accent="from-cyan-300/30 to-cyan-500/10"
            />
            <CategoryCard
              href="/game/country"
              title="Adivinar país"
              subtitle="Geografía mundial"
              accent="from-indigo-300/30 to-indigo-500/10"
            />
            <CategoryCard
              href="/game/team"
              title="Adivinar equipo"
              subtitle="Clubes famosos"
              accent="from-fuchsia-300/30 to-fuchsia-500/10"
            />
          </div>

          <GameBoard initialCategory="country" />
        </section>

        <header className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-16">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
              Juego inmersivo por categorías
            </p>
            <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
              Adivina <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">jugador, país o equipo</span> con precisión.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Una sola interfaz, un solo input, y decisiones claras. Cambia de categoría, pregunta a la IA y envía tu adivinanza final cuando estés listo.
            </p>
          </div>
          <div className="relative h-64 overflow-hidden rounded-3xl border border-fuchsia-300/25 bg-gradient-to-br from-cyan-400/20 via-indigo-400/10 to-fuchsia-400/20 p-4">
            <div className="h-full rounded-2xl border border-white/10 bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80"
                alt="Visual de estadio y luces para ambientar el juego"
                className="h-full w-full object-cover opacity-50"
              />
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 320 320"
              className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 text-cyan-200/40"
            >
              <circle cx="160" cy="160" r="120" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="160" cy="160" r="78" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M160 35v250M35 160h250" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 320 120"
              className="pointer-events-none absolute bottom-6 left-6 h-20 w-52 text-fuchsia-200/50"
            >
              <path
                d="M0 80 C40 20, 80 20, 120 80 S200 140, 240 80 S280 20, 320 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </header>

        <section id="reglas" className="mb-10 rounded-3xl border border-indigo-300/20 bg-white/[0.03] p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100/90">
            Reglas rápidas
          </h2>
          <ul className="grid gap-4 text-sm leading-7 text-white/80 sm:grid-cols-2">
            <li>Haz preguntas estratégicas para reducir opciones en menos intentos.</li>
            <li>Cada adivinanza también consume un intento del total disponible.</li>
            <li>No recibirás la respuesta directa; la IA solo entrega pistas útiles.</li>
            <li>Si llegas a 20 intentos sin acertar, la ronda termina.</li>
          </ul>
        </section>

        <div id="contacto" className="pt-24 text-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-wide text-white/50 transition-colors duration-300 hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  href,
  title,
  subtitle,
  accent,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-2xl border border-white/15 bg-gradient-to-br ${accent} p-4 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-white/35`}
    >
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-white/70">{subtitle}</p>
    </Link>
  );
}
