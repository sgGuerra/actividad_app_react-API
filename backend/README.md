# Backend - API Services & Novita AI

Este subproyecto funciona como servidor y núcleo API para toda la plataforma estructurada en un diseño de **Clean Architecture** mediante **Express.js** y **TypeScript**. Actúa como puente entre el frontend y las APIs externas (Base de datos remota/API de Países y servicio de Inteligencia artificial de Novita).

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
```

*Nota: La clave completa de Novita AI debe ser agregada para que el asistente (/api/ask) pueda recibir contextos y responder al juego. Si el `PORT` es modificado o no existe, el servidor usará el 3005 como predeterminado (asegúrate de sincronizar cualquier cambio con `next.config.js` del frontend).*

## Scripts Claves

En el directorio `backend/`:

- `npm run dev`: Compila en vivo e inicia el servidor en modo desarrollo (usando `tsx` o `ts-node`).
- `npm run build`: Compila el código de TypeScript (de `src/`) a JavaScript listo para producción (en `dist/` típicamente).
- `npm run start`: Lanza el servidor en producción.

## Estructura (Clean Architecture)

- **`domain/`**: Corazón del backend. Define entidades abstractas (Ej. Country, Match, Player) e interfaces de repositorios que serán implementadas fuera. No tiene dependencias a librerías externas.
- **`application/`**: Reglas de negocio y casos de uso (Ej. `GetAllCountries`, `AskAI`).
- **`infrastructure/`**: Implementaciones técnicas (Repositorios in-memory, fetch a RestCountries AI, servicio de Novita, AI Client). Todo se vincula al mundo real.
- **`interfaces/`**: Adaptadores primarios. Define las rutas de Express y sus Controladores orientados a recibir la solicitud web y despacharla hacia los casos de uso.
