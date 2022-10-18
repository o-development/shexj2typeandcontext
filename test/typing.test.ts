import parser from "@shexjs/parser";
import { testData } from "./testData/testData";
import { shexjToTyping } from "../lib/typing/shexjToTyping";
import { Schema } from "shexj";

describe("typing", () => {
  testData.forEach(({ name, shexc, successfulTypings }) => {
    it(`Creates a typings for ${name}`, async () => {
      const schema: Schema = parser
        .construct("https://ldo.js.org/")
        .parse(shexc);
      const [typings] = await shexjToTyping(schema);
      expect(typings.typingsString).toBe(successfulTypings);
    });
  });
});
