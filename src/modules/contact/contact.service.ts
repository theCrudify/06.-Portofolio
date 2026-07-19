import { connectToDatabase } from "@/lib/database/mongodb";
import type { Types } from "mongoose";
import { ContactMessageModel, type ContactMessage } from "./contact-message.model";

export type ContactMessageWithId = ContactMessage & { _id: Types.ObjectId };

export type ContactMessageStatus = NonNullable<ContactMessage["status"]>;

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.CONTACT_RATE_LIMIT ?? 5);

export async function isRateLimited(ipHash: string): Promise<boolean> {
  await connectToDatabase();
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
  const recentCount = await ContactMessageModel.countDocuments({
    ipHash,
    createdAt: { $gte: since },
  });
  return recentCount >= RATE_LIMIT_MAX_REQUESTS;
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  purpose: string;
  ipHash: string;
  userAgent: string;
}): Promise<void> {
  await connectToDatabase();
  await ContactMessageModel.create(input);
}

export async function getAllContactMessages(
  status?: ContactMessageStatus | "all"
): Promise<ContactMessageWithId[]> {
  await connectToDatabase();
  const query = status && status !== "all" ? { status } : {};
  return ContactMessageModel.find(query).sort({ createdAt: -1 }).lean<ContactMessageWithId[]>();
}

export async function getContactMessageById(id: string): Promise<ContactMessageWithId | null> {
  await connectToDatabase();
  const message = await ContactMessageModel.findById(id).lean<ContactMessageWithId>();
  if (!message) {
    return null;
  }

  if (message.status === "new") {
    const readAt = new Date();
    await ContactMessageModel.findByIdAndUpdate(id, { status: "read", readAt });
    return { ...message, status: "read", readAt };
  }

  return message;
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus
): Promise<void> {
  await connectToDatabase();
  const timestamp =
    status === "read"
      ? { readAt: new Date() }
      : status === "replied"
        ? { repliedAt: new Date() }
        : status === "archived"
          ? { archivedAt: new Date() }
          : {};
  await ContactMessageModel.findByIdAndUpdate(id, { status, ...timestamp });
}

export async function deleteContactMessage(id: string): Promise<void> {
  await connectToDatabase();
  await ContactMessageModel.findByIdAndDelete(id);
}

export async function countUnreadContactMessages(): Promise<number> {
  await connectToDatabase();
  return ContactMessageModel.countDocuments({ status: "new" });
}
