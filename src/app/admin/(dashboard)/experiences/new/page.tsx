import { getAllSkillsAdmin } from "@/modules/skills/skill.service";
import type { ExperienceInput } from "@/lib/validation/experience";
import { ExperienceForm } from "../experience-form";

export const dynamic = "force-dynamic";

const defaultValues: ExperienceInput = {
  companyName: "",
  publicCompanyName: "",
  position: "",
  employmentType: "professional",
  employmentBasis: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  summary: "",
  responsibilities: [],
  achievements: [],
  technologyIds: [],
  companyLogo: "",
  website: "",
  sortOrder: 0,
  isPublished: true,
};

export default async function NewExperiencePage() {
  const skills = await getAllSkillsAdmin();

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">New Experience</h1>
      <ExperienceForm
        defaultValues={defaultValues}
        skills={skills.map((skill) => ({ _id: skill._id.toString(), name: skill.name }))}
      />
    </div>
  );
}
