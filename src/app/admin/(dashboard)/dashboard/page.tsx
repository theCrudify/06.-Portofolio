import Link from "next/link";
import { getDashboardStats } from "@/modules/dashboard/dashboard.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Published projects", value: stats.publishedProjects, href: "/admin/projects" },
    { label: "Draft projects", value: stats.draftProjects, href: "/admin/projects" },
    { label: "Skills", value: stats.totalSkills, href: "/admin/skills" },
    { label: "Experiences", value: stats.totalExperiences, href: "/admin/experiences" },
    { label: "Education entries", value: stats.totalEducation, href: "/admin/education" },
    { label: "Achievements", value: stats.totalAchievements, href: "/admin/achievements" },
    { label: "Unread messages", value: stats.unreadMessages, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Dashboard</h1>
      <p className="text-body mt-1 text-muted">Overview of your portfolio content.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <p className="text-h2 font-semibold text-foreground">{card.value}</p>
            <p className="text-small mt-1 text-muted">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
