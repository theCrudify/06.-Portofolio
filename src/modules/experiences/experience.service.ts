import { connectToDatabase } from "@/lib/database/mongodb";
import type { ExperienceInput } from "@/lib/validation/experience";
import { toDate, toOptionalDate } from "@/lib/validation/common";
import { ExperienceModel, type Experience } from "./experience.model";
import "@/modules/skills/skill.model";
import type { Skill } from "@/modules/skills/skill.model";

function toExperienceDocument(input: ExperienceInput) {
  return {
    ...input,
    startDate: toDate(input.startDate),
    endDate: toOptionalDate(input.endDate),
  };
}

export type PopulatedExperience = Omit<Experience, "technologyIds"> & {
  technologyIds: Skill[];
};

export async function getLatestExperience(): Promise<PopulatedExperience | null> {
  await connectToDatabase();
  return ExperienceModel.findOne({ isPublished: true })
    .sort({ isCurrent: -1, startDate: -1 })
    .populate("technologyIds")
    .lean<PopulatedExperience>();
}

export async function getRecentExperiences(limit = 3): Promise<PopulatedExperience[]> {
  await connectToDatabase();
  return ExperienceModel.find({ isPublished: true })
    .sort({ isCurrent: -1, startDate: -1 })
    .limit(limit)
    .populate("technologyIds")
    .lean<PopulatedExperience[]>();
}

export async function getAllExperiences(): Promise<PopulatedExperience[]> {
  await connectToDatabase();
  return ExperienceModel.find({ isPublished: true })
    .sort({ isCurrent: -1, startDate: -1 })
    .populate("technologyIds")
    .lean<PopulatedExperience[]>();
}

export async function getAllExperiencesAdmin(): Promise<Experience[]> {
  await connectToDatabase();
  return ExperienceModel.find()
    .sort({ isCurrent: -1, startDate: -1 })
    .lean<Experience[]>();
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  await connectToDatabase();
  return ExperienceModel.findById(id).lean<Experience>();
}

export async function createExperience(input: ExperienceInput): Promise<void> {
  await connectToDatabase();
  await ExperienceModel.create(toExperienceDocument(input));
}

export async function updateExperience(id: string, input: ExperienceInput): Promise<void> {
  await connectToDatabase();
  await ExperienceModel.findByIdAndUpdate(id, toExperienceDocument(input));
}

export async function deleteExperience(id: string): Promise<void> {
  await connectToDatabase();
  await ExperienceModel.findByIdAndDelete(id);
}
