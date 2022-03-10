import renderer from "react-test-renderer";
import Overlay from "../../../components/Overlay";

it("Renders correctly", () => {
  const tree = renderer.create(<Overlay />).toJSON();
  expect(tree).toMatchSnapshot();
});
