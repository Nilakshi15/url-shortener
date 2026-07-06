const pool = require("../db/db");

/**
 * Inserts a new URL into the database.
 * Initially, short_code is NULL.
 * PostgreSQL generates the ID automatically.
 */
async function createUrl(originalUrl) {
  const query = `
    INSERT INTO urls (original_url)
    VALUES ($1)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [originalUrl]);

  return rows[0];
}

/**
 * Updates the generated Base62 short code.
 */
async function updateShortCode(id, shortCode) {
  const query = `
    UPDATE urls
    SET short_code = $1
    WHERE id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [shortCode, id]);

  return rows[0];
}

/**
 * Finds a URL using its short code.
 * (We'll use this tomorrow for redirects.)
 */
async function findByShortCode(shortCode) {
  const query = `
    SELECT *
    FROM urls
    WHERE short_code = $1;
  `;

  const { rows } = await pool.query(query, [shortCode]);

  return rows[0];
}

async function findByOriginalUrl(originalUrl) {
  const query = `
    SELECT *
    FROM urls
    WHERE original_url = $1;
  `;

  const { rows } = await pool.query(query, [originalUrl]);

  return rows[0];
}

async function createCustomUrl(originalUrl, alias) {
  const query = `
    INSERT INTO urls (original_url, short_code)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    originalUrl,
    alias,
  ]);

  return rows[0];
}

/**
 * Get all URLs with click counts
 */

async function getAllUrls() {
  const query = `
    SELECT
      u.id,
      u.original_url,
      u.short_code,
      u.created_at,
      COUNT(c.id)::INT AS total_clicks
    FROM urls u
    LEFT JOIN clicks c
      ON u.short_code = c.short_code
    GROUP BY
      u.id,
      u.original_url,
      u.short_code,
      u.created_at
    ORDER BY u.created_at DESC;
  `;

  const { rows } = await pool.query(query);

  return rows;
}

module.exports = {
  createUrl,
  updateShortCode,
  findByShortCode,
  findByOriginalUrl,
  getAllUrls,
  createCustomUrl,
};