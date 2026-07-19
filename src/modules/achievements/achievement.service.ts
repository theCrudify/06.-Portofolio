import { connectToDatabase } from "@/lib/database/mongodb";
import type { AchievementInput } from "@/lib/validation/achievement";
import { toOptionalDate } from "@/lib/validation/common";
import { AchievementModel, type Achievement } from "./achievement.model";

function toAchievementDocument(input: AchievementInput) {
  return {
    ...input,
    date: toOptionalDate(input.date),
    endDate: toOptionalDate(input.endDate),
  };
}

export async function getAchievements(): Promise<Achievement[]> {
  await connectToDatabase();
  return AchievementModel.find({ isPublished: true })
    .sort({ sortOrder: 1 })
    .lean<Achievement[]>();
}

export async function getAllAchievementsAdmin(): Promise<Achievement[]> {
  await connectToDatabase();
  return AchievementModel.find().sort({ sortOrder: 1 }).lean<Achievement[]>();
}

export async function getAchievementById(id: string): Promise<Achievement | null> {
  await connectToDatabase();
  return AchievementModel.findById(id).lean<Achievement>();
}

export async function createAchievement(input: AchievementInput): Promise<void> {
  await connectToDatabase();
  await AchievementModel.create(toAchievementDocument(input));
}

export async function updateAchievement(id: string, input: AchievementInput): Promise<void> {
  await connectToDatabase();
  await AchievementModel.findByIdAndUpdate(id, toAchievementDocument(input));
}

export async function deleteAchievement(id: string): Promise<void> {
  await connectToDatabase();
  await AchievementModel.findByIdAndDelete(id);
}
