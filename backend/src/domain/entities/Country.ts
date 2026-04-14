/**
 * Country.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un país.
 * Estructura basada en la respuesta de REST Countries API.
 *
 * Esta entidad se usa tanto para el juego de geografía
 * como para dar contexto a la IA.
 * ─────────────────────────────────────────────────────────────
 */
export interface Currency {
  name: string;
  symbol?: string;
}

export interface CountryName {
  common: string;
  official: string;
}

export interface Country {
  /** Nombre del país (común y oficial) */
  name: CountryName;

  /** Lista de capitales */
  capital?: string[];

  /** Monedas: objeto con código como clave (ej: { "USD": { name: "Dollar" } }) */
  currencies?: Record<string, Currency>;

  /** Coordenadas [latitud, longitud] */
  latlng?: [number, number];

  /** Región geográfica (ej: "Europe", "Americas") */
  region?: string;

  /** Subregión (ej: "Western Europe", "South America") */
  subregion?: string;

  /** URLs de la bandera */
  flags?: {
    png: string;
    svg: string;
    alt?: string;
  };
}
