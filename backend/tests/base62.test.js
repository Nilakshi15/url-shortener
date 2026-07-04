const { encode } = require("../src/utils/base62");

describe("Base62 Encoder", () => {
  test("encode 0", () => {
    expect(encode(0)).toBe("0");
  });

  test("encode 1", () => {
    expect(encode(1)).toBe("1");
  });

  test("encode 61", () => {
    expect(encode(61)).toBe("Z");
  });

  test("encode 62", () => {
    expect(encode(62)).toBe("10");
  });

  test("encode 3844", () => {
    expect(encode(3844)).toBe("100");
  });
});