import { connectToDatabase } from "@/lib/database/mongodb";
import type { Types } from "mongoose";
import type { SkillInput } from "@/lib/validation/skill";
import { toOptionalNumber } from "@/lib/validation/common";
import { SkillModel, type Skill } from "./skill.model";

function toSkillDocument(input: SkillInput) {
  return { ...input, yearsOfUse: toOptionalNumber(input.yearsOfUse) };
}

export async function getAllSkills(): Promise<Skill[]> {
  await connectToDatabase();
  return SkillModel.find({ isPublished: true }).sort({ sortOrder: 1 }).lean<Skill[]>();
}

export async function getAllSkillsAdmin(): Promise<(Skill & { _id: Types.ObjectId })[]> {
  await connectToDatabase();
  return SkillModel.find().sort({ sortOrder: 1 }).lean<(Skill & { _id: Types.ObjectId })[]>();
}

export async function getSkillById(id: string): Promise<Skill | null> {
  await connectToDatabase();
  return SkillModel.findById(id).lean<Skill>();
}

export async function createSkill(input: SkillInput): Promise<void> {
  await connectToDatabase();
  await SkillModel.create(toSkillDocument(input));
}

export async function updateSkill(id: string, input: SkillInput): Promise<void> {
  await connectToDatabase();
  await SkillModel.findByIdAndUpdate(id, toSkillDocument(input));
}

export async function deleteSkill(id: string): Promise<void> {
  await connectToDatabase();
  await SkillModel.findByIdAndDelete(id);
}
