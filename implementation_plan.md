# Conectar Backend a TheSportsDB API — Jugadores y Equipos

Modificar el backend para que consuma la API v1 de TheSportsDB en tiempo real, enfocándose en endpoints de **jugadores** (con historial completo) y **equipos**, proporcionando contexto rico al agente de IA de Novita.

## Resumen del Cambio

El backend actual usa repositorios InMemory con datos estáticos. Lo transformaremos para que llame a TheSportsDB API v1 en tiempo real, trayendo datos detallados de jugadores y equipos que el agente de IA pueda usar como contexto.

### Endpoints de TheSportsDB v1 que usaremos:

| Endpoint | URL | Propósito |
|---|---|---|
| Buscar jugador por nombre | `searchplayers.php?p={name}` | Buscar jugadores |
| Lookup jugador por ID | `lookupplayer.php?id={id}` | Detalle completo del jugador |
| Equipos anteriores | `lookupformerteams.php?id={playerId}` | Historial de equipos |
| Honores/títulos | `lookuphonours.php?id={playerId}` | Títulos ganados |
| Contratos | `lookupcontracts.php?id={playerId}` | Historial de contratos |
| Hitos | `lookupmilestones.php?id={playerId}` | Hitos del jugador |
| Buscar equipo por nombre | `searchteams.php?t={name}` | Buscar equipos |
| Lookup equipo por ID | `lookupteam.php?id={id}` | Detalle completo del equipo |
| Jugadores de un equipo | `lookup_all_players.php?id={teamId}` | Plantilla del equipo |
| Buscar equipos por liga | `search_all_teams.php?l={league}` | Equipos de una liga |

## Proposed Changes

### 1. Domain Layer — Entidades

#### [MODIFY] [Player.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/domain/entities/Player.ts)
Reescribir la entidad `Player` para reflejar los datos reales de TheSportsDB:
- `idPlayer`, `strPlayer`, `strTeam`, `strSport`, `strPosition`, `strNationality`
- `dateBorn`, `strBirthLocation`, `strDescriptionEN`
- `strHeight`, `strWeight`, `strThumb`, `strCutout`
- `strStatus`, `strGender`, `strNumber`

#### [MODIFY] [Team.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/domain/entities/Team.ts)
Reescribir la entidad `Team` para reflejar los datos reales:
- `idTeam`, `strTeam`, `strSport`, `strLeague`, `strCountry`
- `strDescriptionEN`, `strDescriptionES`, `strStadium`, `intStadiumCapacity`
- `intFormedYear`, `strWebsite`, `strBadge`, `strLogo`

#### [NEW] FormerTeam.ts, Honour.ts, Contract.ts, Milestone.ts
Nuevas entidades para el historial del jugador.

---

### 2. Domain Layer — Repositorios

#### [MODIFY] [IPlayerRepository.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/domain/repositories/IPlayerRepository.ts)
Métodos ahora serán `async` y reflejarán las operaciones reales:
- `searchByName(name: string): Promise<Player[]>`
- `findById(id: string): Promise<Player | null>`
- `getFormerTeams(playerId: string): Promise<FormerTeam[]>`
- `getHonours(playerId: string): Promise<Honour[]>`
- `getContracts(playerId: string): Promise<Contract[]>`
- `getMilestones(playerId: string): Promise<Milestone[]>`
- `getByTeamId(teamId: string): Promise<Player[]>`

#### [MODIFY] [ITeamRepository.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/domain/repositories/ITeamRepository.ts)
- `searchByName(name: string): Promise<Team[]>`
- `findById(id: string): Promise<Team | null>`
- `getByLeague(league: string): Promise<Team[]>`
- `getPlayers(teamId: string): Promise<Player[]>`

---

### 3. Infrastructure Layer — TheSportsDB Service

#### [MODIFY] [TheSportsDBService.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/infrastructure/external/TheSportsDBService.ts)
Reescribir completamente para incluir todos los endpoints necesarios:
- `searchPlayers(name)`, `lookupPlayer(id)`, `lookupFormerTeams(playerId)`
- `lookupHonours(playerId)`, `lookupContracts(playerId)`, `lookupMilestones(playerId)`
- `searchTeams(name)`, `lookupTeam(id)`, `getTeamsByLeague(league)`
- `getPlayersByTeam(teamId)`

Usar API key `3` (demo/free) como fallback. Base URL: `https://www.thesportsdb.com/api/v1/json`

---

### 4. Infrastructure Layer — Repositorios (Persistence)

#### [MODIFY] [TheSportsDBTeamRepository.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/infrastructure/persistence/TheSportsDBTeamRepository.ts)
Implementar `ITeamRepository` usando `TheSportsDBService`.

#### [MODIFY] [TheSportsDBPlayerRepository.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/infrastructure/persistence/TheSportsDBPlayerRepository.ts)
Implementar `IPlayerRepository` usando `TheSportsDBService`.

---

### 5. Application Layer — Use Cases

#### [MODIFY] [GetPlayersByTeam.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/application/players/GetPlayersByTeam.ts)
Ahora async, recibe `teamId: string`.

#### [NEW] SearchPlayers.ts
Caso de uso: buscar jugadores por nombre.

#### [NEW] GetPlayerDetail.ts
Caso de uso: obtener jugador por ID con su historial completo (former teams, honours, contracts, milestones).

#### [MODIFY] [GetAllTeams.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/application/teams/GetAllTeams.ts)
Reemplazar por `SearchTeams` — buscar equipos por nombre.

#### [MODIFY] [GetTeamById.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/application/teams/GetTeamById.ts)
Ahora async, retorna equipo con detalle completo.

#### [NEW] GetTeamsByLeague.ts
Caso de uso: obtener equipos por liga.

#### [MODIFY] [AskAI.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/application/ai/AskAI.ts)
Simplificar para trabajar solo con jugadores y equipos (sin sports, leagues, matches estáticos).
El AI ahora recibirá `playerName` y/o `teamName` en el request para buscar datos en tiempo real y construir el contexto.

---

### 6. Interfaces Layer — Controllers

#### [MODIFY] [PlayerController.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/interfaces/controllers/PlayerController.ts)
Nuevos métodos async:
- `search(req, res)` → `GET /api/players/search?name=Messi`
- `getById(req, res)` → `GET /api/players/:id`
- `getDetail(req, res)` → `GET /api/players/:id/detail` (incluye historial)
- `getByTeam(req, res)` → `GET /api/players/team/:teamId`

#### [MODIFY] [TeamController.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/interfaces/controllers/TeamController.ts)
Nuevos métodos async:
- `search(req, res)` → `GET /api/teams/search?name=Arsenal`
- `getById(req, res)` → `GET /api/teams/:id`
- `getByLeague(req, res)` → `GET /api/teams/league/:league`
- `getPlayers(req, res)` → `GET /api/teams/:id/players`

#### [MODIFY] [AIController.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/interfaces/controllers/AIController.ts)
Actualizar para recibir `playerName`/`teamName` y buscar datos en tiempo real.

---

### 7. Interfaces Layer — Rutas

#### [MODIFY] [playerRoutes.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/interfaces/routes/playerRoutes.ts)
```
GET /api/players/search?name=Messi       → Buscar jugadores por nombre
GET /api/players/:id                     → Jugador por ID (datos básicos)
GET /api/players/:id/detail              → Jugador con historial completo
GET /api/players/team/:teamId            → Jugadores de un equipo
```

#### [MODIFY] [teamRoutes.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/interfaces/routes/teamRoutes.ts)
```
GET /api/teams/search?name=Arsenal       → Buscar equipos por nombre
GET /api/teams/:id                       → Equipo por ID (datos completos)
GET /api/teams/league/:league            → Equipos de una liga
GET /api/teams/:id/players               → Plantilla del equipo
```

#### [MODIFY] [routes/index.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/interfaces/routes/index.ts)
Actualizar inyección de dependencias. Remover los InMemory repos y usar los de TheSportsDB.
Eliminar las rutas de sports, matches que ya no se usan.

---

### 8. NovitaAI Service

#### [MODIFY] [NovitaAIService.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/infrastructure/external/NovitaAIService.ts)
Actualizar el `SportsContext` y `buildSportsContext` para trabajar con las nuevas entidades ricas.
El contexto ahora incluirá: datos completos del jugador, historial de equipos, títulos, etc.

---

### 9. Entry Point

#### [MODIFY] [index.ts](file:///c:/Users/camen/Desktop/Untitled/actividad_app_react-API/backend/src/index.ts)
Actualizar la lista de endpoints disponibles en la ruta raíz.

---

## Archivos a eliminar (ya no se usan)

Los siguientes archivos InMemory dejarán de usarse (los imports se actualizarán):
- `InMemorySportRepository`, `InMemoryLeagueRepository`, `InMemoryTeamRepository`, `InMemoryPlayerRepository`, `InMemoryMatchRepository`
- `TheSportsDBSportRepository.ts`, `TheSportsDBLeagueRepository.ts` (se simplifican)
- Rutas/controllers/use cases de `sports` y `matches` (fuera de alcance por ahora)

> [!IMPORTANT]
> No eliminaré los archivos de countries/AI ya que esos se mantienen. Solo actualizaré las dependencias en el `routes/index.ts`.

## Verification Plan

### Automated Tests
```bash
# Compilar TypeScript
npm run build

# Iniciar servidor
npm run dev

# Probar endpoints manualmente:
# GET http://localhost:3005/api/players/search?name=Messi
# GET http://localhost:3005/api/players/34145937
# GET http://localhost:3005/api/players/34145937/detail
# GET http://localhost:3005/api/teams/search?name=Arsenal
# GET http://localhost:3005/api/teams/133604
# GET http://localhost:3005/api/teams/133604/players
# POST http://localhost:3005/api/ask (con playerName/teamName)
```
