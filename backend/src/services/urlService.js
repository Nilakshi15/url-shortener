const urlRepository = require("../repositories/urlRepository");
const { encode } = require("../utils/base62");

/**
 * Create Short URL
 */
async function createShortUrl(originalUrl) {

  const existing = await urlRepository.findByOriginalUrl(originalUrl);

  if (existing) {
    return existing;
  }

  const url = await urlRepository.createUrl(originalUrl);

  const shortCode = encode(url.id);

  return await urlRepository.updateShortCode(url.id, shortCode);
}

/**
 * Get Original URL
 */
async function getOriginalUrl(shortCode) {
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    return null;
  }

  // Expiry check (future-proof)
  if (url.expires_at && new Date(url.expires_at) < new Date()) {
    return null;
  }

  return url;
}

module.exports = {
  createShortUrl,
  getOriginalUrl,
};