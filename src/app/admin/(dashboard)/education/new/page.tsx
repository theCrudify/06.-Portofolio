import type { EducationInput } from "@/lib/validation/education";
import { EducationForm } from "../education-form";

const defaultValues: EducationInput = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  gpa: "",
  maximumGpa: "",
  description: "",
  scholarships: [],
  sortOrder: 0,
  isPublished: true,
};

export default function NewEducationPage() {
  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">New Education Entry</h1>
      <EducationForm defaultValues={defaultValues} />
    </div>
  );
}
