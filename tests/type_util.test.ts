import { isString } from "../src/utils/type_util";

describe("isString", () => {
  it("文字列リテラル", () => {
    expect(isString("hoge")).toBeTruthy();
  });
  it("new String()", () => {
    expect(isString(new String())).toBeTruthy();
  });
  it("文字列以外", () => {
    expect(isString(3)).toBeFalsy();
  });
});
