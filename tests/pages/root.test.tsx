import {
  parsePageQuery,
  calcTotalPage,
  calcStart,
} from "../../src/pages/index";

describe("parsePageQuery", () => {
  it("page does not exist", () => {
    const query = {};
    expect(parsePageQuery(query)).toBe(1);
  });
  it("page is array", () => {
    const query = {
      page: ["3"],
    };
    expect(parsePageQuery(query)).toBe(3);
  });
  it("page is string", () => {
    const query = {
      page: "3",
    };
    expect(parsePageQuery(query)).toBe(3);
  });
});

describe("calcTotalPage", () => {
  it("5 times", () => {
    const hitNum = 10;
    expect(calcTotalPage(hitNum)).toBe(2);
  });
  it("not 5 times", () => {
    const hitNum = 11;
    expect(calcTotalPage(hitNum)).toBe(3);
  });
  it("less than 5", () => {
    const hitNum = 4;
    expect(calcTotalPage(hitNum)).toBe(1);
  });
});

describe("calcStart", () => {
  it("page is null", () => {
    let page;
    expect(calcStart(page)).toBe(0);
  });
});
