import { getAllIndustries } from "@/modules/projects/industry.service";
import { getAllProjectTypes } from "@/modules/projects/project-type.service";
import { getAllExperiencesAdmin } from "@/modules/experiences/experience.service";
import { getAllSkillsAdmin } from "@/modules/skills/skill.service";
import type { ProjectInput } from "@/lib/validation/project";
import { ProjectForm } from "../project-form";

export const dynamic = "force-dynamic";

const defaultValues: ProjectInput = {
  title: "",
  slug: "",
  shortDescription: "",
  overview: "",
  businessContext: "",
  problems: "",
  responsibilities: [],
  solution: "",
  keyFeatures: [],
  businessWorkflow: "",
  architectureDescription: "",
  technicalChallenges: "",
  results: [],
  industryId: "",
  projectTypeId: "",
  employmentType: "professional",
  role: "",
  relatedExperienceId: "",
  technologyIds: [],
  integrationIds: [],
  startDate: "",
  endDate: "",
  coverImage: "",
  publicClientLabel: "",
  confidentialityNotice: "",
  visibility: "public",
  status: "draft",
  isFeatured: false,
  featuredOrder: 0,
  sortOrder: 0,
  seo: { title: "", description: "" },
};

export default async function NewProjectPage() {
  const [industries, projectTypes, experiences, skills] = await Promise.all([
    getAllIndustries(),
    getAllProjectTypes(),
    getAllExperiencesAdmin(),
    getAllSkillsAdmin(),
  ]);

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">New Project</h1>
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
      />
    </div>
  );
}
