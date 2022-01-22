import { ContextDefinition } from "jsonld";
import { Schema } from "shexj";
import { JsonLdContextBuilder } from "./JsonLdContextBuilder";
import { ShexJNameVisitor } from "./ShexJContextVisitor";

export async function shexJToContext(
  shexj: Schema
): Promise<ContextDefinition> {
  const jsonLdContextBuilder = new JsonLdContextBuilder();
  await ShexJNameVisitor.visit(shexj, "Schema", jsonLdContextBuilder);
  return jsonLdContextBuilder.generateJsonldContext();
}
