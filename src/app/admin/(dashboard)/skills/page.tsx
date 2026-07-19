import Link from "next/link";
import { getAllSkillCategoriesAdmin } from "@/modules/skills/skill-category.service";
import { getAllSkillsAdmin } from "@/modules/skills/skill.service";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { primaryButtonClass, secondaryButtonClass } from "@/components/admin/form-styles";
import { deleteSkillAction, deleteSkillCategoryAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const [categories, skills] = await Promise.all([
    getAllSkillCategoriesAdmin(),
    getAllSkillsAdmin(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Skills</h1>
          <p className="text-body mt-1 text-muted">
            Skill categories and the skills listed under each.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/skills/categories/new" className={secondaryButtonClass}>
            New Category
          </Link>
          <Link href="/admin/skills/new" className={primaryButtonClass}>
            New Skill
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {categories.length === 0 && (
          <p className="text-body text-muted">No skill categories yet.</p>
        )}

        {categories.map((category) => {
          const categorySkills = skills.filter(
            (skill) => skill.categoryId?.toString() === category._id.toString()
          );

          return (
            <div key={category._id.toString()} className="rounded-xl border border-border bg-surface">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-h4 font-semibold text-foreground">{category.name}</h2>
                  <StatusBadge
                    label={category.isPublished ? "Published" : "Draft"}
                    tone={category.isPublished ? "success" : "neutral"}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/skills/categories/${category._id}/edit`}
                    className="text-small font-medium text-accent hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    action={deleteSkillCategoryAction.bind(null, category._id.toString())}
                    confirmMessage="Delete this category? Skills under it will remain but lose their category."
                  />
                </div>
              </div>

              <div className="divide-y divide-border">
                {categorySkills.length === 0 && (
                  <p className="text-small px-5 py-4 text-muted">No skills in this category.</p>
                )}
                {categorySkills.map((skill) => (
                  <div
                    key={skill._id?.toString()}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-body font-medium text-foreground">{skill.name}</span>
                      <StatusBadge label={skill.proficiency ?? "familiar"} tone="accent" />
                      {!skill.isPublished && <StatusBadge label="Draft" />}
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/skills/${skill._id}/edit`}
                        className="text-small font-medium text-accent hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteSkillAction.bind(null, skill._id!.toString())} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
