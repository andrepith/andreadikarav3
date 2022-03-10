import renderer from "react-test-renderer";
import LandingTop from "../../../components/LandingTop";

it("Renders correctly", () => {
  const tree = renderer.create(<LandingTop />).toJSON();
  expect(tree).toMatchSnapshot();
});
