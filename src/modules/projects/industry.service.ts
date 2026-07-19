import { connectToDatabase } from "@/lib/database/mongodb";
import type { Types } from "mongoose";
import type { IndustryInput } from "@/lib/validation/industry";
import { IndustryModel, type Industry } from "./industry.model";

export type IndustryWithId = Industry & { _id: Types.ObjectId };

export async function getAllIndustries(): Promise<IndustryWithId[]> {
  await connectToDatabase();
  return IndustryModel.find().sort({ sortOrder: 1 }).lean<IndustryWithId[]>();
}

export async function createIndustry(input: IndustryInput): Promise<void> {
  await connectToDatabase();
  await IndustryModel.create(input);
}

export async function updateIndustry(id: string, input: IndustryInput): Promise<void> {
  await connectToDatabase();
  await IndustryModel.findByIdAndUpdate(id, input);
}

export async function deleteIndustry(id: string): Promise<void> {
  await connectToDatabase();
  await IndustryModel.findByIdAndDelete(id);
}
