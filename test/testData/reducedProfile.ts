import { TestData } from "./testData";

/**
 * Reduced Profile
 */
export const reducedProfile: TestData = {
  name: "reduced profile",
  shexj: {
    type: "Schema",
    shapes: [
      {
        id: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["http://schema.org/Person"],
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "Defines the node as a Person",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["http://xmlns.com/foaf/0.1/Person"],
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "Defines the node as a Person",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#hasEmail",
              valueExpr:
                "https://shaperepo.com/schemas/solidProfile#EmailShape",
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The person's email.",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/name",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "An alternate way to define a person's name",
                  },
                },
              ],
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
      {
        id: "https://shaperepo.com/schemas/solidProfile#EmailShape",
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: [
                  "http://www.w3.org/2006/vcard/ns#Dom",
                  "http://www.w3.org/2006/vcard/ns#Home",
                  "http://www.w3.org/2006/vcard/ns#ISDN",
                  "http://www.w3.org/2006/vcard/ns#Internet",
                  "http://www.w3.org/2006/vcard/ns#Intl",
                  "http://www.w3.org/2006/vcard/ns#Label",
                  "http://www.w3.org/2006/vcard/ns#Parcel",
                  "http://www.w3.org/2006/vcard/ns#Postal",
                  "http://www.w3.org/2006/vcard/ns#Pref",
                  "http://www.w3.org/2006/vcard/ns#Work",
                  "http://www.w3.org/2006/vcard/ns#X400",
                ],
              },
              min: 0,
              max: 1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The type of email.",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#value",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "The value of an email as a mailto link (Example <mailto:jane@example.com>)",
                  },
                },
              ],
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    ],
    "@context": "http://www.w3.org/ns/shex.jsonld",
  },
  sampleTurtle: ``,
  baseNode: "",
  successfulContext: {
    type: { "@id": "@type", "@container": "@set" },
    Person: "http://schema.org/Person",
    Person2: "http://xmlns.com/foaf/0.1/Person",
    hasEmail: {
      "@id": "http://www.w3.org/2006/vcard/ns#hasEmail",
      "@type": "@id",
      "@container": "@set",
    },
    Dom: "http://www.w3.org/2006/vcard/ns#Dom",
    Home: "http://www.w3.org/2006/vcard/ns#Home",
    ISDN: "http://www.w3.org/2006/vcard/ns#ISDN",
    Internet: "http://www.w3.org/2006/vcard/ns#Internet",
    Intl: "http://www.w3.org/2006/vcard/ns#Intl",
    Label: "http://www.w3.org/2006/vcard/ns#Label",
    Parcel: "http://www.w3.org/2006/vcard/ns#Parcel",
    Postal: "http://www.w3.org/2006/vcard/ns#Postal",
    Pref: "http://www.w3.org/2006/vcard/ns#Pref",
    Work: "http://www.w3.org/2006/vcard/ns#Work",
    X400: "http://www.w3.org/2006/vcard/ns#X400",
    value: { "@id": "http://www.w3.org/2006/vcard/ns#value" },
    name: {
      "@id": "http://xmlns.com/foaf/0.1/name",
      "@type": "http://www.w3.org/2001/XMLSchema#string",
    },
  },
  successfulTypings: `import {ContextDefinition} from \"jsonld\"\n\nexport interface SolidProfileShape {\n    \"@id\"?: string;\r\n    \"@context\"?: ContextDefinition;\r\n    /**\r\n     * Defines the node as a Person | Defines the node as a Person\r\n     */\r\n    type: (\"Person\" | \"Person2\")[];\r\n    /**\r\n     * The person's email.\r\n     */\r\n    hasEmail?: (EmailShape)[];\r\n    /**\r\n     * An alternate way to define a person's name\r\n     */\r\n    name?: string;\r\n}\r\n\r\nexport interface EmailShape {\n    \"@id\"?: string;\r\n    \"@context\"?: ContextDefinition;\r\n    /**\r\n     * The type of email.\r\n     */\r\n    type?: \"Dom\" | \"Home\" | \"ISDN\" | \"Internet\" | \"Intl\" | \"Label\" | \"Parcel\" | \"Postal\" | \"Pref\" | \"Work\" | \"X400\";\r\n    /**\r\n     * The value of an email as a mailto link (Example <mailto:jane@example.com>)\r\n     */\r\n    value: {\r\n        \"@id\": string;\r\n    };\r\n}\r\n\r\n`,
};
