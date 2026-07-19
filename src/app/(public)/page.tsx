import Link from "next/link";
import { ProjectCard, type ProjectCardData } from "@/components/public/project-card";
import { AnimatedSection } from "@/components/public/animated-section";
import { Container } from "@/components/shared/container";
import { DataStream } from "@/components/public/data-stream";
import { HudOverlay } from "@/components/public/hud-overlay";
import { TypingText } from "@/components/public/typing-text";
import { ProfileAvatar } from "@/components/public/profile-avatar";
import { getProfile } from "@/modules/profile/profile.service";
import { getFeaturedProjects } from "@/modules/projects/project.service";
import { getRecentExperiences } from "@/modules/experiences/experience.service";
import { getSkillCategories } from "@/modules/skills/skill-category.service";
import { getAllSkills } from "@/modules/skills/skill.service";
import { getSiteSettings } from "@/modules/settings/site-settings.service";

export const dynamic = "force-dynamic";

const AVAILABILITY_LABEL: Record<string, string> = {
  open: "Available for new opportunities",
  limited: "Limited availability",
  unavailable: "Not currently available",
};

function formatPeriod(startDate: Date, endDate: Date | null | undefined, isCurrent: boolean) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
  const start = formatter.format(new Date(startDate));
  const end = isCurrent || !endDate ? "Present" : formatter.format(new Date(endDate));
  return `${start} — ${end}`;
}

export default async function Home() {
  const [profile, featuredProjects, recentExperiences, skillCategories, allSkills, siteSettings] =
    await Promise.all([
      getProfile(),
      getFeaturedProjects(),
      getRecentExperiences(3),
      getSkillCategories(),
      getAllSkills(),
      getSiteSettings(),
    ]);

  const projectCards: ProjectCardData[] = featuredProjects.map((project) => ({
    slug: project.slug,
    title: project.title,
    clientLabel: project.publicClientLabel,
    description: project.shortDescription,
    technologies: [...project.technologyIds, ...project.integrationIds].map(
      (skill) => skill.name
    ),
    industry: project.industryId?.name ?? "Enterprise",
    role: project.role || "Full Stack Web Engineer",
    year: project.startDate ? new Date(project.startDate).getFullYear().toString() : undefined,
  }));

  const [largeProject, ...smallProjects] = projectCards;

  const skillsByCategory = new Map<string, typeof allSkills>();
  for (const skill of allSkills) {
    const key = String(skill.categoryId);
    skillsByCategory.set(key, [...(skillsByCategory.get(key) ?? []), skill]);
  }

  const availabilityLabel = profile?.availabilityStatus
    ? AVAILABILITY_LABEL[profile.availabilityStatus] ?? null
    : null;

  return (
    <div className="scanlines">
      {/* Hero */}
      <HudOverlay as="section" className="relative isolate overflow-hidden cyber-grid" showCoordinates={true} showScanLine={false} label="SYS::HOME">
        <DataStream />
        <Container>
          <div className="relative z-[1] grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-24">
            <div>
              {availabilityLabel && (
                <p className="flicker mb-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-success">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  {availabilityLabel}
                </p>
              )}

              <h1
                className="glitch text-display text-foreground"
                data-text={profile?.professionalTitle ?? "Profile not configured"}
              >
                {profile?.professionalTitle ?? "Profile not configured"}
              </h1>

              <p className="text-body-lg mt-6 max-w-xl text-muted">
                <TypingText
                  text={profile?.shortSummary ?? "Add a profile document in the database to populate this section."}
                  speed={20}
                  cursor={false}
                />
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex h-12 items-center justify-center border border-accent bg-accent px-6 text-[13px] font-bold uppercase tracking-wider text-accent-foreground transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--glow)]"
                >
                  View Projects
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex h-12 items-center justify-center border border-border px-6 text-[13px] font-bold uppercase tracking-wider text-foreground transition-all duration-200 hover:border-accent/50 hover:text-accent"
                >
                  Download Resume
                </Link>
              </div>

              {siteSettings && (
                <div className="mt-8 flex items-center gap-5 text-[13px] font-bold uppercase tracking-wider text-muted">
                  {siteSettings.socialLinks?.github && (
                    <a
                      href={siteSettings.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-200 hover:text-accent"
                    >
                      GitHub
                    </a>
                  )}
                  {siteSettings.socialLinks?.linkedin && (
                    <a
                      href={siteSettings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-200 hover:text-accent"
                    >
                      LinkedIn
                    </a>
                  )}
                  {siteSettings.publicEmail && (
                    <a
                      href={`mailto:${siteSettings.publicEmail}`}
                      className="transition-all duration-200 hover:text-accent"
                    >
                      Email
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="hologram mx-auto max-w-[480px] aspect-square w-full overflow-hidden border border-accent/50 bg-surface animate-accent-pulse">
                <ProfileAvatar
                  fullName={profile?.fullName ?? ""}
                  src="/images/profile-photo.png"
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </Container>
      </HudOverlay>

      {/* Stats */}
      {profile && profile.statistics.length > 0 && (
        <section>
          <AnimatedSection>
            <Container>
              <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
                {[...profile.statistics]
                  .sort((a, b) => a.order - b.order)
                  .map((stat) => (
                    <div key={stat.label} className="bg-surface px-6 py-8">
                      <p className="text-h2 font-extrabold tracking-tight text-accent">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[12px] font-bold uppercase tracking-wider text-muted">{stat.label}</p>
                    </div>
                  ))}
              </div>
            </Container>
          </AnimatedSection>
        </section>
      )}

      {/* Featured Projects */}
      <section className="py-12 lg:py-16">
        <AnimatedSection>
          <Container>
            <div className="flex items-end justify-between gap-4 pb-4">
              <div>
                <p className="id-badge text-label text-accent">
                  01. Selected Work
                </p>
                <h2 className="text-h2 mt-2 text-foreground">Featured Projects</h2>
              </div>
              <Link
                href="/projects"
                className="hidden text-[13px] font-bold uppercase tracking-wider text-muted transition-all duration-200 hover:text-accent sm:inline-flex"
              >
                View all
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="ml-1 size-4">
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {largeProject ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <ProjectCard project={largeProject} size="large" />
                </div>
                <div className="flex flex-col gap-5">
                  {smallProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-8 text-body text-muted">No featured projects published yet.</p>
            )}

            <Link
              href="/projects"
              className="mt-5 inline-flex text-[13px] font-bold uppercase tracking-wider text-muted transition-all hover:text-accent sm:hidden"
            >
              View all projects
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="ml-1 size-4">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Link>
          </Container>
        </AnimatedSection>
      </section>

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className="py-12 lg:py-16">
          <AnimatedSection>
            <Container>
              <p className="id-badge text-label text-accent">02. What I Do</p>
              <h2 className="text-h2 mt-2 text-foreground">Core Expertise</h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((category) => {
                  const categorySkills = skillsByCategory.get(String(category._id)) ?? [];
                  return (
                    <div key={category.slug} className="cyber-card cyber-card-hover hud-frame-corners p-6">
                      <h3 className="text-h4 text-foreground">{category.name}</h3>
                      <p className="mt-2 text-[13px] font-bold uppercase tracking-wider text-muted">{category.description}</p>
                      {categorySkills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {categorySkills.slice(0, 5).map((skill) => (
                            <span
                              key={skill.slug}
                              className="border border-border/50 bg-surface-muted px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Container>
          </AnimatedSection>
        </section>
      )}

      {/* Experience */}
      {recentExperiences.length > 0 && (
        <section className="py-12 lg:py-16">
          <AnimatedSection>
            <Container>
              <p className="id-badge text-label text-accent">03. Experience</p>
              <h2 className="text-h2 mt-2 text-foreground">Recent Experience</h2>

              <div className="cyber-card hud-frame-corners">
                {recentExperiences.map((experience) => (
                  <Link
                    key={String(experience._id)}
                    href="/experience"
                    className="group flex flex-col gap-2 px-6 py-5 transition-all duration-200 hover:bg-accent/5 hover:pl-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:hover:pl-8"
                  >
                    <div className="shrink-0 sm:w-40">
                      <p className="text-[12px] font-bold uppercase tracking-wider text-muted">
                        {formatPeriod(
                          experience.startDate,
                          experience.endDate,
                          experience.isCurrent ?? false
                        )}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-h4 text-foreground group-hover:text-accent transition-colors duration-200">
                        {experience.position}
                      </p>
                      <p className="mt-1 text-[13px] font-bold uppercase tracking-wider text-muted">
                        {experience.publicCompanyName}
                        {experience.location ? ` · ${experience.location}` : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </AnimatedSection>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <AnimatedSection>
          <Container>
            <div className="cyber-card cyber-card-hover hud-frame-corners p-8 transition-all duration-200 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {availabilityLabel && (
                    <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-success">
                      {availabilityLabel}
                    </p>
                  )}
                  <h2 className="text-h3 text-foreground">
                    Have a project or opportunity in mind?
                  </h2>
                  <p className="mt-2 max-w-md text-body text-muted">
                    I&apos;m open to full-time roles, freelance projects, and technical collaboration.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center border border-accent bg-accent px-6 text-[13px] font-bold uppercase tracking-wider text-accent-foreground transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--glow)]"
                  >
                    Get in Touch
                  </Link>
                  {siteSettings?.socialLinks?.linkedin && (
                    <a
                      href={siteSettings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center border border-border px-6 text-[13px] font-bold uppercase tracking-wider text-foreground transition-all duration-200 hover:border-accent/50 hover:text-accent"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </AnimatedSection>
      </section>
    </div>
  );
}
