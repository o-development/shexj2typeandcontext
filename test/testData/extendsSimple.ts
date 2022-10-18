import { TestData } from "./testData";

/**
 * Circular
 */
export const extendsSimple: TestData = {
  name: "extends simple",
  shexc: `
  PREFIX ex: <https://example.com/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>

  ex:EntityShape {
    ex:entityId .
  }

  ex:PersonShape EXTENDS @ex:EntityShape {
    foaf:name .
  }

  ex:EmployeeShape EXTENDS @ex:PersonShape {
    ex:employeeNumber .
  }
  `,
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
    entityId: "https://example.com/entityId",
    name: "http://xmlns.com/foaf/0.1/name",
    employeeNumber: "https://example.com/employeeNumber",
  },
  successfulTypings:
    'import {ContextDefinition} from "jsonld"\n\nexport interface ParentShape {\n    "@id"?: string;\r\n    "@context"?: ContextDefinition;\r\n    type?: {\r\n        "@id": "Parent";\r\n    };\r\n    hasChild: ChildShape;\r\n}\r\n\r\nexport interface ChildShape {\n    "@id"?: string;\r\n    "@context"?: ContextDefinition;\r\n    type?: {\r\n        "@id": "Child";\r\n    };\r\n    hasParent: ParentShape;\r\n}\r\n\r\n',
};
