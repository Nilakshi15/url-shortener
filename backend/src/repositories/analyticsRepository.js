const pool = require("../db/db");

/**
 * Get analytics for a short code
 */
async function getAnalytics(shortCode) {
  const query = `
    SELECT
      id,
      short_code,
      clicked_at,
      ip_address,
      referrer,
      user_agent
    FROM clicks
    WHERE short_code = $1
    ORDER BY clicked_at DESC;
  `;

  const { rows } = await pool.query(query, [shortCode]);

  return rows;
}

module.exports = {
  getAnalytics,
};