const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("✅ Redis Connected");
  } catch (err) {
    console.error("❌ Redis Connection Failed");
    console.error(err.message);
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