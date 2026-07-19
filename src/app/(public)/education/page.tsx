import { Container } from "@/components/shared/container";
import { getEducationEntries } from "@/modules/education/education.service";
import { getAchievements } from "@/modules/achievements/achievement.service";
import type { Achievement } from "@/modules/achievements/achievement.model";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
    new Date(date)
  );
}

function formatRange(start: Date | null | undefined, end: Date | null | undefined) {
  if (!start) return null;
  if (!end) return formatDate(start);
  return `${formatDate(start)} — ${formatDate(end)}`;
}

const ACHIEVEMENT_TYPE_ICONS: Record<string, string> = {
  certification: "Certificate",
  scholarship: "Scholarship",
  award: "Award",
  competition: "Competition",
  leadership: "Leadership",
  organization: "Organization",
  speaking_engagement: "Speaking",
};

function AchievementGroup({ title, items }: { title: string; items: Achievement[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-h3 text-foreground">{title}</h2>
      <div className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <div key={String(item._id)} className="cyber-card cyber-card-hover hud-frame-corners p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-body-lg font-semibold text-foreground">{item.title}</h3>
              {item.date && (
                <p className="shrink-0 text-[12px] font-bold uppercase tracking-wider text-muted">
                  {formatRange(item.date, item.endDate)}
                </p>
              )}
            </div>
            {item.issuer && (
              <p className="mt-1 text-[12px] font-bold uppercase tracking-wider text-muted">
                {ACHIEVEMENT_TYPE_ICONS[item.type] ?? item.type} &middot; {item.issuer}
              </p>
            )}
            {item.description && (
              <p className="mt-2 text-body text-muted">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function EducationPage() {
  const [educationEntries, achievements] = await Promise.all([
    getEducationEntries(),
    getAchievements(),
  ]);

  const certifications = achievements.filter((a) =>
    ["certification", "scholarship"].includes(a.type)
  );
  const competitions = achievements.filter((a) => ["award", "competition"].includes(a.type));
  const leadership = achievements.filter((a) =>
    ["leadership", "organization", "speaking_engagement"].includes(a.type)
  );

  return (
    <Container as="main">
      <div className="py-12 lg:py-16 max-w-4xl mx-auto">
      <p className="id-badge text-label text-accent">01. Education</p>
      <h1 className="text-h1 mt-2 text-foreground">Education &amp; Achievements</h1>

      {educationEntries.length > 0 ? (
        <div className="mt-8">
          {educationEntries.map((entry) => (
            <div
              key={String(entry._id)}
              className="cyber-card hud-frame-corners py-6 px-5"

            >
              <p className="text-[12px] font-bold uppercase tracking-wider text-muted">
                {formatRange(entry.startDate, entry.endDate)}
              </p>
              <h2 className="text-h3 mt-2 text-foreground">{entry.institution}</h2>
              <p className="mt-1 text-body text-muted">
                {entry.degree}
                {entry.fieldOfStudy ? ` — ${entry.fieldOfStudy}` : ""}
              </p>
              {entry.location && (
                <p className="mt-1 text-[12px] font-bold uppercase tracking-wider text-muted">{entry.location}</p>
              )}
              {typeof entry.gpa === "number" && (
                <p className="mt-2.5 inline-flex items-center border border-accent/50 bg-surface px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-accent">
                  GPA: {entry.gpa.toFixed(2)}
                  {entry.maximumGpa ? ` / ${entry.maximumGpa.toFixed(2)}` : ""}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-body text-muted">No education entries published yet.</p>
      )}

      <AchievementGroup title="Certifications" items={certifications} />
      <AchievementGroup title="Competitions & Awards" items={competitions} />
      <AchievementGroup title="Leadership & Organizational Experience" items={leadership} />
      </div>
    </Container>
  );
}
