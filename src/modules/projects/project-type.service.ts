import { connectToDatabase } from "@/lib/database/mongodb";
import type { Types } from "mongoose";
import type { ProjectTypeInput } from "@/lib/validation/project-type";
import { ProjectTypeModel, type ProjectType } from "./project-type.model";

export type ProjectTypeWithId = ProjectType & { _id: Types.ObjectId };

export async function getAllProjectTypes(): Promise<ProjectTypeWithId[]> {
  await connectToDatabase();
  return ProjectTypeModel.find().sort({ sortOrder: 1 }).lean<ProjectTypeWithId[]>();
}

export async function createProjectType(input: ProjectTypeInput): Promise<void> {
  await connectToDatabase();
  await ProjectTypeModel.create(input);
}

export async function updateProjectType(id: string, input: ProjectTypeInput): Promise<void> {
  await connectToDatabase();
  await ProjectTypeModel.findByIdAndUpdate(id, input);
}

export async function deleteProjectType(id: string): Promise<void> {
  await connectToDatabase();
  await ProjectTypeModel.findByIdAndDelete(id);
}
