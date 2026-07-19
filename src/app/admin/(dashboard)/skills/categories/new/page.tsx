import { CategoryForm } from "../../category-form";
import type { SkillCategoryInput } from "@/lib/validation/skill-category";

const defaultValues: SkillCategoryInput = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  sortOrder: 0,
  isPublished: true,
};

export default function NewSkillCategoryPage() {
  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">New Skill Category</h1>
      <CategoryForm defaultValues={defaultValues} />
    </div>
  );
}
