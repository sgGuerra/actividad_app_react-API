/**
 * Footer.jsx
 * ─────────────────────────────────────────────────────────────
 * Shared footer that appears on every page.
 * Shows team info and project credits.
 * ─────────────────────────────────────────────────────────────
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-indigo-300/20 bg-gradient-to-r from-[#070b18] via-[#0b1020] to-[#120a20] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text font-semibold uppercase tracking-[0.24em] text-transparent">
            GeoQuest
          </span>
          <span className="text-indigo-100/80">Adivina en 20 intentos</span>
        </div>

        <div className="text-indigo-100/60">
          © {year} · Proyecto universitario · React + Next.js
        </div>
      </div>
    </footer>
  );
}
