import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
// import createRedisHandler from "@neshca/cache-handler/redis-stack";
// or if you are using Redis without the RedisJSON module
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";

CacheHandler.onCreation(async () => {
  // always create a Redis client inside the `onCreation` callback
  const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
  console.log({ redisUrl });
  const client = createClient({
    url: redisUrl,
  });

  client.on("error", () => {});

  await client.connect();

  const redisHandler = createRedisHandler({
    client,
    // timeout for the Redis client operations like `get` and `set`
    // after this timeout, the operation will be considered failed and the `localHandler` will be used
    timeoutMs: 5000,
  });

  const localHandler = createLruHandler();

  return {
    handlers: [redisHandler],
  };
});

export default CacheHandler;
