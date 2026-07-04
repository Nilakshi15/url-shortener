function validateUrl(url) {
  if (!url || typeof url !== "string") {
    return {
      valid: false,
      message: "URL is required",
    };
  }

  const trimmedUrl = url.trim();

  try {
    const parsed = new URL(trimmedUrl);

    if (
      parsed.protocol !== "http:" &&
      parsed.protocol !== "https:"
    ) {
      return {
        valid: false,
        message: "Only HTTP and HTTPS URLs are allowed",
      };
    }

    return {
      valid: true,
      value: trimmedUrl,
    };
  } catch {
    return {
      valid: false,
      message: "Please provide a valid URL",
    };
  }
}

function validateAlias(alias) {
  if (!alias) {
    return {
      valid: true,
      value: null,
    };
  }

  const trimmedAlias = alias.trim();

  const regex = /^[a-zA-Z0-9_-]{3,20}$/;

  if (!regex.test(trimmedAlias)) {
    return {
      valid: false,
      message:
        "Alias must be 3-20 characters and contain only letters, numbers, '-' or '_'",
    };
  }

  return {
    valid: true,
    value: trimmedAlias,
  };
}

module.exports = {
  validateUrl,
  validateAlias,
};