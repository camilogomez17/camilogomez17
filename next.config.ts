import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: 'camera=(), microphone=(self "https://c3rvkpmmirwh.run.agentplace.io" "https://9kw4exiawayx.run.agentplace.io"), geolocation=()',
          },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests; script-src 'self' 'unsafe-inline' https://agentplace.io https://*.agentplace.io https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://www.google.com https://www.gstatic.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://agentplace.io; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://agentplace.io https://*.agentplace.io https://*.run.agentplace.io https://*.google.com https://*.googleadservices.com https://*.googlesyndication.com https://*.doubleclick.net https://vitals.vercel-insights.com https://*.vercel-insights.com; frame-src 'self' https://*.run.agentplace.io https://agentplace.io https://*.agentplace.io https://googleads.g.doubleclick.net https://*.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://fundingchoicesmessages.google.com",
          },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    if (isServer && config.output) {
      config.output.chunkFilename = "chunks/[id].js";
    }

    return config;
  },
};

export default nextConfig;
