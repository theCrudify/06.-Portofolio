import { getSiteSettings } from "@/modules/settings/site-settings.service";
import type { ResumeSettingsInput } from "@/lib/validation/site-settings";
import { ResumeForm } from "./resume-form";

export const dynamic = "force-dynamic";

export default async function AdminResumePage() {
  const settings = await getSiteSettings();

  const defaultValues: ResumeSettingsInput = {
    resumeUrl: settings?.resumeUrl ?? "",
    resumeDownloadEnabled: settings?.resumeDownloadEnabled ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Resume Management</h1>
      <p className="text-body mt-1 text-muted">
        Link the hosted résumé file used on the public résumé page.
      </p>
      <ResumeForm defaultValues={defaultValues} />
    </div>
  );
}
