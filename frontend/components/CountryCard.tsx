/**
 * CountryCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Shows full country details after the game ends.
 * Only visible when the game is over (won or lost).
 *
 * Props:
 *   - country: the country object from the REST Countries API
 * ─────────────────────────────────────────────────────────────
 */

import { getCurrencyDisplay } from "@/utils/countryUtils";
import { Country } from "@/utils/types";

export default function CountryCard({ country }: { country: Country | null }) {
  if (!country) return null;

  // Extract data safely with fallbacks
  const name = country?.name?.common ?? "Desconocido";
  const capital = country?.capital?.[0] ?? "N/D";
  const region = country?.region ?? "N/D";
  const subregion = country?.subregion ?? "N/D";
  const currency = getCurrencyDisplay(country?.currencies);
  const flagUrl = country?.flags?.png ?? country?.flags?.svg;
  const lat = country?.latlng?.[0]?.toFixed(2) ?? "N/D";
  const lng = country?.latlng?.[1]?.toFixed(2) ?? "N/D";

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      {flagUrl && (
        <div className="flex h-32 items-center justify-center overflow-hidden bg-black">
          <img
            src={flagUrl}
            alt={`Bandera de ${name}`}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-12 p-20">
        <h3 className="flex items-center gap-8 text-2xl font-bold text-white">
          {name}
        </h3>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoItem label="Capital" value={capital} />
          <InfoItem label="Región" value={region} />
          <InfoItem label="Subregión" value={subregion} />
          <InfoItem label="Moneda" value={currency} />
          <InfoItem
            label="Coordenadas"
            value={`${lat}°, ${lng}°`}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * InfoItem
 * Small helper component for a label+value pair.
 */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12">
      <div className="mb-2 text-xs text-white/55">
        {label}
      </div>
      <div className="truncate text-sm font-semibold text-white">
        {value}
      </div>
    </div>
  );
}
