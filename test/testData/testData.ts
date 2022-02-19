import { ContextDefinition } from "jsonld";
import { Schema } from "shexj";
import { activityPub } from "./activityPub";
import { circular } from "./circular";
import { profile } from "./profile";
import { reducedProfile } from "./reducedProfile";
import { simple } from "./simple";

export interface TestData {
  name: string;
  shexj: Schema;
  sampleTurtle: string;
  baseNode: string;
  successfulContext: ContextDefinition;
  successfulTypings: string;
}

export const testData: TestData[] = [
  simple,
  circular,
  profile,
  reducedProfile,
  activityPub,
];
