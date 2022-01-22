import kitchenSinkSchema from "shex-test/schemas/kitchenSink.json";
import * as dom from "dts-dom";
import { jsonld2graphobject } from "jsonld2graphobject";
import {
  activityPub,
  carbonTrackerShape,
  circular,
  profile,
  simple,
} from "./testShape";
import { Schema } from "shexj";
import { ShexJTypeTransformer } from "./ShexJTypeTransformer";
import { createIriNames } from "./createIriNames";

async function run() {
  console.time("a");
  const input: Schema = (await jsonld2graphobject(
    { "@id": "SCHEMA", ...activityPub },
    "SCHEMA"
  )) as unknown as Schema;
  const iriNameMap = await createIriNames(input);
  const result = await ShexJTypeTransformer.transform(input, "Schema", {
    iriNameMap: iriNameMap,
  });
  result.name = "circular";
  console.log("Final Result");
  console.log(dom.emit(result));
  console.timeEnd("a");
}
run();
