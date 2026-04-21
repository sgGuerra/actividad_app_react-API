"use client";

/**
 * app/page.jsx  →  Route: /
 * ─────────────────────────────────────────────────────────────
 * Home page. This is a Server Component (no "use client" needed)
 * because it has no interactivity — just static content.
 *
 * Contains:
 *   - App name & tagline
 *   - Game description
 *   - What problem it solves
 *   - Team members
 *   - CTA button to /game
 * ─────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { useEffect, useRef } from "react";

const TEAM_MEMBERS = [
  { name: "Andres Bedoya", role: "Producto y estrategia" },
  { name: "Luis Guerra", role: "Experiencia de juego" },
  { name: "Tomas Henao", role: "Arquitectura técnica" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Elige categoría",
    desc: "Selecciona si quieres adivinar un jugador, un país o un equipo.",
  },
  {
    step: "2",
    title: "Haz preguntas",
    desc: "Usa el modo Preguntar para obtener pistas claras de la IA.",
  },
  {
    step: "3",
    title: "Cambia a adivinar",
    desc: "Con un solo input, cambia a modo Adivinar cuando tengas una hipótesis.",
  },
  {
    step: "4",
    title: "Gana antes de 20",
    desc: "Cada pregunta y adivinanza consume intento: administra bien tus decisiones.",
  },
];

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = pageRef.current;
    if (!target) return;

    const revealItems = Array.from(target.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6", "scale-[0.99]");
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <section data-reveal className="mb-32 grid scale-[0.99] gap-24 opacity-0 translate-y-6 transition-all duration-700 ease-in-out lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="space-y-16">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
            Plataforma de adivinanza con IA
          </p>
          <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
            Descubre la respuesta en <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">20 movimientos</span>.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            GeoQuest transforma el juego de preguntas en una experiencia elegante y estratégica. Haz preguntas, cambia a modo adivinanza y resuelve cada ronda con precisión, ritmo y control.
          </p>
          <Link
            href="/game"
            className="inline-flex h-12 items-center rounded-xl border border-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-6 text-sm font-semibold uppercase tracking-wide text-slate-900 transition-all duration-300 ease-in-out hover:brightness-110"
          >
            Empezar partida
          </Link>
        </div>
        <div className="h-240 rounded-3xl border border-fuchsia-300/25 bg-gradient-to-br from-cyan-400/20 via-indigo-400/10 to-fuchsia-400/20 p-16">
          <div className="h-full rounded-2xl border border-white/10 bg-black/40" />
        </div>
      </section>

      <section data-reveal className="mb-24 rounded-3xl border border-indigo-300/20 bg-white/[0.03] p-20 scale-[0.99] opacity-0 translate-y-6 transition-all duration-700 ease-in-out">
        <h2 className="mb-16 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100/90">
          Qué resuelve esta experiencia
        </h2>
        <div className="grid gap-10 text-sm leading-7 text-white/70 sm:grid-cols-2">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-16">
            Aprendizaje activo: combina conocimiento general con razonamiento paso a paso.
          </div>
          <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/5 p-16">
            Claridad de interfaz: un input unificado evita fricción entre preguntar y adivinar.
          </div>
          <div className="rounded-2xl border border-indigo-300/20 bg-indigo-400/5 p-16">
            Profundidad táctica: cada decisión consume intentos, por lo que importa la estrategia.
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-16">
            Rejugabilidad alta: múltiples categorías y respuestas dinámicas de IA en cada ronda.
          </div>
        </div>
      </section>

      <section data-reveal className="mb-24 scale-[0.99] opacity-0 translate-y-6 transition-all duration-700 ease-in-out">
        <h2 className="mb-16 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Cómo funciona
        </h2>
        <div className="grid gap-12 sm:grid-cols-2">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-indigo-300/20 bg-white/[0.03] p-16 transition-all duration-300 ease-in-out hover:border-fuchsia-300/35 hover:bg-white/[0.05]"
            >
              <div className="mb-10 inline-flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                {item.step}
              </div>
              <h3 className="mb-6 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-white/65">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="mb-24 scale-[0.99] opacity-0 translate-y-6 transition-all duration-700 ease-in-out">
        <h2 className="mb-16 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Stack principal
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {["Next.js 14", "React 18", "Tailwind CSS", "REST Countries API", "novita.ai"].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-indigo-300/30 bg-indigo-300/10 px-12 py-8 text-xs uppercase tracking-wide text-indigo-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section data-reveal className="mb-24 scale-[0.99] opacity-0 translate-y-6 transition-all duration-700 ease-in-out">
        <h2 className="mb-16 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Equipo
        </h2>
        <div className="grid gap-12 sm:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-fuchsia-300/20 bg-fuchsia-300/5 p-20 text-center transition-all duration-300 ease-in-out hover:border-fuchsia-300/40 hover:bg-fuchsia-300/10"
            >
              <h3 className="text-base font-bold text-white">{member.name}</h3>
              <p className="mt-6 text-xs uppercase tracking-wide text-white/60">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="py-16 text-center scale-[0.99] opacity-0 translate-y-6 transition-all duration-700 ease-in-out">
        <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">
          ¿Listo para jugar tu próxima ronda?
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-sm leading-7 text-white/65">
          Entra al tablero, cambia de categoría y pon a prueba tu capacidad para deducir la respuesta antes de agotar los 20 intentos.
        </p>
        <Link
          href="/game"
          className="inline-flex h-12 items-center rounded-xl border border-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-6 text-sm font-semibold uppercase tracking-wide text-slate-900 transition-all duration-300 ease-in-out hover:brightness-110"
        >
          Ir al juego
        </Link>
      </section>

      <section data-reveal className="text-center scale-[0.99] opacity-0 translate-y-6 transition-all duration-700 ease-in-out">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          Diseño minimalista · Interacción inmersiva · Experiencia en español
        </p>
      </section>

    </div>
  );
}
