import type { AchievementInput } from "@/lib/validation/achievement";
import { AchievementForm } from "../achievement-form";

const defaultValues: AchievementInput = {
  title: "",
  type: "award",
  issuer: "",
  date: "",
  endDate: "",
  description: "",
  evidenceUrl: "",
  sortOrder: 0,
  isPublished: true,
};

export default function NewAchievementPage() {
  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">New Achievement</h1>
      <AchievementForm defaultValues={defaultValues} />
    </div>
  );
}
