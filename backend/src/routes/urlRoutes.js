const express = require("express");

const router = express.Router();

const urlController = require("../controllers/urlController");

// POST /api/v1/shorten
router.post("/shorten", urlController.shortenUrl);

module.exports = router;