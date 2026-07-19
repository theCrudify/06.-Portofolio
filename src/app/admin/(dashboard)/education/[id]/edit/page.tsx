import { notFound } from "next/navigation";
import { getEducationById } from "@/modules/education/education.service";
import { dateToInputValue } from "@/lib/validation/common";
import type { EducationInput } from "@/lib/validation/education";
import { EducationForm } from "../../education-form";

export const dynamic = "force-dynamic";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await getEducationById(id);
  if (!entry) {
    notFound();
  }

  const defaultValues: EducationInput = {
    institution: entry.institution,
    degree: entry.degree,
    fieldOfStudy: entry.fieldOfStudy ?? "",
    location: entry.location ?? "",
    startDate: dateToInputValue(entry.startDate),
    endDate: dateToInputValue(entry.endDate),
    gpa: entry.gpa != null ? String(entry.gpa) : "",
    maximumGpa: entry.maximumGpa != null ? String(entry.maximumGpa) : "",
    description: entry.description ?? "",
    scholarships: entry.scholarships ?? [],
    sortOrder: entry.sortOrder ?? 0,
    isPublished: entry.isPublished ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Edit Education Entry</h1>
      <EducationForm defaultValues={defaultValues} educationId={id} />
    </div>
  );
}
