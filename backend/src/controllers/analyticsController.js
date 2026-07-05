const analyticsService = require("../services/analyticsService");

/**
 * GET /api/v1/analytics/:code
 */
async function getAnalytics(req, res) {
  try {
    const { code } = req.params;

    const analytics = await analyticsService.getAnalytics(code);

    if (analytics.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No analytics found",
      });
    }

    return res.status(200).json({
      success: true,
      total_clicks: analytics.length,
      data: analytics,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getAnalytics,
};