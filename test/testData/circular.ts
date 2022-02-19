import { TestData } from "./testData";

/**
 * Circular
 */
export const circular: TestData = {
  name: "circular",
  shexj: {
    "@context": "http://www.w3.org/ns/shex.jsonld",
    type: "Schema",
    shapes: [
      {
        id: "http://example.com/ParentShape",
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["http://example.com/Parent"],
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://example.com/hasChild",
              valueExpr: "http://example.com/ChildShape",
            },
          ],
        },
      },
      {
        id: "http://example.com/ChildShape",
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["http://example.com/Child"],
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://example.com/hasParent",
              valueExpr: "http://example.com/ParentShape",
            },
          ],
        },
      },
    ],
  },
  sampleTurtle: `
    @prefix example: <http://example.com/> .

    example:SampleParent
      a example:Parent ;
      example:hasChild example:SampleChild .

    example:SampleChild
      a example:Child ;
      example:hasParent example:SampleParent .
  `,
  baseNode: "http://example.com/SampleParent",
  successfulContext: {
    type: { "@id": "@type", "@container": "@set" },
    Parent: "http://example.com/Parent",
    hasChild: { "@id": "http://example.com/hasChild", "@type": "@id" },
    Child: "http://example.com/Child",
    hasParent: { "@id": "http://example.com/hasParent", "@type": "@id" },
  },
  successfulTypings:
    'import {ContextDefinition} from "jsonld"\n\nexport interface ParentShape {\n    "@id"?: string;\r\n    "@context"?: ContextDefinition;\r\n    type?: "Parent";\r\n    hasChild: ChildShape;\r\n}\r\n\r\nexport interface ChildShape {\n    "@id"?: string;\r\n    "@context"?: ContextDefinition;\r\n    type?: "Child";\r\n    hasParent: ParentShape;\r\n}\r\n\r\n',
};
