"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { skillCategorySchema, type SkillCategoryInput } from "@/lib/validation/skill-category";
import { skillSchema, type SkillInput } from "@/lib/validation/skill";
import {
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
} from "@/modules/skills/skill-category.service";
import { createSkill, updateSkill, deleteSkill } from "@/modules/skills/skill.service";

export type ActionResult = { success: true } | { success: false; error: string };

function revalidateSkills() {
  revalidatePath("/admin/skills");
  revalidatePath("/");
  revalidatePath("/skills");
}

export async function createSkillCategoryAction(input: SkillCategoryInput): Promise<ActionResult> {
  await requireSession();
  const parsed = skillCategorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createSkillCategory(parsed.data);
  revalidateSkills();
  return { success: true };
}

export async function updateSkillCategoryAction(
  id: string,
  input: SkillCategoryInput
): Promise<ActionResult> {
  await requireSession();
  const parsed = skillCategorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateSkillCategory(id, parsed.data);
  revalidateSkills();
  return { success: true };
}

export async function deleteSkillCategoryAction(id: string): Promise<void> {
  await requireSession();
  await deleteSkillCategory(id);
  revalidateSkills();
  redirect("/admin/skills");
}

export async function createSkillAction(input: SkillInput): Promise<ActionResult> {
  await requireSession();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createSkill(parsed.data);
  revalidateSkills();
  return { success: true };
}

export async function updateSkillAction(id: string, input: SkillInput): Promise<ActionResult> {
  await requireSession();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateSkill(id, parsed.data);
  revalidateSkills();
  return { success: true };
}

export async function deleteSkillAction(id: string): Promise<void> {
  await requireSession();
  await deleteSkill(id);
  revalidateSkills();
  redirect("/admin/skills");
}
