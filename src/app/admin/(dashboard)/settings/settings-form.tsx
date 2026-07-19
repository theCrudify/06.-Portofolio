"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  generalSettingsSchema,
  type GeneralSettingsInput,
} from "@/lib/validation/site-settings";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { saveGeneralSettingsAction } from "./actions";

export function SettingsForm({ defaultValues }: { defaultValues: GeneralSettingsInput }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GeneralSettingsInput>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: GeneralSettingsInput) {
    setServerError(null);
    setSaved(false);
    const result = await saveGeneralSettingsAction(data);
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
        <label className={labelClass}>Site title</label>
        <input className={inputClass} {...register("siteTitle")} />
        {errors.siteTitle && <p className={fieldErrorClass}>{errors.siteTitle.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Public email</label>
        <input className={inputClass} {...register("publicEmail")} />
        {errors.publicEmail && <p className={fieldErrorClass}>{errors.publicEmail.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input className={inputClass} {...register("socialLinks.github")} />
        </div>
        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <input className={inputClass} {...register("socialLinks.linkedin")} />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <input
          id="contactFormEnabled"
          type="checkbox"
          className={checkboxClass}
          {...register("contactFormEnabled")}
        />
        <label htmlFor="contactFormEnabled" className="text-small text-muted">
          Contact form enabled
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
