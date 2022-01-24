import { ContextDefinition } from "jsonld";
import { Schema } from "shexj";
import { JsonLdContextBuilder } from "../context/JsonLdContextBuilder";
import { ShexJNameVisitor } from "../context/ShexJContextVisitor";
import { jsonld2graphobject } from "jsonld2graphobject";
import { ShexJTypingTransformer } from "./ShexJTypingTransformer";
import * as dom from "dts-dom";

export async function shexjToTyping(
  shexj: Schema
): Promise<[string, ContextDefinition]> {
  const processedShexj: Schema = (await jsonld2graphobject(
    { ...shexj, "@id": "SCHEMA" },
    "SCHEMA"
  )) as unknown as Schema;
  const jsonLdContextBuilder = new JsonLdContextBuilder();
  await ShexJNameVisitor.visit(processedShexj, "Schema", jsonLdContextBuilder);
  const namespace = await ShexJTypingTransformer.transform(
    processedShexj,
    "Schema",
    {
      getNameFromIri:
        jsonLdContextBuilder.getNameFromIri.bind(jsonLdContextBuilder),
    }
  );
  return [dom.emit(namespace), jsonLdContextBuilder.generateJsonldContext()];
}
