/**
 * SportsCard.tsx
 * ─────────────────────────────────────────────────────────────
 * Shows details of the secret team or player after the game ends.
 * Equivalent to CountryCard but for sports entities.
 * ─────────────────────────────────────────────────────────────
 */

import { Team, Player } from "@/utils/types";

interface SportsCardProps {
  mode: "team" | "player";
  team: Team | null;
  player: Player | null;
  allTeams?: Team[];
}

export default function SportsCard({ mode, team, player, allTeams = [] }: SportsCardProps) {
  if (mode === "team" && team) {
    return <TeamRevealCard team={team} />;
  }

  if (mode === "player" && player) {
    return <PlayerRevealCard player={player} allTeams={allTeams} />;
  }

  return null;
}

/**
 * TeamRevealCard — shows team details
 */
function TeamRevealCard({ team }: { team: Team }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
      <div className="h-20 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
        <span className="text-5xl">🏟️</span>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🏟️ {team.name}
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoItem icon="🏅" label="Sport ID" value={String(team.sport_id)} />
          <InfoItem icon="🏆" label="League ID" value={String(team.league_id)} />
        </div>
      </div>
    </div>
  );
}

/**
 * PlayerRevealCard — shows player details
 */
function PlayerRevealCard({ player, allTeams }: { player: Player; allTeams: Team[] }) {
  const team = allTeams.find((t) => t.id === player.team_id);
  const statsStr = Object.entries(player.stats)
    .map(([key, val]) => `${key}: ${val}`)
    .join(", ");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
      <div className="h-20 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
        <span className="text-5xl">⭐</span>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          ⭐ {player.name}
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoItem icon="📋" label="Position" value={player.position} />
          <InfoItem icon="#️⃣" label="Number" value={String(player.number)} />
          <InfoItem icon="🏟️" label="Team" value={team?.name ?? "Unknown"} />
          <InfoItem icon="📊" label="Stats" value={statsStr} />
        </div>
      </div>
    </div>
  );
}

/**
 * InfoItem — small helper for label+value pair
 */
function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2.5">
      <div className="text-xs text-gray-400 mb-0.5">
        {icon} {label}
      </div>
      <div className="font-semibold text-gray-800 text-sm truncate">
        {value}
      </div>
    </div>
  );
}
