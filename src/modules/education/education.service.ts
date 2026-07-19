import { connectToDatabase } from "@/lib/database/mongodb";
import type { EducationInput } from "@/lib/validation/education";
import { toDate, toOptionalDate, toOptionalNumber } from "@/lib/validation/common";
import { EducationModel, type Education } from "./education.model";

function toEducationDocument(input: EducationInput) {
  return {
    ...input,
    startDate: toDate(input.startDate),
    endDate: toOptionalDate(input.endDate),
    gpa: toOptionalNumber(input.gpa),
    maximumGpa: toOptionalNumber(input.maximumGpa),
  };
}

export async function getEducationEntries(): Promise<Education[]> {
  await connectToDatabase();
  return EducationModel.find({ isPublished: true })
    .sort({ sortOrder: 1 })
    .lean<Education[]>();
}

export async function getAllEducationAdmin(): Promise<Education[]> {
  await connectToDatabase();
  return EducationModel.find().sort({ sortOrder: 1 }).lean<Education[]>();
}

export async function getEducationById(id: string): Promise<Education | null> {
  await connectToDatabase();
  return EducationModel.findById(id).lean<Education>();
}

export async function createEducation(input: EducationInput): Promise<void> {
  await connectToDatabase();
  await EducationModel.create(toEducationDocument(input));
}

export async function updateEducation(id: string, input: EducationInput): Promise<void> {
  await connectToDatabase();
  await EducationModel.findByIdAndUpdate(id, toEducationDocument(input));
}

export async function deleteEducation(id: string): Promise<void> {
  await connectToDatabase();
  await EducationModel.findByIdAndDelete(id);
}
