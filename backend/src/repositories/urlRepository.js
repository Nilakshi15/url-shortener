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

module.exports = {
  createUrl,
  updateShortCode,
  findByShortCode,
  findByOriginalUrl,
};