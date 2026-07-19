import { notFound } from "next/navigation";
import { getExperienceById } from "@/modules/experiences/experience.service";
import { getAllSkillsAdmin } from "@/modules/skills/skill.service";
import { dateToInputValue } from "@/lib/validation/common";
import type { ExperienceInput } from "@/lib/validation/experience";
import { ExperienceForm } from "../../experience-form";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [experience, skills] = await Promise.all([
    getExperienceById(id),
    getAllSkillsAdmin(),
  ]);

  if (!experience) {
    notFound();
  }

  const defaultValues: ExperienceInput = {
    companyName: experience.companyName,
    publicCompanyName: experience.publicCompanyName,
    position: experience.position,
    employmentType: experience.employmentType as ExperienceInput["employmentType"],
    employmentBasis: experience.employmentBasis ?? "",
    location: experience.location ?? "",
    startDate: dateToInputValue(experience.startDate),
    endDate: dateToInputValue(experience.endDate),
    isCurrent: experience.isCurrent ?? false,
    summary: experience.summary ?? "",
    responsibilities: experience.responsibilities ?? [],
    achievements: experience.achievements ?? [],
    technologyIds: (experience.technologyIds ?? []).map((id) => id.toString()),
    companyLogo: experience.companyLogo ?? "",
    website: experience.website ?? "",
    sortOrder: experience.sortOrder ?? 0,
    isPublished: experience.isPublished ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Edit Experience</h1>
      <ExperienceForm
        defaultValues={defaultValues}
        skills={skills.map((skill) => ({ _id: skill._id.toString(), name: skill.name }))}
        experienceId={id}
      />
    </div>
  );
}
