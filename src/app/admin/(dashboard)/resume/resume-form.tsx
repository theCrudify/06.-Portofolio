"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { resumeSettingsSchema, type ResumeSettingsInput } from "@/lib/validation/site-settings";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { saveResumeSettingsAction } from "./actions";

export function ResumeForm({ defaultValues }: { defaultValues: ResumeSettingsInput }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResumeSettingsInput>({
    resolver: zodResolver(resumeSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: ResumeSettingsInput) {
    setServerError(null);
    setSaved(false);
    const result = await saveResumeSettingsAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>Résumé URL</label>
        <input
          className={inputClass}
          placeholder="https://…"
          {...register("resumeUrl")}
        />
        <p className="text-small mt-1.5 text-muted">
          Link to a hosted PDF (e.g. Google Drive, Dropbox) the public résumé page will link to.
        </p>
        {errors.resumeUrl && <p className={fieldErrorClass}>{errors.resumeUrl.message}</p>}
      </div>

      <div className="flex items-center gap-2.5">
        <input
          id="resumeDownloadEnabled"
          type="checkbox"
          className={checkboxClass}
          {...register("resumeDownloadEnabled")}
        />
        <label htmlFor="resumeDownloadEnabled" className="text-small text-muted">
          Résumé download enabled
        </label>
      </div>

      {serverError && <p className={fieldErrorClass}>{serverError}</p>}
      {saved && <p className="text-small text-success">Saved.</p>}

      <div>
        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
