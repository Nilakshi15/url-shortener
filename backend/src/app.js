const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const analyticsRoutes = require("./routes/analyticsRoutes");
const urlRoutes = require("./routes/urlRoutes");
const redirectRoutes = require("./routes/redirectRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1", urlRoutes);
app.use("/api/v1", analyticsRoutes);
app.use("/", redirectRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "URL Shortener API is running 🚀",
  });
});

module.exports = app;