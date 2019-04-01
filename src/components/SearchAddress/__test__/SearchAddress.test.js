import React from "react";
import { shallow } from "enzyme";
import SearchAddress from "../SearchAddress";

describe("Search component", () => {
  let wrapper;
  const btcAddress = "1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX";

  beforeEach(() => {
    wrapper = shallow(<SearchAddress />);
  });

  afterEach(() => {});

  it("has a search input and a button to search ", () => {
    expect(wrapper.find(".search-input").length).toEqual(1);
    expect(wrapper.find(".search-button").length).toEqual(1);
  });

  it("at filling the address input and validate it", () => {
    expect(wrapper.find(".seach-input").exists()).toEqual(false);
    wrapper.setState({ address: btcAddress });
    wrapper.update();
    expect(wrapper.find(".seach-input").exists()).toEqual(true);
  });
});
