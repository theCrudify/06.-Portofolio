import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const educationSchema = new Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, default: "" },
    location: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    gpa: { type: Number },
    maximumGpa: { type: Number },
    description: { type: String, default: "" },
    scholarships: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

educationSchema.index({ sortOrder: 1 });

export type Education = InferSchemaType<typeof educationSchema> & { _id: Types.ObjectId };

export const EducationModel = models.Education ?? model("Education", educationSchema);
