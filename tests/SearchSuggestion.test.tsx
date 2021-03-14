import React from "react";
import { shallow } from "enzyme";
import SearchSuggestion from "../src/components/SearchSuggestion";

describe("SearchSuggestion", () => {
  it("Snapshot Test", () => {
    const searchSuggestion = shallow(<SearchSuggestion />);
    expect(searchSuggestion).toMatchSnapshot();
  });
});
