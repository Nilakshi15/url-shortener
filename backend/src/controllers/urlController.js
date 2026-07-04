const urlService = require("../services/urlService");

/**
 * POST /api/v1/shorten
 */
async function shortenUrl(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const shortenedUrl = await urlService.createShortUrl(url);

    return res.status(201).json({
      success: true,
      data: {
        id: shortenedUrl.id,
        original_url: shortenedUrl.original_url,
        short_code: shortenedUrl.short_code,
        short_url: `${req.protocol}://${req.get("host")}/${shortenedUrl.short_code}`,
        created_at: shortenedUrl.created_at,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

/**
 * GET /:code
 */
async function redirectToOriginalUrl(req, res) {
  try {
    const { code } = req.params;

    const url = await urlService.getOriginalUrl(code);

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL",
      });
    }

    return res.redirect(url.original_url);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  shortenUrl,
  redirectToOriginalUrl,
};