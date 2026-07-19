import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ProjectType = InferSchemaType<typeof projectTypeSchema>;

export const ProjectTypeModel =
  models.ProjectType ?? model("ProjectType", projectTypeSchema);
