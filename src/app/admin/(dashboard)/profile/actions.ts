"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { profileSchema, type ProfileInput } from "@/lib/validation/profile";
import { upsertProfile } from "@/modules/profile/profile.service";

export type ActionResult = { success: true } | { success: false; error: string };

export async function saveProfileAction(input: ProfileInput): Promise<ActionResult> {
  await requireSession();

  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }

  await upsertProfile(parsed.data);
  revalidatePath("/admin/profile");
  revalidatePath("/");
  revalidatePath("/about");

  return { success: true };
}
