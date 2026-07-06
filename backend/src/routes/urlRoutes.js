const express = require("express");

const router = express.Router();

const {
  shortenUrl,
  getAllUrls,
} = require("../controllers/urlController");

const shortenLimiter = require("../middleware/rateLimiter");

console.log("✅ urlRoutes loaded");

// POST /api/v1/shorten
router.post(
  "/shorten",
  shortenLimiter,
  shortenUrl
);

// GET /api/v1/urls
router.get("/urls", getAllUrls);

module.exports = router;