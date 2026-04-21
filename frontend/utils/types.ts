export interface Currency {
  name: string;
  symbol?: string;
}

export interface CountryName {
  common: string;
  official: string;
}

export interface Country {
  name: CountryName;
  capital?: string[];
  currencies?: Record<string, Currency>;
  latlng?: [number, number];
  region?: string;
  subregion?: string;
  flags?: {
    png: string;
    svg: string;
    alt?: string;
  };
}

export interface ChatMessage {
  role: "user" | "ai" | "system" | "assistant";
  text?: string;
  content?: string;
}

// ── Sports types ────────────────────────────────────────────

export interface Sport {
  id: number;
  name: string;
  slug: string;
}

export interface League {
  id: number;
  name: string;
  country: string;
  sport_id: number;
}

export interface Team {
  id: number;
  name: string;
  league_id: number;
  sport_id: number;
}

export interface Player {
  id: number;
  name: string;
  team_id: number;
  position: string;
  number: number;
  stats: Record<string, number>;
}

export interface Match {
  id: number;
  league_id: number;
  home_team_id: number;
  away_team_id: number;
  date: string;
  status: string;
  score?: { home: number; away: number };
}

export type GameMode = "country" | "team" | "player";
