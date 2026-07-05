const urlRepository = require("../repositories/urlRepository");
const { encode } = require("../utils/base62");
const { redisClient } = require("../config/redis");
/**
 * Create Short URL
 */
async function createShortUrl(originalUrl, alias = null) {

  const existing =
    await urlRepository.findByOriginalUrl(originalUrl);

  if (existing) {
    return existing;
  }

  if (alias) {
    return await urlRepository.createCustomUrl(
      originalUrl,
      alias
    );
  }

  const url =
    await urlRepository.createUrl(originalUrl);

  const shortCode = encode(url.id);

  return await urlRepository.updateShortCode(
    url.id,
    shortCode
  );
}

/**
 * Get Original URL
 */
/**
 * Get Original URL
 */
async function getOriginalUrl(shortCode) {
  console.log("getOriginalUrl called with:", shortCode);
  // 1. Check Redis first
  const cachedUrl = await redisClient.get(shortCode);

  if (cachedUrl) {
    console.log("🟢 Cache HIT");

    return {
      original_url: cachedUrl,
    };
  }

  console.log("🔴 Cache MISS");

  // 2. Fetch from PostgreSQL
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    return null;
  }

  // 3. Expiry check
  if (url.expires_at && new Date(url.expires_at) < new Date()) {
    return null;
  }

  // 4. Store in Redis for 1 hour
  await redisClient.setEx(
    shortCode,
    3600,
    url.original_url
  );

  return url;
}

module.exports = {
  createShortUrl,
  getOriginalUrl,
};