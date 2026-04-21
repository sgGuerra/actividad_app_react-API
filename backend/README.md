# Backend - API Services & Novita AI

Este subproyecto funciona como servidor y núcleo API para toda la plataforma estructurada en un diseño de **Clean Architecture** mediante **Express.js** y **TypeScript**. Actúa como puente entre el frontend y las APIs externas (TheSportsDB API v1, REST Countries API y el servicio de IA de Novita).

## Requisitos previos

- **Node.js** (v18+)
- **NPM**

## Instalación de dependencias

Asegúrate de estar en el directorio `backend/` e inicia con:

```bash
npm install
```

## Variables de Entorno (.env)

El proyecto requiere ciertas llaves sensibles que NO deben subirse al repositorio. Debes poseer un archivo `.env` en la raíz de `backend/` con las siguientes credenciales y configuraciones:

```env
PORT=3005
NOVITA_API_KEY="sk_tu_clave_de_novita"
THESPORTSDB_API_KEY="3" # 3 es la key por defecto gratuita v1
```

*Nota: La clave completa de Novita AI debe ser agregada para que el asistente (/api/ask) pueda recibir contextos y responder. Si el `PORT` es modificado o no existe, el servidor usará el 3005 como predeterminado (asegúrate de sincronizar cualquier cambio con `next.config.js` del frontend).*

## Scripts Claves

En el directorio `backend/`:

- `npm run dev`: Compila en vivo e inicia el servidor en modo desarrollo (usando `tsx` o `ts-node`).
- `npm run build`: Compila el código de TypeScript (de `src/`) a JavaScript listo para producción (en `dist/` típicamente).
- `npm run start`: Lanza el servidor en producción.

## Estructura (Clean Architecture)

- **`domain/`**: Corazón del backend. Define entidades abstractas (Country, Player, Team, FormerTeam, etc.) e interfaces de repositorios que serán implementadas fuera. No tiene dependencias a librerías externas.
- **`application/`**: Reglas de negocio y casos de uso (Ej. `GetPlayerDetail`, `SearchTeams`, `AskAI`).
- **`infrastructure/`**: Implementaciones técnicas (Repositorios in-memory, fetch a RestCountries API, fetch a TheSportsDBService, servicio de Novita, AI Client). Todo se vincula al mundo real.
- **`interfaces/`**: Adaptadores primarios. Define las rutas de Express y sus Controladores orientados a recibir la solicitud web y despacharla hacia los casos de uso.

## Probando la API

Una vez que el servidor esté ejecutándose (con `npm run dev`), puedes probar los endpoints de la API. El servidor corre por defecto en `http://localhost:3005`.

### Endpoints Disponibles

#### Jugadores
- `GET /api/players/search?name={nombre}` - Busca jugadores por nombre
- `GET /api/players/:id` - Obtiene los datos básicos de un jugador
- `GET /api/players/:id/detail` - Obtiene los datos completos (equipos anteriores, contratos, hitos, títulos)
- `GET /api/players/team/:teamId` - Obtiene la plantilla actual de un equipo

#### Equipos
- `GET /api/teams/search?name={nombre}` - Busca equipos por nombre
- `GET /api/teams/:id` - Obtiene el detalle de un equipo específico
- `GET /api/teams/league/:league` - Busca equipos por liga
- `GET /api/teams/:id/players` - Obtiene los jugadores de un equipo específico

#### Países
- `GET /api/countries` - Obtiene todos los países
- `GET /api/countries/random` - Obtiene un país aleatorio

#### IA (Novita AI)
- `POST /api/ask` - Envía una pregunta al asistente de IA con contexto dinámico
  - Body: 
    ```json
    {
      "question": "¿En qué equipos jugó Messi?",
      "country": null,
      "playerName": "Messi",
      "teamName": "Inter Miami",
      "history": []
    }
    ```

### Ejemplos de Pruebas con curl

```bash
# Buscar jugadores
curl http://localhost:3005/api/players/search?name=Messi

# Detalle completo de jugador
curl http://localhost:3005/api/players/34145937/detail

# Buscar equipos
curl http://localhost:3005/api/teams/search?name=Arsenal

# Equipos de una liga
curl http://localhost:3005/api/teams/league/English%20Premier%20League

# País aleatorio
curl http://localhost:3005/api/countries/random

# Preguntar a la IA inyectando el contexto del jugador buscado
curl -X POST http://localhost:3005/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "¿Cuántos títulos ganó Messi?", "playerName": "Messi"}'
```

### Notas Importantes
- Asegúrate de que el servidor esté corriendo antes de hacer las pruebas.
- Los endpoints de IA requieren la variable `NOVITA_API_KEY` configurada correctamente.
- La API de TheSportsDB v1 puede retornar `null` si no encuentra resultados.
