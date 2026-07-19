import { Schema, model, models, type InferSchemaType } from "mongoose";

const statisticSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const profileSchema = new Schema(
  {
    fullName: { type: String, required: true },
    professionalTitle: { type: String, required: true },
    shortSummary: { type: String, required: true },
    aboutContent: { type: String, default: "" },
    publicLocation: { type: String, default: "" },
    publicEmail: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    availabilityStatus: { type: String, default: "open" },
    primaryCTA: { type: String, default: "View Projects" },
    secondaryCTA: { type: String, default: "Contact Me" },
    statistics: { type: [statisticSchema], default: [] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type Profile = InferSchemaType<typeof profileSchema>;

export const ProfileModel = models.Profile ?? model("Profile", profileSchema);
