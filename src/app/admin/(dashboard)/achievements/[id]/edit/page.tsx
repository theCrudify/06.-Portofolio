import { notFound } from "next/navigation";
import { getAchievementById } from "@/modules/achievements/achievement.service";
import { dateToInputValue } from "@/lib/validation/common";
import type { AchievementInput } from "@/lib/validation/achievement";
import { AchievementForm } from "../../achievement-form";

export const dynamic = "force-dynamic";

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = await getAchievementById(id);
  if (!achievement) {
    notFound();
  }

  const defaultValues: AchievementInput = {
    title: achievement.title,
    type: achievement.type as AchievementInput["type"],
    issuer: achievement.issuer ?? "",
    date: dateToInputValue(achievement.date),
    endDate: dateToInputValue(achievement.endDate),
    description: achievement.description ?? "",
    evidenceUrl: achievement.evidenceUrl ?? "",
    sortOrder: achievement.sortOrder ?? 0,
    isPublished: achievement.isPublished ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Edit Achievement</h1>
      <AchievementForm defaultValues={defaultValues} achievementId={id} />
    </div>
  );
}
