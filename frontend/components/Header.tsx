"use client";
/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────────
 * Shared header that appears on every page.
 * Uses Next.js <Link> for client-side navigation (no full page reload).
 * ─────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-300/20 bg-gradient-to-r from-[#070b18]/90 via-[#0b1020]/90 to-[#120a20]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="transition-opacity duration-300 hover:opacity-90">
          <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-xs font-semibold uppercase tracking-[0.28em] text-transparent">
            GeoQuest
          </span>
        </Link>

        <nav className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className={`text-xs uppercase tracking-wide transition-colors duration-300 ${
              pathname === "/" ? "text-cyan-200" : "text-white/65 hover:text-cyan-100"
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/game"
            className={`text-xs uppercase tracking-wide transition-colors duration-300 ${
              pathname === "/game"
                ? "text-fuchsia-200"
                : "text-white/65 hover:text-fuchsia-100"
            }`}
          >
            Juego
          </Link>
        </nav>
      </div>
    </header>
  );
}
