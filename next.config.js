/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: require.resolve("./cache-handler.mjs"),
  cacheMaxMemorySize: 0,
  env: {
    NEXT_PUBLIC_REDIS_INSIGHT_URL:
      process.env.REDIS_INSIGHT_URL ?? "http://localhost:8001",
  },
};

module.exports = nextConfig;
