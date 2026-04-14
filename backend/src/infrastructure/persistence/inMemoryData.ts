/**
 * inMemoryData.ts
 * ─────────────────────────────────────────────────────────────
 * Base de datos simulada en memoria.
 *
 * En un proyecto real, estos datos vendrían de una base de datos
 * como PostgreSQL, MongoDB, etc. Aquí usamos arrays en memoria
 * para simular la persistencia sin necesidad de instalar una DB.
 *
 * Los datos están basados en el archivo ej_dataset.md del proyecto.
 * ─────────────────────────────────────────────────────────────
 */

import { Sport } from "../../domain/entities/Sport";
import { League } from "../../domain/entities/League";
import { Team } from "../../domain/entities/Team";
import { Player } from "../../domain/entities/Player";
import { Match } from "../../domain/entities/Match";

// ── Deportes ─────────────────────────────────────────────────
export const sportsData: Sport[] = [
  { id: 1, name: "Football", slug: "football" },
  { id: 2, name: "Basketball", slug: "basketball" },
];

// ── Ligas ────────────────────────────────────────────────────
export const leaguesData: League[] = [
  { id: 10, name: "Premier League", country: "England", sport_id: 1 },
  { id: 11, name: "La Liga", country: "Spain", sport_id: 1 },
  { id: 20, name: "NBA", country: "USA", sport_id: 2 },
];

// ── Equipos ──────────────────────────────────────────────────
export const teamsData: Team[] = [
  { id: 100, name: "Manchester United", league_id: 10, sport_id: 1 },
  { id: 101, name: "Real Madrid", league_id: 11, sport_id: 1 },
  { id: 200, name: "Los Angeles Lakers", league_id: 20, sport_id: 2 },
];

// ── Jugadores ────────────────────────────────────────────────
export const playersData: Player[] = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    team_id: 100,
    position: "Forward",
    number: 7,
    stats: { goals: 25, assists: 10 },
  },
  {
    id: 2,
    name: "LeBron James",
    team_id: 200,
    position: "Forward",
    number: 23,
    stats: { points: 28, rebounds: 8, assists: 7 },
  },
];

// ── Partidos ─────────────────────────────────────────────────
export const matchesData: Match[] = [
  {
    id: 500,
    league_id: 10,
    home_team_id: 100,
    away_team_id: 101,
    date: "2026-04-20T20:00:00Z",
    status: "scheduled",
  },
  {
    id: 501,
    league_id: 20,
    home_team_id: 200,
    away_team_id: 200,
    date: "2026-04-18T02:00:00Z",
    status: "finished",
    score: { home: 102, away: 98 },
  },
];
