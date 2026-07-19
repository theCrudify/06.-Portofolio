import { ProjectCard, type ProjectCardData } from "@/components/public/project-card";
import { Container } from "@/components/shared/container";
import { getPublishedProjects } from "@/modules/projects/project.service";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  const projectCards: ProjectCardData[] = projects.map((project) => ({
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

  return (
    <Container as="main">
      <div className="py-12 lg:py-16">
        <p className="id-badge text-label text-accent">01. Work</p>
        <h1 className="text-h1 mt-2 text-foreground">Projects</h1>
        <p className="text-body mt-3 max-w-prose text-muted">
          {projectCards.length} case {projectCards.length === 1 ? "study" : "studies"} covering
          enterprise applications, integrations, and internal tooling.
        </p>

        {projectCards.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projectCards.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-body text-muted">No projects published yet.</p>
        )}
      </div>
    </Container>
  );
}
