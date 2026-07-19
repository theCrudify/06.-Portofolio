"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { educationSchema, type EducationInput } from "@/lib/validation/education";
import {
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/modules/education/education.service";

export type ActionResult = { success: true } | { success: false; error: string };

function revalidateEducation() {
  revalidatePath("/admin/education");
  revalidatePath("/education");
  revalidatePath("/about");
}

export async function createEducationAction(input: EducationInput): Promise<ActionResult> {
  await requireSession();
  const parsed = educationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createEducation(parsed.data);
  revalidateEducation();
  return { success: true };
}

export async function updateEducationAction(
  id: string,
  input: EducationInput
): Promise<ActionResult> {
  await requireSession();
  const parsed = educationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateEducation(id, parsed.data);
  revalidateEducation();
  return { success: true };
}

export async function deleteEducationAction(id: string): Promise<void> {
  await requireSession();
  await deleteEducation(id);
  revalidateEducation();
  redirect("/admin/education");
}
