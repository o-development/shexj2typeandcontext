import { Traverser, ValidateTraverserTypes } from "./typeTraverser";
import { timeout } from "./typeTraverser/transformerSubTraversers/util/timeout";

interface Parent {
  name: string;
  hasChild: Child;
}

interface Child {
  name: string;
  hasParent: Parent;
}

type SimpleCircleTraverserTypes = ValidateTraverserTypes<{
  Parent: {
    kind: "interface";
    type: Parent;
    properties: {
      hasChild: "Child";
    };
  };
  Child: {
    kind: "interface";
    type: Child;
    properties: {
      hasParent: "Parent";
    };
  };
}>;

const SimpleCircleTraverser = new Traverser<SimpleCircleTraverserTypes>({
  Parent: {
    kind: "interface",
    properties: {
      hasChild: "Child",
    },
  },
  Child: {
    kind: "interface",
    properties: {
      hasParent: "Parent",
    },
  },
});

interface NewParent {
  newName: string;
  newHasChild: NewChild;
}

interface NewChild {
  newName: string;
  newHasParent: NewParent;
}

const SimpleCircleTransformer = SimpleCircleTraverser.createTransformer<{
  Parent: {
    return: NewParent;
  };
  Child: {
    return: NewChild;
  };
}>({
  Parent: {
    transformer: async (parent, getTransformedChildren, setReturnPointer) => {
      const newParent: Partial<NewParent> = {
        newName: parent.name,
      };
      setReturnPointer(newParent as NewParent);
      const transformedChildren = await getTransformedChildren();
      newParent.newHasChild = transformedChildren.hasChild;
      return newParent as NewParent;
      // const transformedChildren = await getTransformedChildren();
      // return {
      //   newName: parent.name,
      //   newHasChild: transformedChildren.hasChild,
      // };
    },
  },
  Child: {
    transformer: async (parent, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return {
        newName: parent.name,
        newHasParent: transformedChildren.hasParent,
      };
    },
  },
});

const SampleParent: Partial<Parent> = {
  name: "Dad",
};
const SampleChild: Child = {
  name: "Son",
  hasParent: SampleParent as Parent,
};
SampleParent.hasChild = SampleChild;

async function run() {
  const result = await SimpleCircleTransformer.transform(
    SampleParent as Parent,
    "Parent",
    undefined
  );
  console.log("Final Result");
  console.log(result);
}
run();
