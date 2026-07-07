const { createClient } = require("redis");
require("dotenv").config();

const redisUrl =
  process.env.REDIS_URL ||
  `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || 6379}`;

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log(`✅ Redis Connected (${redisUrl})`);
  } catch (err) {
    console.error("❌ Redis Connection Failed");
    console.error(err.message);
    throw err;
  }
}

async function invalidateCache(shortCode) {
  await redisClient.del(shortCode);
  console.log(`🗑 Cache Invalidated: ${shortCode}`);
}

module.exports = {
  redisClient,
  connectRedis,
  invalidateCache,
};