import Link from "next/link";
import { getAllExperiencesAdmin } from "@/modules/experiences/experience.service";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { primaryButtonClass } from "@/components/admin/form-styles";
import { deleteExperienceAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminExperiencesPage() {
  const experiences = await getAllExperiencesAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Experiences</h1>
          <p className="text-body mt-1 text-muted">Work history shown on the experience page.</p>
        </div>
        <Link href="/admin/experiences/new" className={primaryButtonClass}>
          New Experience
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {experiences.length === 0 && (
          <p className="text-body px-5 py-4 text-muted">No experiences yet.</p>
        )}
        {experiences.map((experience) => (
          <div
            key={experience._id.toString()}
            className="flex items-center justify-between px-5 py-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-body font-medium text-foreground">
                  {experience.position}
                </span>
                {experience.isCurrent && <StatusBadge label="Current" tone="success" />}
                {!experience.isPublished && <StatusBadge label="Draft" />}
              </div>
              <p className="text-small mt-1 text-muted">{experience.publicCompanyName}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/experiences/${experience._id}/edit`}
                className="text-small font-medium text-accent hover:underline"
              >
                Edit
              </Link>
              <DeleteButton action={deleteExperienceAction.bind(null, experience._id.toString())} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
