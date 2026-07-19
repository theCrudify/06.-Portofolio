import { getProfileForAdmin } from "@/modules/profile/profile.service";
import type { ProfileInput } from "@/lib/validation/profile";
import { ProfileForm } from "./profile-form";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getProfileForAdmin();

  const defaultValues: ProfileInput = profile
    ? {
        fullName: profile.fullName,
        professionalTitle: profile.professionalTitle,
        shortSummary: profile.shortSummary,
        aboutContent: profile.aboutContent ?? "",
        publicLocation: profile.publicLocation ?? "",
        publicEmail: profile.publicEmail ?? "",
        profileImage: profile.profileImage ?? "",
        availabilityStatus:
          (profile.availabilityStatus as ProfileInput["availabilityStatus"]) ?? "open",
        primaryCTA: profile.primaryCTA,
        secondaryCTA: profile.secondaryCTA,
        statistics: profile.statistics.map((statistic) => ({
          label: statistic.label,
          value: statistic.value,
        })),
        isPublished: profile.isPublished,
      }
    : {
        fullName: "",
        professionalTitle: "",
        shortSummary: "",
        aboutContent: "",
        publicLocation: "",
        publicEmail: "",
        profileImage: "",
        availabilityStatus: "open",
        primaryCTA: "View Projects",
        secondaryCTA: "Contact Me",
        statistics: [],
        isPublished: true,
      };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Profile</h1>
      <p className="text-body mt-1 text-muted">
        The bio, headline, and statistics shown on the homepage and about page.
      </p>
      <ProfileForm defaultValues={defaultValues} />
    </div>
  );
}
