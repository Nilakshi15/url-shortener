const clickRepository = require("../repositories/clickRepository");

async function getAnalytics(req, res) {
  try {
    const { code } = req.params;

    const analytics =
      await clickRepository.getAnalytics(code);

    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "No analytics found",
      });
    }

    return res.status(200).json({
      success: true,
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