import ShexJTraverser from "shexj-traverser";
import { JsonLdContextBuilder } from "./JsonLdContextBuilder";

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
