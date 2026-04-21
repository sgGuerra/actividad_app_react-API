import GameBoard from "@/components/GameBoard";
import Link from "next/link";
import { GameCategory } from "@/utils/types";

interface CategoryPageProps {
  params: { category: string };
}

const VALID_CATEGORIES: GameCategory[] = ["player", "country", "team"];

function getCategoryLabel(category: GameCategory) {
  if (category === "player") return "Jugador";
  if (category === "team") return "Equipo";
  return "País";
}

export default function CategoryGamePage({ params }: CategoryPageProps) {
  const normalized = params.category?.toLowerCase();
  const category = VALID_CATEGORIES.includes(normalized as GameCategory)
    ? (normalized as GameCategory)
    : "country";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05070f] via-[#090b16] to-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-300/20 bg-white/[0.03] p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Categoría activa</p>
            <h1 className="text-xl font-bold text-white">{getCategoryLabel(category)}</h1>
          </div>
          <Link
            href="/game"
            className="rounded-lg border border-white/20 px-3 py-2 text-xs uppercase tracking-wide text-white/80 transition-colors hover:text-white"
          >
            Vista general
          </Link>
        </div>

        <GameBoard initialCategory={category} />
      </div>
    </div>
  );
}
