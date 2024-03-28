/** @type {import('next').NextConfig} */

// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
//   swSrc: "/sw.js",
//   cacheOnFrontEndNav: true,
//   reloadOnOnline: true,
//   fallbacks: {
//     document: "/offline",
//   },
// });


const nextConfig = {
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
};

module.exports = nextConfig;
// module.exports = withPWA(nextConfig);
