import Link from "next/link";
import { getAllProjectsAdmin } from "@/modules/projects/project.service";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { primaryButtonClass, secondaryButtonClass } from "@/components/admin/form-styles";
import { deleteProjectAction } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_TONE = {
  draft: "neutral",
  published: "success",
  archived: "warning",
} as const;

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Projects</h1>
          <p className="text-body mt-1 text-muted">Case studies shown on the public site.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/projects/taxonomy" className={secondaryButtonClass}>
            Industries & Types
          </Link>
          <Link href="/admin/projects/new" className={primaryButtonClass}>
            New Project
          </Link>
        </div>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {projects.length === 0 && <p className="text-body px-5 py-4 text-muted">No projects yet.</p>}
        {projects.map((project) => (
          <div key={project._id.toString()} className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-body font-medium text-foreground">{project.title}</span>
                <StatusBadge label={project.status} tone={STATUS_TONE[project.status as keyof typeof STATUS_TONE] ?? "neutral"} />
                {project.isFeatured && <StatusBadge label="Featured" tone="accent" />}
              </div>
              <p className="text-small mt-1 text-muted">{project.publicClientLabel}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/projects/${project._id}/edit`}
                className="text-small font-medium text-accent hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteProjectAction.bind(null, project._id.toString())}
                confirmMessage="Delete this project? It will be removed from the public site."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
