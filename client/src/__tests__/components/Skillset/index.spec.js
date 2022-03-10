import renderer from "react-test-renderer";
import Skillset from "../../../components/Skillset";

const skillset = [
  {
    name: "JavaScript",
    image:
      "https://res.cloudinary.com/dqajgwdwt/image/upload/v1615891859/javascript.png",
    link: "https://www.javascript.com/",
  },
];

it("Renders correctly", () => {
  const tree = renderer.create(<Skillset skillset={skillset} />).toJSON();
  expect(tree).toMatchSnapshot();
});
