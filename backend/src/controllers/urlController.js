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
        short_url: `${req.protocol}://${req.get("host")}/${shortenedUrl.short_code}`,
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

module.exports = {
  shortenUrl,
  redirectToOriginalUrl,
};