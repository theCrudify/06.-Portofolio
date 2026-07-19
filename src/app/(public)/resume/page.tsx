import { Container } from "@/components/shared/container";
import { getSiteSettings } from "@/modules/settings/site-settings.service";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const settings = await getSiteSettings();
  const canDownload = Boolean(settings?.resumeDownloadEnabled && settings?.resumeUrl);

  return (
    <Container as="main">
      <div className="py-12 lg:py-16">
      <p className="text-label text-accent">Resume</p>
      <h1 className="text-h1 mt-2 text-foreground">Resume</h1>

      {canDownload ? (
        <>
          <p className="text-body mt-4 text-muted">
            Download the latest resume as a PDF.
          </p>
          <a
            href={settings!.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-6 text-[13px] font-bold uppercase tracking-wider text-accent-foreground transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--glow)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            Download Resume
          </a>
        </>
      ) : (
        <p className="text-body mt-4 text-muted">
          Resume download is not currently available.
        </p>
      )}
      </div>
    </Container>
  );
}
