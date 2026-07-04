const {
  validateUrl,
  validateAlias,
} = require("../src/utils/validators");

describe("URL Validator", () => {

  test("valid URL", () => {
    expect(
      validateUrl("https://github.com").valid
    ).toBe(true);
  });

  test("invalid URL", () => {
    expect(
      validateUrl("hello").valid
    ).toBe(false);
  });

  test("invalid protocol", () => {
    expect(
      validateUrl("ftp://github.com").valid
    ).toBe(false);
  });

});

describe("Alias Validator", () => {

  test("valid alias", () => {
    expect(
      validateAlias("github").valid
    ).toBe(true);
  });

  test("invalid alias", () => {
    expect(
      validateAlias("@@@").valid
    ).toBe(false);
  });

  test("short alias", () => {
    expect(
      validateAlias("ab").valid
    ).toBe(false);
  });

});