import { Router } from "express";

import { TheSportsDBTeamRepository } from "../../infrastructure/persistence/TheSportsDBTeamRepository";
import { TheSportsDBPlayerRepository } from "../../infrastructure/persistence/TheSportsDBPlayerRepository";
import { RestCountriesRepository } from "../../infrastructure/external/RestCountriesRepository";

import { SearchTeams } from "../../application/teams/SearchTeams";
import { GetTeamById } from "../../application/teams/GetTeamById";
import { GetTeamsByLeague } from "../../application/teams/GetTeamsByLeague";

import { SearchPlayers } from "../../application/players/SearchPlayers";
import { GetPlayerById } from "../../application/players/GetPlayerById";
import { GetPlayerDetail } from "../../application/players/GetPlayerDetail";
import { GetPlayersByTeam } from "../../application/players/GetPlayersByTeam";

import { GetAllCountries } from "../../application/countries/GetAllCountries";
import { GetRandomCountry } from "../../application/countries/GetRandomCountry";
import { AskAI } from "../../application/ai/AskAI";

import { TeamController } from "../controllers/TeamController";
import { PlayerController } from "../controllers/PlayerController";
import { CountryController } from "../controllers/CountryController";
import { AIController } from "../controllers/AIController";

import { createTeamRoutes } from "./teamRoutes";
import { createPlayerRoutes } from "./playerRoutes";
import { createCountryRoutes } from "./countryRoutes";
import { createAIRoutes } from "./aiRoutes";

export function setupRoutes(): Router {
  const apiRouter = Router();

  const teamRepo = new TheSportsDBTeamRepository();
  const playerRepo = new TheSportsDBPlayerRepository();
  const countryRepo = new RestCountriesRepository();

  const searchTeams = new SearchTeams(teamRepo);
  const getTeamById = new GetTeamById(teamRepo);
  const getTeamsByLeague = new GetTeamsByLeague(teamRepo);

  const searchPlayers = new SearchPlayers(playerRepo);
  const getPlayerById = new GetPlayerById(playerRepo);
  const getPlayerDetail = new GetPlayerDetail(playerRepo);
  const getPlayersByTeam = new GetPlayersByTeam(playerRepo);

  const getAllCountries = new GetAllCountries(countryRepo);
  const getRandomCountry = new GetRandomCountry(countryRepo);
  const askAI = new AskAI(teamRepo, playerRepo);

  const teamController = new TeamController(searchTeams, getTeamById, getTeamsByLeague, teamRepo);
  const playerController = new PlayerController(searchPlayers, getPlayerById, getPlayerDetail, getPlayersByTeam);
  const countryController = new CountryController(getAllCountries, getRandomCountry);
  const aiController = new AIController(askAI);

  apiRouter.use("/teams", createTeamRoutes(teamController));
  apiRouter.use("/players", createPlayerRoutes(playerController));
  apiRouter.use("/countries", createCountryRoutes(countryController));
  apiRouter.use("/ask", createAIRoutes(aiController));

  return apiRouter;
}
