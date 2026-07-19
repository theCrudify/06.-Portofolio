"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { resumeSettingsSchema, type ResumeSettingsInput } from "@/lib/validation/site-settings";
import { upsertSiteSettings } from "@/modules/settings/site-settings.service";

export type ActionResult = { success: true } | { success: false; error: string };

export async function saveResumeSettingsAction(
  input: ResumeSettingsInput
): Promise<ActionResult> {
  await requireSession();

  const parsed = resumeSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }

  await upsertSiteSettings(parsed.data);
  revalidatePath("/admin/resume");
  revalidatePath("/resume");

  return { success: true };
}
