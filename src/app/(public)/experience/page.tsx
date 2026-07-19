import Link from "next/link";
import { Container } from "@/components/shared/container";
import { getAllExperiences } from "@/modules/experiences/experience.service";
import { getPublishedProjects } from "@/modules/projects/project.service";

export const dynamic = "force-dynamic";

const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
  professional: "Full-time",
  internship: "Internship",
  freelance: "Freelance",
  personal: "Personal",
  open_source: "Open Source",
};

function formatPeriod(startDate: Date, endDate: Date | null | undefined, isCurrent: boolean) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
  const start = formatter.format(new Date(startDate));
  const end = isCurrent || !endDate ? "Present" : formatter.format(new Date(endDate));
  return `${start} — ${end}`;
}

function formatYear(date: Date) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(new Date(date));
}

export default async function ExperiencePage() {
  const [experiences, projects] = await Promise.all([
    getAllExperiences(),
    getPublishedProjects(),
  ]);

  return (
    <Container as="main">
      <div className="grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* Left - sticky header */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="id-badge text-label text-accent">01. Experience</p>
          <h1 className="text-h1 mt-2 text-foreground">Work History</h1>
          <p className="mt-3 text-body leading-relaxed text-muted">
            Roles, responsibilities, and outcomes across professional, freelance, and internship
            work.
          </p>
        </div>

        {/* Right - timeline */}
        <div>
          {experiences.length > 0 ? (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px">
                <div className="absolute inset-0 w-px bg-accent/20" />
                <div className="timeline-glow absolute inset-0 w-px" />
              </div>

              <div className="flex flex-col gap-0">
                {experiences.map((experience) => {
                  const relatedProjects = projects.filter(
                    (project) =>
                      project.relatedExperienceId &&
                      String(project.relatedExperienceId) === String(experience._id)
                  );

                  return (
                    <div key={String(experience._id)} className="relative pl-8 pb-10 last:pb-0">
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center">
                        <span
                          className={`size-2.5 rounded-full border-2 border-background ${
                            experience.isCurrent ? "bg-accent" : "bg-muted/40"
                          }`}
                        />
                      </div>

                      {/* Period */}
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-[12px] font-bold uppercase tracking-wider text-muted">
                          {formatPeriod(
                            experience.startDate,
                            experience.endDate,
                            experience.isCurrent ?? false
                          )}
                        </p>
                        {experience.isCurrent && (
                          <span className="inline-flex items-center gap-1 border border-accent px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wider text-accent">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Title + Company */}
                      <h2 className="text-h2 mt-2 text-foreground">
                        {experience.position}
                      </h2>
                      <p className="mt-1 text-[13px] font-bold uppercase tracking-wider text-muted">
                        {experience.publicCompanyName}
                        {experience.location ? ` \u00b7 ${experience.location}` : ""}
                      </p>
                      <p className="mt-0.5 text-[12px] font-bold uppercase tracking-wider text-muted/70">
                        {EMPLOYMENT_TYPE_LABEL[experience.employmentType] ?? experience.employmentType}
                        {experience.employmentBasis ? ` \u00b7 ${experience.employmentBasis}` : ""}
                      </p>

                      {/* Summary */}
                      {experience.summary && (
                        <p className="mt-4 text-body leading-relaxed text-muted">
                          {experience.summary}
                        </p>
                      )}

                      {/* Achievements */}
                      {experience.achievements.length > 0 && (
                        <ul className="mt-4 flex flex-col gap-2.5">
                          {experience.achievements.slice(0, 6).map((achievement) => (
                            <li
                              key={achievement}
                              className="flex gap-3 text-body text-muted"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="mt-1 size-4 shrink-0 text-accent/50"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech */}
                      {experience.technologyIds.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.technologyIds.map((skill) => (
                            <span
                              key={skill.slug}
                              className="border border-border/50 bg-surface-muted px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider text-muted"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Related Projects */}
                      {relatedProjects.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                          {relatedProjects.map((project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
                            >
                              {project.title}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-3.5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-body text-muted">No experience entries published yet.</p>
          )}
        </div>
      </div>
    </Container>
  );
}
