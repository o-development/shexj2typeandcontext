import { Schema } from "shexj";
import { traverseShex } from "../lib";
import allSchema from "shex-test/schemas/_all.json";

const schema: Schema = allSchema as Schema;

describe("traverseSchema", () => {
  it("Traverses a simple schema and returns the same schema", async () => {
    const resultSchema = await traverseShex(schema, {});
    expect(resultSchema).toEqual(schema);
  });

  it("Traverses a simple schema and executes special items", async () => {
    let numberOfTripleConstraints = 0;
    const result = await traverseShex(schema, {
      async TripleConstraint(tripleConstraint) {
        numberOfTripleConstraints++;
        return tripleConstraint;
      },
    });
    expect(result).toEqual(schema);
    expect(numberOfTripleConstraints).toBe(21);
  });

  it("Traverses a simple schema and makes modifications", async () => {
    const result = await traverseShex<{
      Schema: {
        returns: string;
        properties: {
          startActs: string;
          start: string;
          shapes: string;
        };
      };
      ShapeOr: {
        returns: string;
        properties: {
          shapeExprs: string;
        };
      };
      ShapeAnd: {
        returns: string;
        properties: {
          shapeExprs: string;
        };
      };
      ShapeNot: {
        returns: string;
        properties: {
          shapeExpr: string;
        };
      };
      ShapeExternal: {
        returns: string;
      };
      shapeExpr: {
        returns: string;
      };
    }>(schema, {
      Schema: async (schema, transformedChildren): Promise<string> => {
        return `Schema(${transformedChildren.startActs},${transformedChildren.startActs},${transformedChildren.shapes})`;
      },
      ShapeOr: async (
        shapeOr,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `ShapeOr(${transformedChildren.shapeExprs})`;
      },
      ShapeAnd: async (
        shapeAnd,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `ShapeAnd(${transformedChildren.shapeExprs})`;
      },
      ShapeNot: async (
        shapeNot,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `ShapeNot(${transformedChildren.shapeExpr})`;
      },
      ShapeExternal: async (shapeExternal, parentStack): Promise<string> => {
        return `ShapeExternal`;
      },
      NodeConstraint: async (
        nodeConstraint,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `NodeConstraint(${transformedChildren.values})`;
      },
      ObjectLiteral: async (objectLiteral, parentStack): Promise<string> => {
        return `ObjectLiteral`;
      },
      IriStem: async (iriStem, parentStack): Promise<string> => {
        return `IriStem`;
      },
      IriStemRange: async (
        iriStemRange,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `IriStemRange(${transformedChildren.exclusions})`;
      },
      LiteralStem: async (literalStem, parentStack): Promise<string> => {
        return `LiteralStem`;
      },
      LiteralStemRange: async (
        literalStemRange,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `LiteralStemRange(${transformedChildren.exclusions})`;
      },
      Language: async (language, parentStack): Promise<string> => {
        return `Language`;
      },
      LanguageStem: async (languageStem, parentStack): Promise<string> => {
        return `LanguageStem`;
      },
      LanguageStemRange: async (
        languageStemRange,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `LanguageStemRange(${transformedChildren.exclusions})`;
      },
      Wildcard: async (wildcard, parentStack): Promise<string> => {
        return `Wildcard`;
      },
      Shape: async (
        shape,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `Shape(${transformedChildren.expression},${transformedChildren.semActs},${transformedChildren.annotations})`;
      },
      EachOf: async (
        eachOf,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `EachOf(${transformedChildren.expressions},${transformedChildren.semActs},${transformedChildren.annotations})`;
      },
      OneOf: async (
        eachOf,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `OneOf(${transformedChildren.expressions},${transformedChildren.semActs},${transformedChildren.annotations})`;
      },
      TripleConstraint: async (
        tripleConstraint,
        transformedChildren,
        parentStack
      ): Promise<string> => {
        return `TripleConstraint(${transformedChildren.valueExpr},${transformedChildren.semActs},${transformedChildren.annotations})`;
      },
      SemAct: async (wildcard, parentStack): Promise<string> => {
        return `SemAct`;
      },
      Annotation: async (wildcard, parentStack): Promise<string> => {
        return `Annotation`;
      },
      shapeExpr: async (
        shapeExpr,
        transformedSelf,
        parentStack
      ): Promise<string> => {
        return `shapeExpr(${transformedSelf})`;
      },
      valueSetValue: async (
        valueSetValue,
        transformedSelf,
        parentStack
      ): Promise<string> => {
        return `valueSetValue(${transformedSelf})`;
      },
      tripleExpr: async (
        tripleExpr,
        transformedSelf,
        parentStack
      ): Promise<string> => {
        return `tripleExpr(${transformedSelf})`;
      },
      Schema_startActs: async (
        semActs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `Schema_startActs(${transformed})`;
      },
      Schema_start: async (
        shapeExpr,
        transformed,
        parentStack
      ): Promise<string> => {
        return `Schema_start(${transformed})`;
      },
      Schema_shapes: async (
        shapes,
        transformed,
        parentStack
      ): Promise<string> => {
        return `Schema_shapes(${transformed})`;
      },
      ShapeOr_shapeExprs: async (
        shapeExprs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `ShapeOr_shapeExprs(${transformed})`;
      },
      ShapeAnd_shapeExprs: async (
        shapeExprs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `ShapeAnd_shapeExprs(${transformed})`;
      },
      ShapeNot_shapeExpr: async (
        shapeExpr,
        transformed,
        parentStack
      ): Promise<string> => {
        return `ShapeNot_shapeExpr(${transformed})`;
      },
      NodeConstraint_values: async (
        values,
        transformed,
        parentStack
      ): Promise<string> => {
        return `NodeConstraint_values(${transformed})`;
      },
      IriStemRange_exclusions: async (
        exclusions,
        transformed,
        parentStack
      ): Promise<string> => {
        return `IriStemRange_exclusions(${transformed})`;
      },
      LiteralStemRange_exclusions: async (
        exclusions,
        transformed,
        parentStack
      ): Promise<string> => {
        return `LiteralStemRange_exclusions(${transformed})`;
      },
      LanguageStemRange_exclusions: async (
        exclusions,
        transformed,
        parentStack
      ): Promise<string> => {
        return `LanguageStemRange_exclusions(${transformed})`;
      },
      Shape_expression: async (
        expression,
        transformed,
        parentStack
      ): Promise<string> => {
        return `Shape_expression(${transformed})`;
      },
      Shape_semActs: async (
        semActs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `Shape_semActs(${transformed})`;
      },
      Shape_Annotations: async (
        annotations,
        transformed,
        parentStack
      ): Promise<string> => {
        return `Shape_Annotations(${transformed})`;
      },
      EachOf_expressions: async (
        expressions,
        transformed,
        parentStack
      ): Promise<string> => {
        return `EachOf_expressions(${transformed})`;
      },
      EachOf_semActs: async (
        semActs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `EachOf_semActs(${transformed})`;
      },
      EachOf_Annotations: async (
        annotations,
        transformed,
        parentStack
      ): Promise<string> => {
        return `EachOf_Annotations(${transformed})`;
      },
      OneOf_expressions: async (
        expressions,
        transformed,
        parentStack
      ): Promise<string> => {
        return `OneOf_expressions(${transformed})`;
      },
      OneOf_semActs: async (
        semActs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `OneOf_semActs(${transformed})`;
      },
      OneOf_Annotations: async (
        annotations,
        transformed,
        parentStack
      ): Promise<string> => {
        return `OneOf_Annotations(${transformed})`;
      },
      TripleConstraint_valueExpr: async (
        valueExpr,
        transformed,
        parentStack
      ): Promise<string> => {
        return `TripleConstraint_valueExpr(${transformed})`;
      },
      TripleConstraint_semActs: async (
        semActs,
        transformed,
        parentStack
      ): Promise<string> => {
        return `TripleConstraint_valueExpr(${transformed})`;
      },
      TripleConstraint_Annotations: async (
        annotations,
        transformed,
        parentStack
      ): Promise<string> => {
        return `TripleConstraint_Annotations(${transformed})`;
      },
    });
    expect(result).toBe(
      `Schema(Schema_startActs(SemAct,SemAct),Schema_startActs(SemAct,SemAct),Schema_shapes(shapeExpr(Shape(Shape_expression(tripleExpr(EachOf(EachOf_expressions(tripleExpr(TripleConstraint(undefined,undefined,undefined)),tripleExpr(TripleConstraint(undefined,undefined,undefined)),tripleExpr(TripleConstraint(undefined,undefined,undefined))),undefined,undefined))),undefined,undefined)),shapeExpr(Shape(Shape_expression(tripleExpr(EachOf(EachOf_expressions(tripleExpr(TripleConstraint(undefined,undefined,undefined)),tripleExpr(TripleConstraint(undefined,undefined,undefined)),tripleExpr(TripleConstraint(undefined,undefined,undefined))),undefined,undefined))),undefined,undefined)),shapeExpr(NodeConstraint(undefined)),shapeExpr(ShapeAnd(ShapeAnd_shapeExprs(shapeExpr(NodeConstraint(NodeConstraint_values(valueSetValue(http://a.example/a1),valueSetValue(IriStemRange(IriStemRange_exclusions(IriStem,http://all.example/b)))))),shapeExpr(NodeConstraint(undefined))))),shapeExpr(Shape(Shape_expression(tripleExpr(EachOf(EachOf_expressions(tripleExpr(http://all.example/S1e),tripleExpr(TripleConstraint(undefined,undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(undefined))),undefined,undefined)),tripleExpr(OneOf(OneOf_expressions(tripleExpr(EachOf(EachOf_expressions(tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(undefined))),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(undefined))),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(http://all.example/S5)),undefined,undefined))),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(ShapeAnd(ShapeAnd_shapeExprs(shapeExpr(NodeConstraint(undefined)),shapeExpr(http://all.example/S5))))),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(ShapeOr(ShapeOr_shapeExprs(shapeExpr(ShapeAnd(ShapeAnd_shapeExprs(shapeExpr(NodeConstraint(undefined)),shapeExpr(http://all.example/S5)))),shapeExpr(ShapeAnd(ShapeAnd_shapeExprs(shapeExpr(NodeConstraint(undefined)),shapeExpr(http://all.example/S5)))))))),undefined,undefined)),tripleExpr(EachOf(EachOf_expressions(tripleExpr(OneOf(OneOf_expressions(tripleExpr(EachOf(EachOf_expressions(tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(Shape(Shape_expression(tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(NodeConstraint_values(valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(http://all.example/),valueSetValue(http://all.example/val1),valueSetValue(http://all.example/),valueSetValue(scheme:!$%25&amp;'()*+,-./0123456789:/@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~?#),valueSetValue(http://a.example/p1),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral),valueSetValue(ObjectLiteral))))),undefined,undefined))),undefined,undefined))),TripleConstraint_valueExpr(SemAct),undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(undefined))),TripleConstraint_valueExpr(SemAct),TripleConstraint_Annotations(Annotation,Annotation,Annotation)))),undefined,undefined)),tripleExpr(EachOf(EachOf_expressions(tripleExpr(TripleConstraint(undefined,TripleConstraint_valueExpr(SemAct),undefined)),tripleExpr(TripleConstraint(undefined,TripleConstraint_valueExpr(SemAct),undefined))),undefined,undefined))),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(undefined))),undefined,undefined))),undefined,undefined))),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(http://all.example/vs1)),undefined,undefined)),tripleExpr(TripleConstraint(TripleConstraint_valueExpr(shapeExpr(NodeConstraint(NodeConstraint_values(valueSetValue(IriStemRange(IriStemRange_exclusions(IriStem,http://all.example/b))))))),TripleConstraint_valueExpr(SemAct,SemAct),undefined))),undefined,undefined))),undefined,undefined)),shapeExpr(NodeConstraint(undefined)),shapeExpr(Shape(Shape_expression(tripleExpr(EachOf(EachOf_expressions(tripleExpr(http://all.example/S1e),tripleExpr(http://all.example/S2e)),undefined,undefined))),undefined,undefined)),shapeExpr(Shape(Shape_expression(tripleExpr(_:a·̀ͯ‿.⁀e)),undefined,undefined))))`
    );
  });
});
