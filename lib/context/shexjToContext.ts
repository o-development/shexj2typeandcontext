import { ContextDefinition } from "jsonld";
import { Schema } from "shexj";
import { JsonLdContextBuilder } from "./JsonLdContextBuilder";
import { ShexJNameVisitor } from "./ShexJContextVisitor";
import { jsonld2graphobject } from "jsonld2graphobject";

export async function shexjToContext(
  shexj: Schema,
  options?: { shexjIsAlreadyCircular?: boolean }
): Promise<ContextDefinition> {
  const processedShexj: Schema = options?.shexjIsAlreadyCircular
    ? shexj
    : ((await jsonld2graphobject(
        { ...shexj, "@id": "SCHEMA" },
        "SCHEMA"
      )) as unknown as Schema);
  const jsonLdContextBuilder = new JsonLdContextBuilder();
  await ShexJNameVisitor.visit(processedShexj, "Schema", jsonLdContextBuilder);
  return jsonLdContextBuilder.generateJsonldContext();
}
