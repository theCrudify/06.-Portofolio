import { connectToDatabase } from "@/lib/database/mongodb";
import type { Types } from "mongoose";
import type { ProjectInput } from "@/lib/validation/project";
import { toOptionalDate } from "@/lib/validation/common";
import { ProjectModel, type Project } from "./project.model";
import "./industry.model";
import "./project-type.model";
import "@/modules/skills/skill.model";
import type { Industry } from "./industry.model";
import type { ProjectType } from "./project-type.model";
import type { Skill } from "@/modules/skills/skill.model";

export type PopulatedProject = Omit<
  Project,
  "industryId" | "projectTypeId" | "technologyIds" | "integrationIds"
> & {
  industryId: Industry | null;
  projectTypeId: ProjectType | null;
  technologyIds: Skill[];
  integrationIds: Skill[];
};

export type ProjectWithId = Project & { _id: Types.ObjectId };

function toProjectDocument(input: ProjectInput) {
  return {
    ...input,
    industryId: input.industryId || undefined,
    projectTypeId: input.projectTypeId || undefined,
    relatedExperienceId: input.relatedExperienceId || undefined,
    startDate: toOptionalDate(input.startDate),
    endDate: toOptionalDate(input.endDate),
  };
}

export async function getFeaturedProjects(): Promise<PopulatedProject[]> {
  await connectToDatabase();
  return ProjectModel.find({
    status: "published",
    isFeatured: true,
    deletedAt: null,
  })
    .sort({ featuredOrder: 1 })
    .populate("industryId")
    .populate("projectTypeId")
    .populate("technologyIds")
    .populate("integrationIds")
    .lean<PopulatedProject[]>();
}

export async function getPublishedProjects(): Promise<PopulatedProject[]> {
  await connectToDatabase();
  return ProjectModel.find({
    status: "published",
    deletedAt: null,
  })
    .sort({ sortOrder: 1 })
    .populate("industryId")
    .populate("projectTypeId")
    .populate("technologyIds")
    .populate("integrationIds")
    .lean<PopulatedProject[]>();
}

export async function getProjectBySlug(slug: string): Promise<PopulatedProject | null> {
  await connectToDatabase();
  return ProjectModel.findOne({ slug, status: "published", deletedAt: null })
    .populate("industryId")
    .populate("projectTypeId")
    .populate("technologyIds")
    .populate("integrationIds")
    .lean<PopulatedProject>();
}

export async function getAllProjectsAdmin(): Promise<ProjectWithId[]> {
  await connectToDatabase();
  return ProjectModel.find({ deletedAt: null })
    .sort({ sortOrder: 1 })
    .lean<ProjectWithId[]>();
}

export async function getProjectByIdAdmin(id: string): Promise<Project | null> {
  await connectToDatabase();
  return ProjectModel.findById(id).lean<Project>();
}

export async function createProject(input: ProjectInput): Promise<void> {
  await connectToDatabase();
  await ProjectModel.create({
    ...toProjectDocument(input),
    publishedAt: input.status === "published" ? new Date() : undefined,
  });
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  await connectToDatabase();
  const existing = await ProjectModel.findById(id)
    .select("status publishedAt")
    .lean<{ status: string; publishedAt?: Date }>();

  const publishedAt =
    input.status === "published" ? existing?.publishedAt ?? new Date() : existing?.publishedAt;

  await ProjectModel.findByIdAndUpdate(id, { ...toProjectDocument(input), publishedAt });
}

export async function deleteProject(id: string): Promise<void> {
  await connectToDatabase();
  await ProjectModel.findByIdAndUpdate(id, { deletedAt: new Date() });
}
