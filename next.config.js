/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    dest: "public",
    swSrc: "sw.js",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
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
  fallbacks: {
    document: "/offline",
  },
};

module.exports = withPWA(nextConfig);
