import { testData } from "./testData";
import { shexjToContext } from "../lib/context/shexjToContext";
import { serializedToDataset } from "o-dataset-pack";
import { fromRDF, compact, frame, ContextDefinition } from "jsonld";
import { JsonLd } from "jsonld/jsonld-spec";
import { jsonld2graphobject } from "jsonld2graphobject";

describe("context", () => {
  testData.forEach(({ name, shexj, sampleTurtle, baseNode }) => {
    it(`Creates a context for ${name}`, async () => {
      const context = await shexjToContext(shexj);
      // console.log(context);
      const dataset = await serializedToDataset(sampleTurtle);
      console.log(dataset.toString());
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const rawJsonLd: JsonLd = await fromRDF(dataset.toString(), {
        format: "application/n-quads",
        useNativeTypes: true,
      });
      console.log(JSON.stringify(rawJsonLd, null, 2));

      const compactJsonLd = await compact(rawJsonLd, context);
      const reformattedObject = await jsonld2graphobject<any>(
        compactJsonLd,
        baseNode,
        { excludeContext: true }
      );
      console.log(context);
      console.log("===============");
      console.log(JSON.stringify(reformattedObject.trustedApp, null, 2));
      console.log(reformattedObject.hasTelephone);
      console.log(reformattedObject.hasEmail);
      console.log(reformattedObject.hasAddress);
      console.log(reformattedObject);
    });
  });
  it("example", async () => {
    const inputData: JsonLd = {
      "@id": "_:n3-9",
      "http://www.w3.org/ns/auth/acl#mode": [
        {
          "@id": "http://www.w3.org/ns/auth/acl#Append",
        },
        {
          "@id": "http://www.w3.org/ns/auth/acl#Control",
        },
        {
          "@id": "http://www.w3.org/ns/auth/acl#Read",
        },
        {
          "@id": "http://www.w3.org/ns/auth/acl#Write",
        },
      ],
      "http://www.w3.org/ns/auth/acl#origin": [
        {
          "@id": "https://api.chat.o.team",
        },
      ],
    };
    const inputContext: ContextDefinition = {
      mode: {
        "@id": "http://www.w3.org/ns/auth/acl#mode",
        "@container": "@set",
      },
      Append: "http://www.w3.org/ns/auth/acl#Append",
      Control: "http://www.w3.org/ns/auth/acl#Control",
      Read: "http://www.w3.org/ns/auth/acl#Read",
      Write: "http://www.w3.org/ns/auth/acl#Write",
    };
    const parsedOutput = await compact(inputData, inputContext);
    console.log(parsedOutput);
  });
});
