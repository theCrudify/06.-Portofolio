import Link from "next/link";
import { getAllAchievementsAdmin } from "@/modules/achievements/achievement.service";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { primaryButtonClass } from "@/components/admin/form-styles";
import { deleteAchievementAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const achievements = await getAllAchievementsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Achievements</h1>
          <p className="text-body mt-1 text-muted">Awards, certifications, and leadership roles.</p>
        </div>
        <Link href="/admin/achievements/new" className={primaryButtonClass}>
          New Achievement
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {achievements.length === 0 && (
          <p className="text-body px-5 py-4 text-muted">No achievements yet.</p>
        )}
        {achievements.map((achievement) => (
          <div
            key={achievement._id.toString()}
            className="flex items-center justify-between px-5 py-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-body font-medium text-foreground">{achievement.title}</span>
                <StatusBadge label={achievement.type.replace(/_/g, " ")} tone="accent" />
                {!achievement.isPublished && <StatusBadge label="Draft" />}
              </div>
              {achievement.issuer && (
                <p className="text-small mt-1 text-muted">{achievement.issuer}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/achievements/${achievement._id}/edit`}
                className="text-small font-medium text-accent hover:underline"
              >
                Edit
              </Link>
              <DeleteButton action={deleteAchievementAction.bind(null, achievement._id.toString())} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
