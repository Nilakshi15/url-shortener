const urlRepository = require("../repositories/urlRepository");
const { encode } = require("../utils/base62");

/**
 * Creates a shortened URL.
 */
async function createShortUrl(originalUrl) {
  // Step 1: Insert URL into database
  const url = await urlRepository.createUrl(originalUrl);

  // Step 2: Generate Base62 short code from database ID
  const shortCode = encode(url.id);

  // Step 3: Update the database with the generated short code
  const updatedUrl = await urlRepository.updateShortCode(
    url.id,
    shortCode
  );

  return updatedUrl;
}

module.exports = {
  createShortUrl,
};