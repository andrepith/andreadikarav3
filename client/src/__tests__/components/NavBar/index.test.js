import React from "react";
import { mount } from "enzyme";
import NavBar from "../../../components/NavBar";

describe("NavBar Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<NavBar />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should open overlay", () => {
    wrapper.find(".navbar-toggler").simulate("click");
    expect(wrapper.find("#navOverlay")).toHaveLength(1);
  });
});
