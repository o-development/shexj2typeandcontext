import ShexJTraverser from "./shexJTraverser";
import { Annotation, Schema } from "shexj";
import { jsonld2graphobject } from "jsonld2graphobject";
import { circular, profile, simple } from "./testShape";
import { ContextDefinition, fromRDF, compact } from "jsonld";
import { circleData, profileData, simpleData } from "./testData";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parse as turtleParse } from "@frogcat/ttl2jsonld";

/**
 * Name functions
 */
export function iriToName(iri: string): string {
  try {
    const url = new URL(iri);
    if (url.hash) {
      return url.hash.slice(1);
    } else {
      const splitPathname = url.pathname.split("/");
      return splitPathname[splitPathname.length - 1];
    }
  } catch (err) {
    return iri;
  }
}

export function nameFromObject(obj: {
  id?: string;
  annotations?: Annotation[];
}): string | undefined {
  const labelAnnotationObject = obj.annotations?.find(
    (annotation) =>
      annotation.predicate === "http://www.w3.org/2000/01/rdf-schema#label"
  )?.object;
  if (labelAnnotationObject && typeof labelAnnotationObject === "string") {
    return toCamelCase(iriToName(labelAnnotationObject));
  } else if (
    labelAnnotationObject &&
    typeof labelAnnotationObject !== "string"
  ) {
    return toCamelCase(labelAnnotationObject.value);
  } else if (obj.id) {
    return toCamelCase(iriToName(obj.id));
  }
}

export function toCamelCase(text: string) {
  return text
    .replace(/([-_ ]){1,}/g, " ")
    .split(/[-_ ]/)
    .reduce((cur, acc) => {
      return cur + acc[0].toUpperCase() + acc.substring(1);
    });
}

class JsonLdContextBuilder {
  private iriAnnotations: Record<string, Annotation[]> = {};
  private iriTypes: Record<string, string> = {};

  addSubject(iri: string, annotations?: Annotation[]) {
    if (!this.iriAnnotations[iri]) {
      this.iriAnnotations[iri] = [];
    }
    if (annotations && annotations.length > 0) {
      this.iriAnnotations[iri].push(...annotations);
    }
  }

  addPredicate(iri: string, type: string, annotations?: Annotation[]) {
    this.addSubject(iri, annotations);
    this.iriTypes[iri] = type;
  }

  generateNames(): Record<string, string> {
    const generatedNames: Record<string, string> = {};
    const claimedNames: Set<string> = new Set();
    Object.entries(this.iriAnnotations).forEach(([iri, annotations]) => {
      let potentialName: string | undefined;
      if (annotations.length > 0) {
        const labelAnnotationObject = annotations.find(
          (annotation) =>
            annotation.predicate ===
            "http://www.w3.org/2000/01/rdf-schema#label"
        )?.object;
        if (
          labelAnnotationObject &&
          typeof labelAnnotationObject === "string"
        ) {
          potentialName = toCamelCase(iriToName(labelAnnotationObject));
        } else if (
          labelAnnotationObject &&
          typeof labelAnnotationObject !== "string"
        ) {
          potentialName = toCamelCase(labelAnnotationObject.value);
        }
      }
      if (!potentialName) {
        potentialName = toCamelCase(iriToName(iri));
      }
      if (claimedNames.has(potentialName)) {
        let i = 2;
        let newName: string | undefined;
        do {
          if (!claimedNames.has(`${potentialName}${i}`)) {
            newName = `${potentialName}${i}`;
          }
          i++;
        } while (!newName);
        potentialName = newName;
      }
      claimedNames.add(potentialName);
      generatedNames[iri] = potentialName;
    });
    return generatedNames;
  }

  generateJsonldContext(): ContextDefinition {
    const contextDefnition: ContextDefinition = {};
    const namesMap = this.generateNames();
    Object.entries(namesMap).forEach(([iri, name]) => {
      if (this.iriTypes[iri]) {
        contextDefnition[name] = {
          "@id": iri,
          "@type": this.iriTypes[iri],
        };
      } else {
        contextDefnition[name] = iri;
      }
    });

    return contextDefnition;
  }
}

/**
 * Visitor
 */
export const ShexJNameVisitor =
  ShexJTraverser.createVisitor<JsonLdContextBuilder>({
    TripleConstraint: {
      visitor: async (tripleConstraint, context) => {
        if (tripleConstraint.valueExpr) {
          if (typeof tripleConstraint.valueExpr === "string") {
            // TOOD handle string value expr
          } else if (tripleConstraint.valueExpr.type === "NodeConstraint") {
            if (tripleConstraint.valueExpr.datatype) {
              // context.addPredicate(
              //   tripleConstraint.predicate,
              //   tripleConstraint.valueExpr.datatype,
              //   tripleConstraint.annotations
              // );
              context.addSubject(
                tripleConstraint.predicate,
                tripleConstraint.annotations
              );
            } else {
              context.addSubject(
                tripleConstraint.predicate,
                tripleConstraint.annotations
              );
            }
          } else {
            context.addPredicate(
              tripleConstraint.predicate,
              "@id",
              tripleConstraint.annotations
            );
          }
        } else {
          context.addSubject(
            tripleConstraint.predicate,
            tripleConstraint.annotations
          );
        }
      },
    },
    NodeConstraint: {
      visitor: async (nodeConstraint, context) => {
        if (nodeConstraint.values) {
          nodeConstraint.values.forEach((value) => {
            if (typeof value === "string") {
              context.addSubject(value);
            }
          });
        }
      },
    },
    IriStem: {
      visitor: async (iriStem, context) => {
        context.addSubject(iriStem.stem);
      },
    },
  });

async function run() {
  const inputShape = profile;
  const inputData = profileData;

  const jsonldContextBuilder = new JsonLdContextBuilder();
  const input: Schema = (await jsonld2graphobject(
    { "@id": "SCHEMA", ...inputShape },
    "SCHEMA"
  )) as unknown as Schema;
  await ShexJNameVisitor.visit(input, "Schema", jsonldContextBuilder);
  const jsonldContext: ContextDefinition =
    jsonldContextBuilder.generateJsonldContext();
  console.log("JsonLD Context");
  console.log(jsonldContext);
  const expandedJsonld = turtleParse(inputData);
  console.log("JSONLD Step 1 Transformation:");
  console.log(JSON.stringify(expandedJsonld, null, 2));
  const compactedJsonld = await compact(expandedJsonld, jsonldContext);
  console.log("JSONLD Step 2 Transformation:");
  console.log(JSON.stringify(compactedJsonld, null, 2));
}
run();
