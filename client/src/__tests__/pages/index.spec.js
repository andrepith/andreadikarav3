import renderer from "react-test-renderer";
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

it("Renders correctly", () => {
  const tree = renderer.create(<Home {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
