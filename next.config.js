/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  scope: "/",
  skipWaiting: true,
  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
  },
});

module.exports = nextConfig;
