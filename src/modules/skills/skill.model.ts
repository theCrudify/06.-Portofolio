import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categoryId: { type: Types.ObjectId, ref: "SkillCategory", required: true },
    proficiency: {
      type: String,
      enum: ["primary", "proficient", "working_knowledge", "familiar"],
      default: "familiar",
    },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    yearsOfUse: { type: Number },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

skillSchema.index({ categoryId: 1 });
skillSchema.index({ sortOrder: 1 });

export type Skill = InferSchemaType<typeof skillSchema>;

export const SkillModel = models.Skill ?? model("Skill", skillSchema);
