import ShexJTraverser from "./shexJTraverser";
import kitchenSinkSchema from "shex-test/schemas/kitchenSink.json";
import { jsonld2graphobject } from "jsonld2graphobject";
import { circular, profile, simple } from "./testShape";

console.time("a");
export const ShexJTypeTransformer = ShexJTraverser.createTransformer<{
  Schema: {
    return: string;
    properties: {
      startActs: number;
      shapes: number;
    };
  };
  shapeExprs: {
    return: string;
  };
  ShapeOr: {
    return: string;
    properties: {
      shapeExprs: string;
    };
  };
  ShapeAnd: {
    return: string;
    properties: {
      shapeExprs: string;
    };
  };
  ShapeNot: {
    return: string;
    properties: {
      shapeExpr: string;
    };
  };
  ShapeExternal: {
    return: string;
  };
  NodeConstraint: {
    return: string;
    properties: {
      values: string;
    };
  };
  valueSetValue: {
    return: string;
  };
  ObjectLiteral: {
    return: string;
  };
  IriStem: {
    return: string;
  };
  IriStemRange: {
    return: string;
    properties: {
      exclusions: string;
    };
  };
  LiteralStem: {
    return: string;
  };
  LiteralStemRange: {
    return: string;
    properties: {
      exclusions: string;
    };
  };
  Language: {
    return: string;
  };
  LanguageStem: {
    return: string;
  };
  LanguageStemRange: {
    return: string;
    properties: {
      exclusions: string;
    };
  };
  Wildcard: {
    return: string;
  };
  Shape: {
    return: string;
    properties: {
      expression: string;
      semActs: string;
      annotations: string;
    };
  };
  tripleExpr: {
    return: string;
  };
  EachOf: {
    return: string;
    properties: {
      expressions: string;
      semActs: string;
      annotations: string;
    };
  };
  OneOf: {
    return: string;
    properties: {
      expressions: string;
      semActs: string;
      annotations: string;
    };
  };
  TripleConstraint: {
    return: string;
    properties: {
      valueExpr: string;
      semActs: string;
      annotations: string;
    };
  };
  SemAct: {
    return: string;
  };
  Annotation: {
    return: string;
  };
}>({
  Schema: {
    transformer: async (schema, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `Schema(startActs:${transformedChildren.startActs},start:${transformedChildren.start},shapes:${transformedChildren.shapes})`;
    },
  },
  shapeExpr: async (shapeExpression, getTransformedChildren) => {
    const transformedChildren = await getTransformedChildren();
    return `shapeExpr(${transformedChildren})`;
  },
  ShapeOr: {
    transformer: async (shapeOr, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `ShapeOr(shapeExprs:${transformedChildren.shapeExprs})`;
    },
  },
  ShapeAnd: {
    transformer: async (shapeAnd, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `ShapeAnd(shapeExprs:${transformedChildren.shapeExprs})`;
    },
  },
  ShapeNot: {
    transformer: async (shapeNot, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `ShapeNot(shapeExpr:${transformedChildren.shapeExpr})`;
    },
  },
  ShapeExternal: {
    transformer: async () => {
      return `ShapeExternal()`;
    },
  },
  NodeConstraint: {
    transformer: async (nodeConstraint, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `NodeConstraint(values:${transformedChildren.values})`;
    },
  },
  valueSetValue: async (valueSetVal, getTransformedChildren) => {
    const transformedChildren = await getTransformedChildren();
    return `valueSetValue(${transformedChildren})`;
  },
  ObjectLiteral: {
    transformer: async () => {
      return `ObjectLiteral()`;
    },
  },
  IriStem: {
    transformer: async () => {
      return `IriStem()`;
    },
  },
  IriStemRange: {
    transformer: async (iriStemRange, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `IriStemRange(exclusions:${transformedChildren.exclusions})`;
    },
  },
  LiteralStem: {
    transformer: async () => {
      return `LiteralStem()`;
    },
  },
  LiteralStemRange: {
    transformer: async (literalStemRange, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `LiteralStemRange(exclusions:${transformedChildren.exclusions})`;
    },
  },
  Language: {
    transformer: async () => {
      return `Language()`;
    },
  },
  LanguageStem: {
    transformer: async () => {
      return `LanguageStem()`;
    },
  },
  LanguageStemRange: {
    transformer: async (languageStemRange, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `LanguageStemRange(exclusions:${transformedChildren.exclusions})`;
    },
  },
  Wildcard: {
    transformer: async () => {
      return `Wildcard()`;
    },
  },
  Shape: {
    transformer: async (shape, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `Shape(expression:${transformedChildren.expression},annotations:${transformedChildren.annotations},semActs:${transformedChildren.semActs})`;
    },
  },
  tripleExpr: async (tripleExpr, getTransformedChildren) => {
    const transformedChildren = await getTransformedChildren();
    return `tripleExpr(${transformedChildren})`;
  },
  EachOf: {
    transformer: async (eachOf, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `EachOf(expressions:${transformedChildren.expressions},annotations:${transformedChildren.annotations},semActs:${transformedChildren.semActs})`;
    },
  },
  OneOf: {
    transformer: async (eachOf, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `OneOf(expressions:${transformedChildren.expressions},annotations:${transformedChildren.annotations},semActs:${transformedChildren.semActs})`;
    },
  },
  TripleConstraint: {
    transformer: async (tripleConstraint, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return `TripleConstraint(valueExpr:${transformedChildren.valueExpr},annotations:${transformedChildren.annotations},semActs:${transformedChildren.semActs})`;
    },
  },
  SemAct: {
    transformer: async () => {
      return `SemAct()`;
    },
  },
  Annotation: {
    transformer: async () => {
      return `Annotation()`;
    },
  },
});

async function run() {
  const result = await ShexJTypeTransformer.transform(
    await jsonld2graphobject({ "@id": "SCHEMA", ...circular }, "SCHEMA"),
    "Schema",
    undefined
  );
  console.log("Final Result");
  console.log(result);
  console.timeEnd("a");
}
run();
