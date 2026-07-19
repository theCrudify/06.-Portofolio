"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { achievementSchema, type AchievementInput } from "@/lib/validation/achievement";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { createAchievementAction, updateAchievementAction } from "./actions";

const TYPE_OPTIONS = [
  "award",
  "competition",
  "scholarship",
  "certification",
  "leadership",
  "organization",
  "speaking_engagement",
] as const;

export function AchievementForm({
  defaultValues,
  achievementId,
}: {
  defaultValues: AchievementInput;
  achievementId?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AchievementInput>({
    resolver: zodResolver(achievementSchema),
    defaultValues,
  });

  async function onSubmit(data: AchievementInput) {
    setServerError(null);
    const result = achievementId
      ? await updateAchievementAction(achievementId, data)
      : await createAchievementAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/achievements");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-2xl flex-col gap-5">
      <div>
        <label className={labelClass}>Title</label>
        <input className={inputClass} {...register("title")} />
        {errors.title && <p className={fieldErrorClass}>{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass} {...register("type")}>
            {TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Issuer</label>
          <input className={inputClass} {...register("issuer")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date</label>
          <input type="date" className={inputClass} {...register("date")} />
        </div>
        <div>
          <label className={labelClass}>End date</label>
          <input type="date" className={inputClass} {...register("endDate")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} className={inputClass} {...register("description")} />
      </div>

      <div>
        <label className={labelClass}>Evidence URL</label>
        <input className={inputClass} placeholder="https://…" {...register("evidenceUrl")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Sort order</label>
          <input
            type="number"
            className={inputClass}
            {...register("sortOrder", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <input id="isPublished" type="checkbox" className={checkboxClass} {...register("isPublished")} />
        <label htmlFor="isPublished" className="text-small text-muted">
          Published
        </label>
      </div>

      {serverError && <p className={fieldErrorClass}>{serverError}</p>}

      <div>
        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
