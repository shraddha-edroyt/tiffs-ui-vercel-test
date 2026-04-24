/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Image domains (add your backend domain here when ready)
  images: {
    domains: [],
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: "Upnix",
    NEXT_PUBLIC_APP_VERSION: "1.0.0",
  },
};

module.exports = nextConfig;
