import bioApi from "../../lib/BioApi";
import staticData from "../../lib/StaticData";

describe("mockImplementation", () => {
  test("api failed", async () => {
    const data = await bioApi();
    const mockFn = jest.fn().mockImplementation(() => staticData);
    expect(mockFn()).toEqual(data);
  });
});
