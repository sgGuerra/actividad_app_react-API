# Frontend - Aplicación Guess The Country

Este directorio contiene la aplicación cliente construida con **Next.js** y **React**. Está diseñada para consumir los endpoints integrados en el backend sirviendo como capa de interfaz de usuario de nuestro proyecto.

## Requisitos previos

- **Node.js** (v18+)
- **NPM**

## Instalación de dependencias

Asegúrate de estar en el directorio `frontend/` y ejecuta:

```bash
npm install
```

## Configuración y Entorno

El frontend se comunica con el backend mediante un proxy de red proxy inverso *(rewrites)* definido en `next.config.js`. Esto redirige transparentemente todas las llamadas asíncronas generadas bajo `/api/*` hacia el servidor Express local.

Por defecto, el puente asume que el backend se está ejecutando en el puerto **3005**. Si necesitas cambiar el puerto del backend, hazlo primero en su archivo config o `.env` y luego modifica `frontend/next.config.js`:

```javascript
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3005/api/:path*",
      },
    ];
  },
```

No necesitas un archivo `.env` en este frontend al menos que quieras añadir configuraciones propias o servicios del cliente.

## Scripts Claves

En el directorio `frontend/`:

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: Genera la versión de producción optimizada.
- `npm run start`: Inicia el entorno de producción que se acaba de compilar.
- `npm run lint`: Ejecuta ESLint para analizar errores en el código.

## Desarrollo y Estructura

- `app/`: Contiene el enrutador App Router principal de Next.js (por ej., `page.tsx`).
- `components/`: Componentes modulares y reutilizables de UI.
- `hooks/`: Custom Hooks, como `useGame.ts` que se encarga del estado entero de la partida, llamadas y lógica del historial de chat.
- La estilización utiliza **TailwindCSS** bajo el archivo de configuración `tailwind.config.js` y el principal `globals.css`.
