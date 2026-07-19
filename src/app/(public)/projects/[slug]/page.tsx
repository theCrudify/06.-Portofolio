import { Container } from "@/components/shared/container";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Container as="main">
      <div className="py-12 lg:py-16">
        <p className="text-label text-accent">Case Study</p>
        <h1 className="text-h1 mt-2 text-foreground">{slug}</h1>
        <p className="text-body mt-4 max-w-prose text-muted">Case study content coming soon.</p>
      </div>
    </Container>
  );
}
