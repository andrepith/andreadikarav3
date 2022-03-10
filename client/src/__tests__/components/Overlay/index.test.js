import { render } from "@testing-library/react";
import Overlay from "../../../components/Overlay";

describe("Name of the group", () => {
  it("div have class d-block", () => {
    const { container } = render(<Overlay isOpen={true} />);
    expect(container.firstChild).toHaveClass("d-block");
  });

  it("div have class d-none", () => {
    const { container } = render(<Overlay isOpen={false} />);
    expect(container.firstChild).toHaveClass("d-none");
  });
});
