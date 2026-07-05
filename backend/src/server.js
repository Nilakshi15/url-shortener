require("dotenv").config();

const {
  startAnalyticsWorker,
} = require("./workers/analyticsWorker");
const app = require("./app");
const pool = require("./db/db");
const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // PostgreSQL Connection
    await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL");

    // Redis Connection
    await connectRedis();

    startAnalyticsWorker();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();