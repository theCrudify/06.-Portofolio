"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { projectSchema, type ProjectInput } from "@/lib/validation/project";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/modules/projects/project.service";

export type ActionResult = { success: true } | { success: false; error: string };

function revalidateProjects() {
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function createProjectAction(input: ProjectInput): Promise<ActionResult> {
  await requireSession();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await createProject(parsed.data);
  revalidateProjects();
  return { success: true };
}

export async function updateProjectAction(id: string, input: ProjectInput): Promise<ActionResult> {
  await requireSession();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields." };
  }
  await updateProject(id, parsed.data);
  revalidateProjects();
  return { success: true };
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireSession();
  await deleteProject(id);
  revalidateProjects();
  redirect("/admin/projects");
}
