"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { experienceSchema, type ExperienceInput } from "@/lib/validation/experience";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/modules/experiences/experience.service";

export type ActionResult = { success: true } | { success: false; error: string };

function revalidateExperiences() {
  revalidatePath("/admin/experiences");
  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/projects");
}

export async function createExperienceAction(input: ExperienceInput): Promise<ActionResult> {
  await requireSession();
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createExperience(parsed.data);
  revalidateExperiences();
  return { success: true };
}

export async function updateExperienceAction(
  id: string,
  input: ExperienceInput
): Promise<ActionResult> {
  await requireSession();
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateExperience(id, parsed.data);
  revalidateExperiences();
  return { success: true };
}

export async function deleteExperienceAction(id: string): Promise<void> {
  await requireSession();
  await deleteExperience(id);
  revalidateExperiences();
  redirect("/admin/experiences");
}
