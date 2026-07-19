import { getAllSkillCategoriesAdmin } from "@/modules/skills/skill-category.service";
import type { SkillInput } from "@/lib/validation/skill";
import { SkillForm } from "../skill-form";

export const dynamic = "force-dynamic";

const defaultValues: SkillInput = {
  name: "",
  slug: "",
  categoryId: "",
  proficiency: "familiar",
  description: "",
  icon: "",
  yearsOfUse: "",
  isFeatured: false,
  sortOrder: 0,
  isPublished: true,
};

export default async function NewSkillPage() {
  const categories = await getAllSkillCategoriesAdmin();

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">New Skill</h1>
      <SkillForm
        defaultValues={defaultValues}
        categories={categories.map((category) => ({
          _id: category._id.toString(),
          name: category.name,
        }))}
      />
    </div>
  );
}
