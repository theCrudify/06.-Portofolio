import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const achievementSchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "award",
        "competition",
        "scholarship",
        "certification",
        "leadership",
        "organization",
        "speaking_engagement",
      ],
      required: true,
    },
    issuer: { type: String, default: "" },
    date: { type: Date },
    endDate: { type: Date },
    description: { type: String, default: "" },
    evidenceUrl: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

achievementSchema.index({ type: 1 });
achievementSchema.index({ sortOrder: 1 });

export type Achievement = InferSchemaType<typeof achievementSchema> & { _id: Types.ObjectId };

export const AchievementModel =
  models.Achievement ?? model("Achievement", achievementSchema);
