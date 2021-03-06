import { testData } from "./testData/testData";
import { shexjToTyping } from "../lib/typing/shexjToTyping";

describe("typing", () => {
  testData.forEach(({ name, shexj, successfulTypings }) => {
    it(`Creates a typings for ${name}`, async () => {
      const [typings] = await shexjToTyping(shexj);
      expect(typings.typingsString).toBe(successfulTypings);
    });
  });
});
