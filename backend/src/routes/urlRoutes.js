const express = require("express");

const router = express.Router();

const urlController = require("../controllers/urlController");
const shortenLimiter = require("../middleware/rateLimiter");

router.post(
  "/shorten",
  shortenLimiter,
  urlController.shortenUrl
);

module.exports = router;