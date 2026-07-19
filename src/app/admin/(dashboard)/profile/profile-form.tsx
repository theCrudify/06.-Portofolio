"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { profileSchema, type ProfileInput } from "@/lib/validation/profile";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { saveProfileAction } from "./actions";

export function ProfileForm({ defaultValues }: { defaultValues: ProfileInput }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "statistics" });

  async function onSubmit(data: ProfileInput) {
    setServerError(null);
    setSaved(false);
    const result = await saveProfileAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-2xl flex-col gap-5">
      <div>
        <label className={labelClass}>Full name</label>
        <input className={inputClass} {...register("fullName")} />
        {errors.fullName && <p className={fieldErrorClass}>{errors.fullName.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Professional title</label>
        <input className={inputClass} {...register("professionalTitle")} />
        {errors.professionalTitle && (
          <p className={fieldErrorClass}>{errors.professionalTitle.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Short summary</label>
        <textarea rows={3} className={inputClass} {...register("shortSummary")} />
        {errors.shortSummary && <p className={fieldErrorClass}>{errors.shortSummary.message}</p>}
      </div>

      <div>
        <label className={labelClass}>About content</label>
        <textarea rows={8} className={inputClass} {...register("aboutContent")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Public location</label>
          <input className={inputClass} {...register("publicLocation")} />
        </div>
        <div>
          <label className={labelClass}>Public email</label>
          <input className={inputClass} {...register("publicEmail")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Profile image URL</label>
        <input className={inputClass} placeholder="https://…" {...register("profileImage")} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Availability</label>
          <select className={inputClass} {...register("availabilityStatus")}>
            <option value="open">Open</option>
            <option value="limited">Limited</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Primary CTA label</label>
          <input className={inputClass} {...register("primaryCTA")} />
        </div>
        <div>
          <label className={labelClass}>Secondary CTA label</label>
          <input className={inputClass} {...register("secondaryCTA")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Statistics</label>
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Label"
                {...register(`statistics.${index}.label`)}
              />
              <input
                className={inputClass}
                placeholder="Value"
                {...register(`statistics.${index}.value`)}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-small shrink-0 rounded-lg border border-border px-3 text-muted transition-colors hover:text-danger"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => append({ label: "", value: "" })}
          className="text-small mt-2 font-medium text-accent hover:underline"
        >
          + Add statistic
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <input id="isPublished" type="checkbox" className={checkboxClass} {...register("isPublished")} />
        <label htmlFor="isPublished" className="text-small text-muted">
          Published (visible on the public site)
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
