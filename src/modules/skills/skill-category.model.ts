import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const skillCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

skillCategorySchema.index({ sortOrder: 1 });

export type SkillCategory = InferSchemaType<typeof skillCategorySchema> & {
  _id: Types.ObjectId;
};

export const SkillCategoryModel =
  models.SkillCategory ?? model("SkillCategory", skillCategorySchema);
