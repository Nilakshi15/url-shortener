const rateLimit = require("express-rate-limit");

const shortenLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,

  message: {
    success: false,
    message: "Too many requests. Please try again in a minute.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = shortenLimiter;