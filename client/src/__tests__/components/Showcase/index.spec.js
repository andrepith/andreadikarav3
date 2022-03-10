import renderer from "react-test-renderer";
import Showcase from "../../../components/Showcase";

const portofolio = [
  {
    url: "https://spacestock.com/",
    image:
      "https://res.cloudinary.com/dqajgwdwt/image/upload/v1615825499/spacestock-web.png",
    alt: "spacestock-web",
    name: "Spacestock",
    type: "Website",
  },
];

it("Renders correctly", () => {
  const tree = renderer.create(<Showcase portofolio={portofolio} />).toJSON();
  expect(tree).toMatchSnapshot();
});
