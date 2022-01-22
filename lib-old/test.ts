// import * as dom from "dts-dom";

// const intf = dom.create.interface("MyInterface");
// intf.jsDocComment = "This is my nice interface";
// intf.members.push(
//   dom.create.method(
//     "getThing",
//     [dom.create.parameter("x", dom.type.number)],
//     dom.type.void,
//     dom.DeclarationFlags.Optional
//   ),
//   dom.create.indexSignature("y", "string", dom.type.string),
//   dom.create.property("z", dom.type.string)
// );

// const ns = dom.create.namespace("SomeNamespace");
// ns.members.push(intf);

// console.log(dom.emit(ns));

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const promises: Promise<string>[] = [];

async function red(): Promise<string> {
  await timeout(0);
  console.log("red");
  console.log(promises);
  return "red";
}
async function green(): Promise<string> {
  await timeout(0);
  console.log("green");
  console.log(promises);
  return "green";
}
async function blue(): Promise<string> {
  await timeout(0);
  console.log("blue");
  console.log(promises);
  return "blue";
}

async function run() {
  promises.push(red(), green(), blue());
  console.log("after");
  console.log(promises);
  const result = await Promise.all(promises);
  console.log("result");
  console.log(result);
  console.log("After After");
  console.log(promises);
}
run();

// async function run() {
//   const promise = new Promise((resolve, reject) => {
//     resolve("red");
//   });
//   const result = await Promise.all([promise, promise, promise]);
//   console.log(1);
//   console.log(result);
//   const two = await promise;
//   console.log(2);
//   console.log(two);
//   await timeout(500);
//   const three = await promise;
//   console.log(three);
// }
// run();
