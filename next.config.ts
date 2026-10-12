import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Product captures carry small UI text; 85 keeps it legible after WebP conversion.
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      // The landing's films and stills. Their file names stay the same when a film is re-rendered, so a day, not a year.
      {
        source: "/assets/landing/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
