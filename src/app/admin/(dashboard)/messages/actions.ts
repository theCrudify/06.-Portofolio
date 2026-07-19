"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { contactMessageStatusSchema } from "@/lib/validation/contact-message";
import {
  updateContactMessageStatus,
  deleteContactMessage,
} from "@/modules/contact/contact.service";

export type ActionResult = { success: true } | { success: false; error: string };

export async function updateContactMessageStatusAction(
  id: string,
  status: string
): Promise<ActionResult> {
  await requireSession();
  const parsed = contactMessageStatusSchema.safeParse(status);
  if (!parsed.success) {
    return { success: false, error: "Invalid status." };
  }
  await updateContactMessageStatus(id, parsed.data);
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
  return { success: true };
}

export async function deleteContactMessageAction(id: string): Promise<void> {
  await requireSession();
  await deleteContactMessage(id);
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}
