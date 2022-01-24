import { ContextDefinition } from "jsonld";
import { Schema } from "shexj";
import { JsonLdContextBuilder } from "./JsonLdContextBuilder";
import { ShexJNameVisitor } from "./ShexJContextVisitor";
import { jsonld2graphobject } from "jsonld2graphobject";

export async function shexjToContext(
  shexj: Schema
): Promise<ContextDefinition> {
  const processedShexj: Schema = (await jsonld2graphobject(
    { ...shexj, "@id": "SCHEMA" },
    "SCHEMA"
  )) as unknown as Schema;
  const jsonLdContextBuilder = new JsonLdContextBuilder();
  await ShexJNameVisitor.visit(processedShexj, "Schema", jsonLdContextBuilder);
  return jsonLdContextBuilder.generateJsonldContext();
}
