/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  outputFileTracingRoot: path.join(__dirname),
  serverExternalPackages: ["@reduxjs/toolkit"],
};

module.exports = nextConfig;
