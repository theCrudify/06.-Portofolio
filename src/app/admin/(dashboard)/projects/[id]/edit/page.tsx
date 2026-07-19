import { notFound } from "next/navigation";
import { getProjectByIdAdmin } from "@/modules/projects/project.service";
import { getAllIndustries } from "@/modules/projects/industry.service";
import { getAllProjectTypes } from "@/modules/projects/project-type.service";
import { getAllExperiencesAdmin } from "@/modules/experiences/experience.service";
import { getAllSkillsAdmin } from "@/modules/skills/skill.service";
import { dateToInputValue } from "@/lib/validation/common";
import type { ProjectInput } from "@/lib/validation/project";
import { ProjectForm } from "../../project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, industries, projectTypes, experiences, skills] = await Promise.all([
    getProjectByIdAdmin(id),
    getAllIndustries(),
    getAllProjectTypes(),
    getAllExperiencesAdmin(),
    getAllSkillsAdmin(),
  ]);

  if (!project) {
    notFound();
  }

  const defaultValues: ProjectInput = {
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription,
    overview: project.overview ?? "",
    businessContext: project.businessContext ?? "",
    problems: project.problems ?? "",
    responsibilities: project.responsibilities ?? [],
    solution: project.solution ?? "",
    keyFeatures: project.keyFeatures ?? [],
    businessWorkflow: project.businessWorkflow ?? "",
    architectureDescription: project.architectureDescription ?? "",
    technicalChallenges: project.technicalChallenges ?? "",
    results: project.results ?? [],
    industryId: project.industryId?.toString() ?? "",
    projectTypeId: project.projectTypeId?.toString() ?? "",
    employmentType: project.employmentType as ProjectInput["employmentType"],
    role: project.role ?? "",
    relatedExperienceId: project.relatedExperienceId?.toString() ?? "",
    technologyIds: (project.technologyIds ?? []).map((technologyId) => technologyId.toString()),
    integrationIds: (project.integrationIds ?? []).map((integrationId) => integrationId.toString()),
    startDate: dateToInputValue(project.startDate),
    endDate: dateToInputValue(project.endDate),
    coverImage: project.coverImage ?? "",
    publicClientLabel: project.publicClientLabel,
    confidentialityNotice: project.confidentialityNotice ?? "",
    visibility: project.visibility as ProjectInput["visibility"],
    status: project.status as ProjectInput["status"],
    isFeatured: project.isFeatured ?? false,
    featuredOrder: project.featuredOrder ?? 0,
    sortOrder: project.sortOrder ?? 0,
    seo: {
      title: project.seo?.title ?? "",
      description: project.seo?.description ?? "",
    },
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Edit Project</h1>
      <ProjectForm
        defaultValues={defaultValues}
        industries={industries.map((industry) => ({
          _id: industry._id.toString(),
          name: industry.name,
        }))}
        projectTypes={projectTypes.map((projectType) => ({
          _id: projectType._id.toString(),
          name: projectType.name,
        }))}
        experiences={experiences.map((experience) => ({
          _id: experience._id.toString(),
          label: `${experience.position} — ${experience.publicCompanyName}`,
        }))}
        skills={skills.map((skill) => ({ _id: skill._id.toString(), name: skill.name }))}
        projectId={id}
      />
    </div>
  );
}
