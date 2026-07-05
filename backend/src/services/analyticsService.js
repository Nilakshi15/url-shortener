const analyticsRepository = require("../repositories/analyticsRepository");

/**
 * Get analytics for a short code
 */
async function getAnalytics(shortCode) {
  return await analyticsRepository.getAnalytics(shortCode);
}

module.exports = {
  getAnalytics,
};