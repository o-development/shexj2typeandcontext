import { TestData } from "./testData";

/**
 * SIMPLE
 */
export const simple: TestData = {
  name: "simple",
  shexj: {
    type: "Schema",
    shapes: [
      {
        type: "Shape",
        id: "http://shex.io/webapps/shex.js/doc/EmployeeShape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/givenName",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 1,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/familyName",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/phone",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/mbox",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
            },
          ],
        },
      },
    ],
    "@context": "http://www.w3.org/ns/shex.jsonld",
  },
  sampleTurtle: `
    @prefix foaf: <http://xmlns.com/foaf/0.1/> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    <http://a.example/Employee7>
      foaf:givenName  "Robert"^^xsd:string, "Taylor"^^xsd:string ;
      foaf:familyName "Johnson"^^xsd:string ;
      # no phone number needed
      foaf:mbox       <mailto:rtj@example.com>
      .
  `,
  baseNode: "http://a.example/Employee7",
  successfulContext: {
    givenName: {
      "@id": "http://xmlns.com/foaf/0.1/givenName",
      "@type": "http://www.w3.org/2001/XMLSchema#string",
      "@container": "@set",
    },
    familyName: {
      "@id": "http://xmlns.com/foaf/0.1/familyName",
      "@type": "http://www.w3.org/2001/XMLSchema#string",
    },
    phone: {
      "@id": "http://xmlns.com/foaf/0.1/phone",
      "@container": "@set",
    },
    mbox: {
      "@id": "http://xmlns.com/foaf/0.1/mbox",
    },
  },
  successfulTypings:
    'import {ContextDefinition} from "jsonld"\n\nexport interface EmployeeShape {\n    "@id"?: string;\r\n    "@context"?: ContextDefinition;\r\n    givenName: string[];\r\n    familyName: string;\r\n    phone?: string[];\r\n    mbox: string;\r\n}\r\n\r\n',
};
