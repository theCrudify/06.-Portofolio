"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { generalSettingsSchema, type GeneralSettingsInput } from "@/lib/validation/site-settings";
import { upsertSiteSettings } from "@/modules/settings/site-settings.service";

export type ActionResult = { success: true } | { success: false; error: string };

export async function saveGeneralSettingsAction(
  input: GeneralSettingsInput
): Promise<ActionResult> {
  await requireSession();

  const parsed = generalSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }

  await upsertSiteSettings(parsed.data);
  revalidatePath("/admin/settings");
  revalidatePath("/");

  return { success: true };
}
