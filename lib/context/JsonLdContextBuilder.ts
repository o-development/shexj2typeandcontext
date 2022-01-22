import { Annotation } from "shexj";
import { ContextDefinition } from "jsonld";

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

/**
 * JsonLd Context Builder
 */
export class JsonLdContextBuilder {
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
