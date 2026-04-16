/**
 * next.config.js
 * ─────────────────────────────────────────────────────────────
 * Configuración de Next.js para el frontend.
 *
 * IMPORTANTE: Se usan "rewrites" para redirigir todas las
 * peticiones /api/* al backend Express (puerto 3001).
 *
 * Esto permite que el frontend siga usando /api/ask, /api/countries, etc.
 * sin cambiar ninguna URL en los componentes o hooks.
 *
 * Next.js actúa como proxy transparente:
 *   Frontend llama → /api/sports
 *   Next.js reescribe → http://localhost:3001/api/sports
 *   El navegador nunca ve el puerto 3001
 * ─────────────────────────────────────────────────────────────
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from flags API
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
  },

  /**
   * Rewrites — El puente entre frontend y backend
   *
   * Todas las peticiones que empiecen con /api/ se redirigen
   * al servidor Express en el puerto 3001.
   *
   * El frontend NO necesita saber que existe otro servidor.
   * Simplemente llama a /api/* como si fuera local.
   */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3005/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
