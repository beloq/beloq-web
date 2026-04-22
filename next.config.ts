import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
