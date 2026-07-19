import { notFound } from "next/navigation";
import { getSkillCategoryById } from "@/modules/skills/skill-category.service";
import type { SkillCategoryInput } from "@/lib/validation/skill-category";
import { CategoryForm } from "../../../category-form";

export const dynamic = "force-dynamic";

export default async function EditSkillCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getSkillCategoryById(id);
  if (!category) {
    notFound();
  }

  const defaultValues: SkillCategoryInput = {
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    icon: category.icon ?? "",
    sortOrder: category.sortOrder ?? 0,
    isPublished: category.isPublished ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Edit Skill Category</h1>
      <CategoryForm defaultValues={defaultValues} categoryId={id} />
    </div>
  );
}
