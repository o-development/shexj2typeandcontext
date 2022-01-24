import { testData } from "./testData";
import { shexjToTyping } from "../lib/typing/shexjToTyping";

describe("context", () => {
  testData.forEach(({ name, shexj, successfulTypings }) => {
    it(`Creates a typings for ${name}`, async () => {
      const [typings] = await shexjToTyping(shexj);
      expect(typings).toBe(successfulTypings);
    });
  });
});
