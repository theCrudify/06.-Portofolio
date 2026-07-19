"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { industrySchema, type IndustryInput } from "@/lib/validation/industry";
import { projectTypeSchema, type ProjectTypeInput } from "@/lib/validation/project-type";
import {
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "@/modules/projects/industry.service";
import {
  createProjectType,
  updateProjectType,
  deleteProjectType,
} from "@/modules/projects/project-type.service";

export type ActionResult = { success: true } | { success: false; error: string };

function revalidateTaxonomy() {
  revalidatePath("/admin/projects/taxonomy");
  revalidatePath("/admin/projects");
}

export async function createIndustryAction(input: IndustryInput): Promise<ActionResult> {
  await requireSession();
  const parsed = industrySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createIndustry(parsed.data);
  revalidateTaxonomy();
  return { success: true };
}

export async function updateIndustryAction(
  id: string,
  input: IndustryInput
): Promise<ActionResult> {
  await requireSession();
  const parsed = industrySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateIndustry(id, parsed.data);
  revalidateTaxonomy();
  return { success: true };
}

export async function deleteIndustryAction(id: string): Promise<void> {
  await requireSession();
  await deleteIndustry(id);
  revalidateTaxonomy();
}

export async function createProjectTypeAction(input: ProjectTypeInput): Promise<ActionResult> {
  await requireSession();
  const parsed = projectTypeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createProjectType(parsed.data);
  revalidateTaxonomy();
  return { success: true };
}

export async function updateProjectTypeAction(
  id: string,
  input: ProjectTypeInput
): Promise<ActionResult> {
  await requireSession();
  const parsed = projectTypeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateProjectType(id, parsed.data);
  revalidateTaxonomy();
  return { success: true };
}

export async function deleteProjectTypeAction(id: string): Promise<void> {
  await requireSession();
  await deleteProjectType(id);
  revalidateTaxonomy();
}
