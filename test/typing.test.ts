import { testData } from "./testData/testData";
import { shexjToTyping } from "../lib/typing/shexjToTyping";

describe("typing", () => {
  testData.forEach(({ name, shexj, successfulTypings }) => {
    it(`Creates a typings for ${name}`, async () => {
      const [typings] = await shexjToTyping(shexj);
      // console.log(name);
      // console.log(JSON.stringify(typings.typingsString));
      expect(typings.typingsString).toBe(successfulTypings);
    });
  });
});
