const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const urlRoutes = require("./routes/urlRoutes");
const redirectRoutes = require("./routes/redirectRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1", urlRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "URL Shortener API is running 🚀",
  });
});

// Redirect route
app.use("/", redirectRoutes);

module.exports = app;