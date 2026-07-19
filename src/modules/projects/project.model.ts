import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const seoSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    overview: { type: String, default: "" },
    businessContext: { type: String, default: "" },
    problems: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
    solution: { type: String, default: "" },
    keyFeatures: { type: [String], default: [] },
    businessWorkflow: { type: String, default: "" },
    architectureDescription: { type: String, default: "" },
    technicalChallenges: { type: String, default: "" },
    results: { type: [String], default: [] },
    industryId: { type: Types.ObjectId, ref: "Industry" },
    projectTypeId: { type: Types.ObjectId, ref: "ProjectType" },
    employmentType: {
      type: String,
      enum: ["professional", "internship", "freelance", "personal", "open_source"],
      required: true,
    },
    role: { type: String, default: "" },
    relatedExperienceId: { type: Types.ObjectId, ref: "Experience" },
    technologyIds: { type: [Types.ObjectId], ref: "Skill", default: [] },
    integrationIds: { type: [Types.ObjectId], ref: "Skill", default: [] },
    startDate: { type: Date },
    endDate: { type: Date },
    coverImage: { type: String, default: "" },
    publicClientLabel: { type: String, required: true },
    confidentialityNotice: { type: String, default: "" },
    visibility: {
      type: String,
      enum: ["public", "anonymized", "private"],
      default: "public",
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    isFeatured: { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 0 },
    sortOrder: { type: Number, default: 0 },
    seo: { type: seoSchema, default: () => ({}) },
    publishedAt: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1 });
projectSchema.index({ isFeatured: 1 });
projectSchema.index({ deletedAt: 1 });
projectSchema.index({ industryId: 1 });
projectSchema.index({ projectTypeId: 1 });
projectSchema.index({ technologyIds: 1 });
projectSchema.index({ relatedExperienceId: 1 });

export type Project = InferSchemaType<typeof projectSchema>;

export const ProjectModel = models.Project ?? model("Project", projectSchema);
