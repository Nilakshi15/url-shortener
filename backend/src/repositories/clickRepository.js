const pool = require("../db/db");

/**
 * Save click analytics to database
 */
async function createClick(data) {
  const query = `
    INSERT INTO clicks (
      short_code,
      ip_address,
      referrer,
      user_agent
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    data.short_code,
    data.ip_address,
    data.referrer,
    data.user_agent,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

async function getAnalytics(shortCode) {
  const query = `
    SELECT
      short_code,
      COUNT(*) AS total_clicks,
      MAX(clicked_at) AS last_clicked
    FROM clicks
    WHERE short_code = $1
    GROUP BY short_code;
  `;

  const { rows } = await pool.query(query, [shortCode]);

  return rows[0];
}

module.exports = {
  createClick,
  getAnalytics,
};