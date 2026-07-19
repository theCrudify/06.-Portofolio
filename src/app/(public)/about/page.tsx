import Link from "next/link";
import { Container } from "@/components/shared/container";
import { ProfileAvatar } from "@/components/public/profile-avatar";
import { getProfile } from "@/modules/profile/profile.service";
import { getPublishedProjects } from "@/modules/projects/project.service";

export const dynamic = "force-dynamic";

const ENGINEERING_APPROACH = [
  {
    number: "01",
    title: "Process before system",
    description:
      "Requirement gathering and business-process analysis come before architecture. Every project starts by mapping how the business actually works.",
  },
  {
    number: "02",
    title: "Full lifecycle ownership",
    description:
      "From client consultations and prototyping through architecture, integration, deployment, and production support — not handing off between phases.",
  },
  {
    number: "03",
    title: "Built for reuse",
    description:
      "A reusable enterprise full-stack template now standardizes architecture, auth/RBAC, and deployment foundations across new engagements.",
  },
  {
    number: "04",
    title: "Integration-first error handling",
    description:
      "SAP, customs, and payment integrations fail in production if error handling is an afterthought — it's designed in from the start.",
  },
];

export default async function AboutPage() {
  const [profile, projects] = await Promise.all([getProfile(), getPublishedProjects()]);

  const industries = Array.from(
    new Set(projects.map((project) => project.industryId?.name).filter(Boolean))
  ) as string[];

  return (
    <Container as="main">
      {/* Header */}
      <section className="py-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          {/* Left column - sticky avatar + name */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex flex-col items-start gap-4">
              <div className="relative size-28 overflow-hidden border border-accent/50 bg-surface">
                <ProfileAvatar
                  fullName={profile?.fullName ?? ""}
                  src="/images/profile-photo.png"
                  variant="sidebar"
                />
              </div>
              <div>
                <h1 className="text-h1 text-foreground">
                  {profile?.fullName ?? "Profile not configured"}
                </h1>
                {profile?.professionalTitle && (
                  <p className="mt-1.5 text-[13px] font-bold uppercase tracking-wider text-muted">{profile.professionalTitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column - content */}
          <div className="flex flex-col gap-8">
            {/* Bio */}
            {profile?.aboutContent && (
              <div className="flex flex-col gap-4">
                {profile.aboutContent.split("\n").filter(Boolean).map((paragraph, i) => (
                  <p key={i} className="text-body-lg text-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Industries */}
            {industries.length > 0 && (
              <div>
                <p className="text-label text-accent">Industries</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      className="border border-accent/30 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-accent"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Engineering Approach */}
      <section className="py-10 lg:py-14">
        <p className="id-badge text-label text-accent">01. How I Work</p>
        <h2 className="text-h2 mt-2 text-foreground">Engineering Philosophy</h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ENGINEERING_APPROACH.map((item) => (
            <div
              key={item.number}
              className="cyber-card cyber-card-hover hud-frame-corners p-6"
            >
              <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-accent/60">
                {item.number}
              </span>
              <h3 className="text-h4 mt-2 text-foreground">{item.title}</h3>
              <p className="mt-2 text-body text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="id-badge text-label text-accent">02. Contact</p>
            <h2 className="text-h3 mt-2 text-foreground">
              Let&apos;s work together
            </h2>
            <p className="mt-2 max-w-md text-body text-muted">
              Open to full-time roles, freelance projects, and technical collaboration.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-6 text-[13px] font-bold uppercase tracking-wider text-accent-foreground transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--glow)]"
          >
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </Container>
  );
}
