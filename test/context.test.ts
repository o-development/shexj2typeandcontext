import { testData } from "./testData/testData";
import { shexjToContext } from "../lib/context/shexjToContext";

describe("context", () => {
  testData.forEach(({ name, shexj, successfulContext }) => {
    it(`Creates a context for ${name}`, async () => {
      const context = await shexjToContext(shexj);
      expect(context).toEqual(successfulContext);
    });

    // it(`Creates a context for ${name}`, async () => {
    //   const context = await shexjToContext(shexj);
    //   // console.log(context);
    //   const dataset = await serializedToDataset(sampleTurtle);
    //   console.log(dataset.toString());
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   const rawJsonLd: JsonLd = await fromRDF(dataset.toString(), {
    //     format: "application/n-quads",
    //     useNativeTypes: true,
    //   });
    //   console.log(JSON.stringify(rawJsonLd, null, 2));

    //   const compactJsonLd = await compact(rawJsonLd, context);
    //   const reformattedObject = await jsonld2graphobject<any>(
    //     compactJsonLd,
    //     baseNode,
    //     { excludeContext: true }
    //   );
    //   console.log(context);
    //   console.log("===============");
    //   console.log(JSON.stringify(reformattedObject.trustedApp, null, 2));
    //   console.log(reformattedObject.hasTelephone);
    //   console.log(reformattedObject.hasEmail);
    //   console.log(reformattedObject.hasAddress);
    //   console.log(reformattedObject);
    // });
  });
});
