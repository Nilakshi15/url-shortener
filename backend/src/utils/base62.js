// Characters used for Base62 encoding
// Total = 62 characters
// 0-9  -> 10 characters
// a-z  -> 26 characters
// A-Z  -> 26 characters
const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Converts a decimal number to a Base62 string.
 * Example:
 * 1  -> "1"
 * 10 -> "a"
 * 61 -> "Z"
 * 62 -> "10"
 */
function encode(num) {
  if (num === 0) {
    return "0";
  }

  let shortCode = "";

  while (num > 0) {
    const remainder = num % 62;
    shortCode = CHARSET[remainder] + shortCode;
    num = Math.floor(num / 62);
  }

  return shortCode;
}

/**
 * Converts a Base62 string back to a decimal number.
 * Example:
 * "10" -> 62
 * "a"  -> 10
 */
function decode(shortCode) {
  let number = 0;

  for (let i = 0; i < shortCode.length; i++) {
    number = number * 62 + CHARSET.indexOf(shortCode[i]);
  }

  return number;
}

module.exports = {
  encode,
  decode,
};