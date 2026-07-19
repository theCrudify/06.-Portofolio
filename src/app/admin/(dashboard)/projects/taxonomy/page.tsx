import { getAllIndustries } from "@/modules/projects/industry.service";
import { getAllProjectTypes } from "@/modules/projects/project-type.service";
import { TaxonomyList } from "./taxonomy-list";
import {
  createIndustryAction,
  updateIndustryAction,
  deleteIndustryAction,
  createProjectTypeAction,
  updateProjectTypeAction,
  deleteProjectTypeAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function ProjectTaxonomyPage() {
  const [industries, projectTypes] = await Promise.all([
    getAllIndustries(),
    getAllProjectTypes(),
  ]);

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Industries & Project Types</h1>
      <p className="text-body mt-1 text-muted">
        Manage the lookup lists used on the project form.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <TaxonomyList
          title="Industries"
          items={industries.map((industry) => ({
            _id: industry._id.toString(),
            name: industry.name,
            slug: industry.slug,
            sortOrder: industry.sortOrder ?? 0,
          }))}
          onCreate={createIndustryAction}
          onUpdate={updateIndustryAction}
          onDelete={deleteIndustryAction}
        />
        <TaxonomyList
          title="Project Types"
          items={projectTypes.map((projectType) => ({
            _id: projectType._id.toString(),
            name: projectType.name,
            slug: projectType.slug,
            sortOrder: projectType.sortOrder ?? 0,
          }))}
          onCreate={createProjectTypeAction}
          onUpdate={updateProjectTypeAction}
          onDelete={deleteProjectTypeAction}
        />
      </div>
    </div>
  );
}
