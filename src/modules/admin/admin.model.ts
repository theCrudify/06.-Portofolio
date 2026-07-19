import { Schema, model, models, Types, type InferSchemaType } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export type Admin = InferSchemaType<typeof adminSchema> & { _id: Types.ObjectId };

export const AdminModel = models.Admin ?? model("Admin", adminSchema);
