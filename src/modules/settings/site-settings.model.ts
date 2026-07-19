import { Schema, model, models, type InferSchemaType } from "mongoose";

const socialLinksSchema = new Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema(
  {
    siteTitle: { type: String, required: true },
    publicEmail: { type: String, required: true },
    socialLinks: { type: socialLinksSchema, default: () => ({}) },
    contactFormEnabled: { type: Boolean, default: true },
    resumeDownloadEnabled: { type: Boolean, default: true },
    resumeUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export type SiteSettings = InferSchemaType<typeof siteSettingsSchema>;

export const SiteSettingsModel =
  models.SiteSettings ?? model("SiteSettings", siteSettingsSchema);
