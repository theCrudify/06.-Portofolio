import Link from "next/link";
import { getAllEducationAdmin } from "@/modules/education/education.service";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { primaryButtonClass } from "@/components/admin/form-styles";
import { deleteEducationAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const entries = await getAllEducationAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Education</h1>
          <p className="text-body mt-1 text-muted">Academic background shown on the about page.</p>
        </div>
        <Link href="/admin/education/new" className={primaryButtonClass}>
          New Entry
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {entries.length === 0 && <p className="text-body px-5 py-4 text-muted">No education entries yet.</p>}
        {entries.map((entry) => (
          <div key={entry._id.toString()} className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-body font-medium text-foreground">{entry.institution}</span>
                {!entry.isPublished && <StatusBadge label="Draft" />}
              </div>
              <p className="text-small mt-1 text-muted">
                {entry.degree}
                {entry.fieldOfStudy ? ` — ${entry.fieldOfStudy}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/education/${entry._id}/edit`}
                className="text-small font-medium text-accent hover:underline"
              >
                Edit
              </Link>
              <DeleteButton action={deleteEducationAction.bind(null, entry._id.toString())} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
