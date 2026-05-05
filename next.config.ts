import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // AASA: Apple exige Content-Type application/json en una ruta sin extensión.
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Apex → www, excepto /.well-known/* (Apple AASA no admite redirect).
      // Requiere que el "Domain Redirect" del apex esté desactivado en Vercel.
      {
        source: "/:path((?!\\.well-known).*)",
        has: [{ type: "host", value: "beloq.es" }],
        destination: "https://www.beloq.es/:path",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Sirve la demo estática de beloq Console desde /console.
      // El HTML incluye <base href="/console/"> para que las rutas relativas
      // (data.js, assets/..., fonts/...) resuelvan independientemente del slash.
      { source: "/console", destination: "/console/index.html" },
      { source: "/console/", destination: "/console/index.html" },
    ];
  },
};

export default nextConfig;
