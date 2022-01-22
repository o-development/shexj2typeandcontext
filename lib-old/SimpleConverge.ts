import { Traverser, ValidateTraverserTypes } from "./typeTraverser";

interface Student {
  name: string;
  hasLecture: Lecture;
  hasTeacher: Teacher;
}

interface Lecture {
  name: string;
  hasTeacher: Teacher;
}

interface Teacher {
  name: string;
}

type SimpleCircleTraverserTypes = ValidateTraverserTypes<{
  Student: {
    kind: "interface";
    type: Student;
    properties: {
      hasTeacher: "Teacher";
      hasLecture: "Lecture";
    };
  };
  Lecture: {
    kind: "interface";
    type: Lecture;
    properties: {
      hasTeacher: "Teacher";
    };
  };
  Teacher: {
    kind: "interface";
    type: Teacher;
    properties: Record<string, never>;
  };
}>;

const SimpleConvergeTraverser = new Traverser<SimpleCircleTraverserTypes>({
  Student: {
    kind: "interface",
    properties: {
      hasTeacher: "Teacher",
      hasLecture: "Lecture",
    },
  },
  Lecture: {
    kind: "interface",
    properties: {
      hasTeacher: "Teacher",
    },
  },
  Teacher: {
    kind: "interface",
    properties: {},
  },
});

interface NewStudent {
  newName: string;
  newHasLecture: NewLecture;
  newHasTeacher: NewTeacher;
}

interface NewLecture {
  newName: string;
  newHasTeacher: NewTeacher;
}

interface NewTeacher {
  newName: string;
}

const SimpleConvergeTransformer = SimpleConvergeTraverser.createTransformer<{
  Student: {
    return: NewStudent;
  };
  Lecture: {
    return: NewLecture;
  };
  Teacher: {
    return: NewTeacher;
  };
}>({
  Student: {
    transformer: async (student, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return {
        newName: student.name,
        newHasLecture: transformedChildren.hasLecture,
        newHasTeacher: transformedChildren.hasTeacher,
      };
    },
  },
  Lecture: {
    transformer: async (lecture, getTransformedChildren) => {
      const transformedChildren = await getTransformedChildren();
      return {
        newName: lecture.name,
        newHasTeacher: transformedChildren.hasTeacher,
      };
    },
  },
  Teacher: {
    transformer: async (teacher) => {
      return {
        newName: teacher.name,
      };
    },
  },
});

const SampleTeacher: Teacher = {
  name: "Ms. Frizzle",
};
const SampleLecture: Lecture = {
  // Haha! Arnold was the only one who DIDN'T attend this lecture
  name: "How Digestion Works",
  hasTeacher: SampleTeacher,
};
const SampleStudent: Student = {
  name: "Arnold",
  hasLecture: SampleLecture,
  hasTeacher: SampleTeacher,
};

async function run() {
  const result = await SimpleConvergeTransformer.transform(
    SampleStudent,
    "Student",
    undefined
  );
  console.log("Before Result");
  console.log(SampleStudent);
  console.log(SampleStudent.hasTeacher === SampleStudent.hasLecture.hasTeacher);
  console.log("Final Result");
  console.log(result);
  console.log(result.newHasTeacher === result.newHasLecture.newHasTeacher);
}
run();
