import Link from "next/link";

export type ProjectCardData = {
  slug: string;
  title: string;
  clientLabel: string;
  description: string;
  technologies: string[];
  industry: string;
  role: string;
  year?: string;
};

const INDUSTRY_ACCENT: Record<string, string> = {
  Manufacturing: "border-amber-500/50 text-amber-600 dark:text-amber-400",
  Mining: "border-orange-500/50 text-orange-600 dark:text-orange-400",
  "Human Resources": "border-violet-500/50 text-violet-600 dark:text-violet-400",
  Customs: "border-emerald-500/50 text-emerald-600 dark:text-emerald-400",
  Enterprise: "border-accent/50 text-accent",
};

const MAX_VISIBLE_TAGS = 3;

export function ProjectCard({
  project,
  size = "default",
}: {
  project: ProjectCardData;
  size?: "default" | "large";
}) {
  const visibleTags = project.technologies.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = project.technologies.length - visibleTags.length;

  const accentClass =
    INDUSTRY_ACCENT[project.industry] ?? "border-border text-muted";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="cyber-card cyber-card-hover group flex h-full flex-col"
    >
      <div className={`flex flex-1 flex-col gap-3 p-5 ${size === "large" ? "p-6" : ""}`}>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center border px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider ${accentClass}`}
          >
            {project.industry}
          </span>
          {project.year && (
            <span className="text-[12px] font-bold uppercase tracking-wider text-muted">{project.year}</span>
          )}
        </div>

        <h3
          className={`font-bold tracking-tight text-foreground ${
            size === "large" ? "text-h3" : "text-h4"
          }`}
        >
          {project.title}
        </h3>

        <p className="text-body line-clamp-2 text-muted">{project.description}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <p className="text-[13px] font-bold uppercase tracking-wider text-muted">
            {project.role} &middot; {project.clientLabel}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {visibleTags.map((tech) => (
              <span
                key={tech}
                className="border border-border/50 bg-surface-muted px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider text-muted"
              >
                {tech}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="text-[12px] font-bold uppercase tracking-wider text-muted">
                +{overflowCount}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-accent transition-all duration-200 group-hover:gap-2">
            View case study
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                fillRule="evenodd"
                d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
