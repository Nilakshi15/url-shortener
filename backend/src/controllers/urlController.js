const analyticsQueue = require("../queue/analyticsQueue");
const urlService = require("../services/urlService");
const {
  validateUrl,
  validateAlias,
} = require("../utils/validators");

/**
 * POST /api/v1/shorten
 */
async function shortenUrl(req, res) {
  try {
    const { url, alias } = req.body;

    // Validate URL
    const urlValidation = validateUrl(url);

    if (!urlValidation.valid) {
      return res.status(400).json({
        success: false,
        message: urlValidation.message,
      });
    }

    // Validate custom alias (optional)
    const aliasValidation = validateAlias(alias);

    if (!aliasValidation.valid) {
      return res.status(400).json({
        success: false,
        message: aliasValidation.message,
      });
    }

    const shortenedUrl = await urlService.createShortUrl(
      urlValidation.value,
      aliasValidation.value
    );

    return res.status(201).json({
      success: true,
      data: {
        id: shortenedUrl.id,
        original_url: shortenedUrl.original_url,
        short_code: shortenedUrl.short_code,
        short_url: `${process.env.BASE_URL}/${shortenedUrl.short_code}`,
        created_at: shortenedUrl.created_at,
      },
    });
  } catch (error) {
    // PostgreSQL UNIQUE constraint violation
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Alias already exists",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      code: error.code,
      detail: error.detail,
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
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    // Add analytics event to queue
  analyticsQueue.enqueue({
    short_code: code,
    ip_address: req.ip,
    referrer: req.get("Referer") || null,
    user_agent: req.get("User-Agent") || null,
  });

  // Redirect immediately
  return res.redirect(url.original_url);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Alias already exists",
      });
    }
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

/**
 * GET /api/v1/urls
 */
async function getAllUrls(req, res) {
  try {
    const urls = await urlService.getAllUrls();

    const data = urls.map((url) => ({
      ...url,
      short_url: `${process.env.BASE_URL}/${url.short_code}`,
    }));

    return res.status(200).json(data);
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
  getAllUrls,
};
