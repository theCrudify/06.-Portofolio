import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const experienceSchema = new Schema(
  {
    companyName: { type: String, required: true },
    publicCompanyName: { type: String, required: true },
    position: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["professional", "internship", "freelance", "personal", "open_source"],
      required: true,
    },
    employmentBasis: { type: String, default: "" },
    location: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    summary: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    technologyIds: { type: [Types.ObjectId], ref: "Skill", default: [] },
    companyLogo: { type: String, default: "" },
    website: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

experienceSchema.index({ sortOrder: 1 });
experienceSchema.index({ startDate: -1 });
experienceSchema.index({ technologyIds: 1 });

export type Experience = InferSchemaType<typeof experienceSchema> & {
  _id: Types.ObjectId;
};

export const ExperienceModel =
  models.Experience ?? model("Experience", experienceSchema);
