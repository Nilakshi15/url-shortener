const analyticsQueue = require("../queue/analyticsQueue");
const clickRepository = require("../repositories/clickRepository");

/**
 * Process analytics queue every second
 */
function startAnalyticsWorker() {
  setInterval(async () => {
    if (analyticsQueue.isEmpty()) {
      return;
    }

    const event = analyticsQueue.dequeue();

    try {
      await clickRepository.createClick(event);

      console.log(
        `📊 Analytics saved for ${event.short_code}`
      );
    } catch (error) {
      console.error("Analytics Worker Error");

      console.error(error.message);
    }
  }, 1000);
}

module.exports = {
  startAnalyticsWorker,
};