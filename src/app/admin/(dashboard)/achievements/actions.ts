"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { achievementSchema, type AchievementInput } from "@/lib/validation/achievement";
import {
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "@/modules/achievements/achievement.service";

export type ActionResult = { success: true } | { success: false; error: string };

function revalidateAchievements() {
  revalidatePath("/admin/achievements");
  revalidatePath("/about");
}

export async function createAchievementAction(input: AchievementInput): Promise<ActionResult> {
  await requireSession();
  const parsed = achievementSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createAchievement(parsed.data);
  revalidateAchievements();
  return { success: true };
}

export async function updateAchievementAction(
  id: string,
  input: AchievementInput
): Promise<ActionResult> {
  await requireSession();
  const parsed = achievementSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateAchievement(id, parsed.data);
  revalidateAchievements();
  return { success: true };
}

export async function deleteAchievementAction(id: string): Promise<void> {
  await requireSession();
  await deleteAchievement(id);
  revalidateAchievements();
  redirect("/admin/achievements");
}
