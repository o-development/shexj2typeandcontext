import { Schema } from "shexj";

export interface TestData {
  name: string;
  shexj: Schema;
  sampleTurtle: string;
  baseNode: string;
}

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
};

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
              valueExpr: "http://example.com/Child",
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
              valueExpr: "http://example.com/Parent",
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
};

/**
 * Profile
 */
export const profile: TestData = {
  name: "profile",
  shexj: {
    type: "Schema",
    shapes: [
      {
        type: "Shape",
        id: "https://shaperepo.com/schemas/solidProfile#AddressShape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#country-name",
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
                    value: "The name of the user's country of residence",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#locality",
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
                    value:
                      "The name of the user's locality (City, Town etc.) of residence",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#postal-code",
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
                    value: "The user's postal code",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#region",
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
                    value:
                      "The name of the user's region (State, Province etc.) of residence",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#street-address",
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
                    value: "The user's street address",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        type: "Shape",
        id: "https://shaperepo.com/schemas/solidProfile#EmailShape",
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
      {
        type: "Shape",
        id: "https://shaperepo.com/schemas/solidProfile#PhoneNumberShape",
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
                    value: "They type of Phone Number",
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
                      "The value of a phone number as a tel link (Example <tel:555-555-5555>)",
                  },
                },
              ],
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
      {
        type: "Shape",
        id: "https://shaperepo.com/schemas/solidProfile#RSAPublicKeyShape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/auth/cert#modulus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "RSA Modulus",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/auth/cert#exponent",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "RSA Exponent",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        type: "Shape",
        id: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
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
                    value: "Defines the node as a Person (from Schema.org)",
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
                    value: "Defines the node as a Person (from foaf)",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#fn",
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
                    value:
                      "The formatted name of a person. Example: John Smith",
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
                    value: "An alternate way to define a person's name.",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#hasAddress",
              valueExpr:
                "https://shaperepo.com/schemas/solidProfile#AddressShape",
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The person's street address.",
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
              predicate: "http://www.w3.org/2006/vcard/ns#hasPhoto",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "A link to the person's photo",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/img",
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
                    value: "Photo link but in string form",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#hasTelephone",
              valueExpr:
                "https://shaperepo.com/schemas/solidProfile#PhoneNumberShape",
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "Person's telephone number",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#phone",
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
                    value:
                      "An alternative way to define a person's telephone number using a string",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#organization-name",
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
                    value:
                      "The name of the organization with which the person is affiliated",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#role",
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
                    value:
                      "The name of the person's role in their organization",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/auth/acl#trustedApp",
              valueExpr:
                "https://shaperepo.com/schemas/solidProfile#TrustedAppShape",
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "A list of app origins that are trusted by this user",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/auth/cert#key",
              valueExpr:
                "https://shaperepo.com/schemas/solidProfile#RSAPublicKeyShape",
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "A list of RSA public keys that are associated with private keys the user holds.",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/ldp#inbox",
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
                      "The user's LDP inbox to which apps can post notifications",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/pim/space#preferencesFile",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The user's preferences",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/pim/space#storage",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "The location of a Solid storage server related to this WebId",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#account",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The user's account",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#privateTypeIndex",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "A registry of all types used on the user's Pod (for private access only)",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#publicTypeIndex",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "A registry of all types used on the user's Pod (for public access)",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/knows",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value:
                      "A list of WebIds for all the people this user knows.",
                  },
                },
              ],
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
      {
        type: "Shape",
        id: "https://shaperepo.com/schemas/solidProfile#TrustedAppShape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/auth/acl#mode",
              valueExpr: {
                type: "NodeConstraint",
                values: [
                  "http://www.w3.org/ns/auth/acl#Append",
                  "http://www.w3.org/ns/auth/acl#Control",
                  "http://www.w3.org/ns/auth/acl#Read",
                  "http://www.w3.org/ns/auth/acl#Write",
                ],
              },
              min: 1,
              max: -1,
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The level of access provided to this origin",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/auth/acl#origin",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "The app origin the user trusts",
                  },
                },
              ],
            },
          ],
        },
      },
    ],
    "@context": "http://www.w3.org/ns/shex.jsonld",
  },
  sampleTurtle: `
    @base <https://jackson.solidcommunity.net/profile/card#me> .
    @prefix : <#>.
    @prefix acl: <http://www.w3.org/ns/auth/acl#>.
    @prefix cert: <http://www.w3.org/ns/auth/cert#>.
    @prefix foaf: <http://xmlns.com/foaf/0.1/>.
    @prefix ldp: <http://www.w3.org/ns/ldp#>.
    @prefix meeting: <http://www.w3.org/ns/pim/meeting#>.
    @prefix schema: <http://schema.org/>.
    @prefix solid: <http://www.w3.org/ns/solid/terms#>.
    @prefix space: <http://www.w3.org/ns/pim/space#>.
    @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.
    @prefix wf: <http://www.w3.org/2005/01/wf/flow#>.
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
    @prefix pub: <https://jackson.dev.inrupt.net/public/>.
    @prefix c: <https://jackson.dev.inrupt.net/profile/card#>.
    @prefix pro: <./>.
    @prefix inbox: </inbox/>.
    @prefix j: </>.
    @prefix c0: <https://kellyo.inrupt.net/profile/card#>.
    @prefix c1: <https://michielbdejong.inrupt.net/profile/card#>.
    @prefix c2: <https://mitzilaszlo.solid.community/profile/card#>.
    @prefix c3: <https://rowanjacobs.solid.community/profile/card#>.
    @prefix c4: <https://rubeniswc.inrupt.net/profile/card#>.
    @prefix c5: <https://solid.zwifi.eu/profile/card#>.
    @prefix c6: <https://timbl-2018-demo.solid.community/profile/card#>.
    @prefix c7: <https://timbl.solid.community/profile/card#>.
    @prefix pu: </public/>.
    @prefix c8: <https://otherjackson.solid.community/profile/card#>.
    @prefix publ: <https://michielbdejong.inrupt.net/public/>.
    @prefix loc: <http://localhost:3000/>.
    @prefix sol: <https://solidcommunity.net/>.
    @prefix n0: <https://>.
    @prefix n1: <file://>.
    
    pub:fd2af717 a meeting:LongChat; wf:participant c:me.
    
    pro:card a foaf:PersonalProfileDocument; foaf:maker :me; foaf:primaryTopic :me.
    
    :id1538406374276 a vcard:Postal; vcard:value <mailto:jackson@o.team>.
    
    :id1538406392561 a vcard:Home; vcard:value <tel:6786999704>.
    
    :id1555189453000
        vcard:country-name "United States";
        vcard:locality "Alpharetta";
        vcard:postal-code "30022";
        vcard:region "GA";
        vcard:street-address "610 Varina Way".
    :me
        a schema:Person, foaf:Person;
        vcard:fn "Jackson Morgan";
        vcard:hasAddress :id1555189453000;
        vcard:hasEmail :id1538406374276;
        vcard:hasPhoto <_1564002423000_.jpeg>;
        vcard:hasTelephone :id1538406392561;
        vcard:organization-name "O";
        vcard:phone "6786999704";
        vcard:role "Software";
        acl:trustedApp
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin n1:
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://example.org>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:14001>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:19006>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:3001>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:3101>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:5000>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:9000>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <http://localhost:9080>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://api.chat.o.team>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://api.liqid.chat>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://devapi.liqid.chat>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://develop.generator.inrupt.com>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://jackson.localhost:8443>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://jackson2.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://liqidchat.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://localhost:8443>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://localhost:9000>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin n0:localhost
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://melvincarvalho.github.io>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://noeldemartin.github.io>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://podbrowser.inrupt.com>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://scenaristeur.github.io>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://solid.github.io>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://solidarity.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://timbl.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Control, acl:Read, acl:Write;
                    acl:origin <https://uvdsl.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <http://edit.o.team>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <http://localhost:3000>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <http://localhost:8606>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://datasister.5apps.com>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://edit.o.team>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://jackson.dev.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://solidos.solid.community>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://team.inrupt.net>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://timbl.com>
                ],
                [
                    acl:mode acl:Append, acl:Read, acl:Write;
                    acl:origin <https://vinnl.github.io>
                ];
        cert:key
                [
                    a cert:RSAPublicKey;
                    cert:exponent 65537;
                    cert:modulus
                        "AB564BF3F36A712A6D17CE87EE49185D802DAF82313C925D51E82ED618200CFDF1542717F41A6D39C01726967A40A170547B050540A089B61A4143DBD4E360EBAC6F086F37A40CDAE61F33AE2181A187B3BE861D9ABF8A439532D0B4DAAB83686508CFB88627F77A8F0D117231521AE095334B28CAEC8FD2928C8A29CB15C38C27DA8B9426478BFB00CED71FB1904C9B0D27E2C4FF9F37882A917BD54957D4D9215E3625B8E195CCF2E8B18A528F9E4D1A19E525AF54CDB0804599DA9786D210AA04821977C7AF8F9C03BA1094F695A19F3C4B52DE9FC11ED14616559FC1DE0C610FBDC0F0DE5D817C417A4A5E6AC3FCD1C7B3F6B574BAFBD36E4B23164CE7D9"^^xsd:hexBinary
                ];
        ldp:inbox inbox:;
        space:preferencesFile </settings/prefs.ttl>;
        space:storage j:;
        solid:account j:;
        solid:oidcIssuer loc:, sol:;
        solid:oidcIssuerRegistrationToken "gx2hvELxRw5nYeBQMtdKm";
        solid:privateTypeIndex </settings/privateTypeIndex.ttl>;
        solid:publicTypeIndex
        <publicTypeIndex.ttl>, </settings/publicTypeIndex.ttl>;
        foaf:img
        "https://jackson.solid.community/profile/JacksonProfile_1555190418000_.png";
        foaf:knows pro:card, c0:me, c1:me, c2:me, c3:me, c4:me, c5:me, c6:me, c7:me;
        foaf:name "Jackson".
    pu:d3149ef5 a meeting:LongChat; wf:participant c8:me.
    
    publ:ab34c8d2 a meeting:LongChat; wf:participant c1:me, c2:me.
  `,
  baseNode: "https://jackson.solidcommunity.net/profile/card#me",
};

export const testData: TestData[] = [simple, circular, profile];
