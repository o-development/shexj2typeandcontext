import ShexJTraverser from "./shexJTraverser";
import { Annotation, Schema } from "shexj";

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

class IriNameStore {
  private iriAnnotations: Record<string, Annotation[]> = {};

  add(iri: string, annotations?: Annotation[]) {
    if (!this.iriAnnotations[iri]) {
      this.iriAnnotations[iri] = [];
    }
    if (annotations && annotations.length > 0) {
      this.iriAnnotations[iri].push(...annotations);
    }
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
}

/**
 * Visitor
 */
type NameVisitorContext = {
  iriNameStore: IriNameStore;
};

export const ShexJNameVisitor =
  ShexJTraverser.createVisitor<NameVisitorContext>({
    TripleConstraint: {
      visitor: async (tripleConstraint, context) => {
        context.iriNameStore.add(
          tripleConstraint.predicate,
          tripleConstraint.annotations
        );
      },
    },
    NodeConstraint: {
      visitor: async (nodeConstraint, context) => {
        if (nodeConstraint.values) {
          nodeConstraint.values.forEach((value) => {
            if (typeof value === "string") {
              context.iriNameStore.add(value);
            }
          });
        }
      },
    },
    IriStem: {
      visitor: async (iriStem, context) => {
        context.iriNameStore.add(iriStem.stem);
      },
    },
  });

export async function createIriNames(
  input: Schema
): Promise<Record<string, string>> {
  const context = {
    iriNameStore: new IriNameStore(),
  };
  await ShexJNameVisitor.visit(input, "Schema", context);
  return context.iriNameStore.generateNames();
}
