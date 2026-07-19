import { notFound } from "next/navigation";
import { getSkillById } from "@/modules/skills/skill.service";
import { getAllSkillCategoriesAdmin } from "@/modules/skills/skill-category.service";
import type { SkillInput } from "@/lib/validation/skill";
import { SkillForm } from "../../skill-form";

export const dynamic = "force-dynamic";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [skill, categories] = await Promise.all([
    getSkillById(id),
    getAllSkillCategoriesAdmin(),
  ]);

  if (!skill) {
    notFound();
  }

  const defaultValues: SkillInput = {
    name: skill.name,
    slug: skill.slug,
    categoryId: skill.categoryId?.toString() ?? "",
    proficiency:
      (skill.proficiency as SkillInput["proficiency"]) ?? "familiar",
    description: skill.description ?? "",
    icon: skill.icon ?? "",
    yearsOfUse: skill.yearsOfUse != null ? String(skill.yearsOfUse) : "",
    isFeatured: skill.isFeatured ?? false,
    sortOrder: skill.sortOrder ?? 0,
    isPublished: skill.isPublished ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Edit Skill</h1>
      <SkillForm
        defaultValues={defaultValues}
        categories={categories.map((category) => ({
          _id: category._id.toString(),
          name: category.name,
        }))}
        skillId={id}
      />
    </div>
  );
}
