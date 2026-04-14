/**
 * routes/index.ts
 * ─────────────────────────────────────────────────────────────
 * Archivo central que AGRUPA todas las rutas del backend.
 *
 * Aquí es donde se hace la "inyección de dependencias" manual:
 *   1. Se crean los repositorios (infraestructura)
 *   2. Se crean los casos de uso (aplicación) inyectando los repos
 *   3. Se crean los controllers (interfaces) inyectando los use cases
 *   4. Se crean las rutas inyectando los controllers
 *
 * Flujo de dependencias:
 *   Repository → Use Case → Controller → Route
 *   (infraestructura → aplicación → interfaces)
 * ─────────────────────────────────────────────────────────────
 */
import { Router } from "express";

// Repositorios (infraestructura)
import { InMemorySportRepository } from "../../infrastructure/persistence/InMemorySportRepository";
import { InMemoryLeagueRepository } from "../../infrastructure/persistence/InMemoryLeagueRepository";
import { InMemoryTeamRepository } from "../../infrastructure/persistence/InMemoryTeamRepository";
import { InMemoryPlayerRepository } from "../../infrastructure/persistence/InMemoryPlayerRepository";
import { InMemoryMatchRepository } from "../../infrastructure/persistence/InMemoryMatchRepository";
import { RestCountriesRepository } from "../../infrastructure/external/RestCountriesRepository";

// Casos de uso (aplicación)
import { GetAllSports } from "../../application/sports/GetAllSports";
import { GetSportById } from "../../application/sports/GetSportById";
import { GetAllTeams } from "../../application/teams/GetAllTeams";
import { GetTeamById } from "../../application/teams/GetTeamById";
import { GetPlayersByTeam } from "../../application/players/GetPlayersByTeam";
import { GetMatchesByLeague } from "../../application/matches/GetMatchesByLeague";
import { GetAllCountries } from "../../application/countries/GetAllCountries";
import { GetRandomCountry } from "../../application/countries/GetRandomCountry";
import { AskAI } from "../../application/ai/AskAI";

// Controllers (interfaces)
import { SportController } from "../controllers/SportController";
import { TeamController } from "../controllers/TeamController";
import { PlayerController } from "../controllers/PlayerController";
import { MatchController } from "../controllers/MatchController";
import { CountryController } from "../controllers/CountryController";
import { AIController } from "../controllers/AIController";

// Routes
import { createSportRoutes } from "./sportRoutes";
import { createTeamRoutes } from "./teamRoutes";
import { createPlayerRoutes } from "./playerRoutes";
import { createMatchRoutes } from "./matchRoutes";
import { createCountryRoutes } from "./countryRoutes";
import { createAIRoutes } from "./aiRoutes";

/**
 * setupRoutes
 * Configura TODAS las rutas del backend.
 * Este es el único lugar donde se conectan las capas.
 */
export function setupRoutes(): Router {
  const apiRouter = Router();

  // ── 1. Crear repositorios (infraestructura) ─────────────────
  const sportRepo = new InMemorySportRepository();
  const leagueRepo = new InMemoryLeagueRepository();
  const teamRepo = new InMemoryTeamRepository();
  const playerRepo = new InMemoryPlayerRepository();
  const matchRepo = new InMemoryMatchRepository();
  const countryRepo = new RestCountriesRepository();

  // ── 2. Crear casos de uso (aplicación) ──────────────────────
  const getAllSports = new GetAllSports(sportRepo);
  const getSportById = new GetSportById(sportRepo);
  const getAllTeams = new GetAllTeams(teamRepo);
  const getTeamById = new GetTeamById(teamRepo);
  const getPlayersByTeam = new GetPlayersByTeam(playerRepo);
  const getMatchesByLeague = new GetMatchesByLeague(matchRepo);
  const getAllCountries = new GetAllCountries(countryRepo);
  const getRandomCountry = new GetRandomCountry(countryRepo);
  const askAI = new AskAI(sportRepo, leagueRepo, teamRepo, playerRepo, matchRepo);

  // ── 3. Crear controllers ───────────────────────────────────
  const sportController = new SportController(getAllSports, getSportById);
  const teamController = new TeamController(getAllTeams, getTeamById);
  const playerController = new PlayerController(getPlayersByTeam);
  const matchController = new MatchController(getMatchesByLeague);
  const countryController = new CountryController(getAllCountries, getRandomCountry);
  const aiController = new AIController(askAI);

  // ── 4. Montar rutas en el router principal ──────────────────
  apiRouter.use("/sports", createSportRoutes(sportController));
  apiRouter.use("/teams", createTeamRoutes(teamController));
  apiRouter.use("/players", createPlayerRoutes(playerController));
  apiRouter.use("/matches", createMatchRoutes(matchController));
  apiRouter.use("/countries", createCountryRoutes(countryController));
  apiRouter.use("/ask", createAIRoutes(aiController));

  return apiRouter;
}
