/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const path = require('path');

const pwa = withPWA({
  dest: "public",
  swSrc: "/sw.js",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
});



module.exports = pwa({
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
