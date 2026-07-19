import { Container } from "@/components/shared/container";

export default function SkillsPage() {
  return (
    <Container as="main">
      <div className="py-12 lg:py-16">
        <p className="text-label text-accent">Skills</p>
        <h1 className="text-h1 mt-2 text-foreground">Technical Skills</h1>
        <p className="text-body mt-4 max-w-prose text-muted">
          Skills grouped by category coming soon.
        </p>
      </div>
    </Container>
  );
}
