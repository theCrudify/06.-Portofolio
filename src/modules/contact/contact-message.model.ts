import { Schema, model, models, type InferSchemaType } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["job_opportunity", "freelance_project", "networking", "collaboration", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived", "spam"],
      default: "new",
    },
    ipHash: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    readAt: { type: Date },
    repliedAt: { type: Date },
    archivedAt: { type: Date },
  },
  { timestamps: true }
);

contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ createdAt: -1 });

export type ContactMessage = InferSchemaType<typeof contactMessageSchema>;

export const ContactMessageModel =
  models.ContactMessage ?? model("ContactMessage", contactMessageSchema);
