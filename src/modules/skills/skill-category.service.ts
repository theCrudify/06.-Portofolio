import { connectToDatabase } from "@/lib/database/mongodb";
import type { SkillCategoryInput } from "@/lib/validation/skill-category";
import { SkillCategoryModel, type SkillCategory } from "./skill-category.model";

export async function getSkillCategories(): Promise<SkillCategory[]> {
  await connectToDatabase();
  return SkillCategoryModel.find({ isPublished: true })
    .sort({ sortOrder: 1 })
    .lean<SkillCategory[]>();
}

export async function getAllSkillCategoriesAdmin(): Promise<SkillCategory[]> {
  await connectToDatabase();
  return SkillCategoryModel.find().sort({ sortOrder: 1 }).lean<SkillCategory[]>();
}

export async function getSkillCategoryById(id: string): Promise<SkillCategory | null> {
  await connectToDatabase();
  return SkillCategoryModel.findById(id).lean<SkillCategory>();
}

export async function createSkillCategory(input: SkillCategoryInput): Promise<void> {
  await connectToDatabase();
  await SkillCategoryModel.create(input);
}

export async function updateSkillCategory(
  id: string,
  input: SkillCategoryInput
): Promise<void> {
  await connectToDatabase();
  await SkillCategoryModel.findByIdAndUpdate(id, input);
}

export async function deleteSkillCategory(id: string): Promise<void> {
  await connectToDatabase();
  await SkillCategoryModel.findByIdAndDelete(id);
}
