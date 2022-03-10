import axios from "axios";
import ShallowRenderer from "react-test-renderer/shallow";
import Home from "../../pages/index";

const props = {
  bio: {
    firstName: "",
    lastName: "",
    nationality: "",
    aboutMe: "",
    email: "",
    github: {
      url: "",
    },
    linkedin: {
      url: "",
    },
    resumeLink: "",
    portofolio: [],
    skillset: [],
  },
};

describe("Home passing props to landingtop", () => {
  it("have wrapper class", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Home {...props} />);
    const result = renderer.getRenderOutput();
  });
});
