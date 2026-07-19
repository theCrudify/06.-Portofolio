import { Schema, model, models, type InferSchemaType } from "mongoose";

const industrySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Industry = InferSchemaType<typeof industrySchema>;

export const IndustryModel = models.Industry ?? model("Industry", industrySchema);
