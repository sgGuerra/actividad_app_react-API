/**
 * app/layout.jsx
 * ─────────────────────────────────────────────────────────────
 * The ROOT layout in Next.js App Router.
 * Everything rendered here wraps EVERY page in the app.
 *
 * This is where we:
 *   - Import global styles
 *   - Add Header and Footer (shared across all pages)
 *   - Set page metadata (title, description)
 * ─────────────────────────────────────────────────────────────
 */

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Next.js metadata — sets the <title> and <meta description> tags
export const metadata = {
  title: "GeoQuest — Adivina en 20 intentos",
  description:
    "Juego de adivinanza con IA por categorías: jugador, país o equipo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-black text-white">
        <Header />
        <main className="w-full flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
