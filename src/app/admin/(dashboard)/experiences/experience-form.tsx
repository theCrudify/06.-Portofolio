"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { experienceSchema, type ExperienceInput } from "@/lib/validation/experience";
import { StringListField } from "@/components/admin/string-list-field";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { createExperienceAction, updateExperienceAction } from "./actions";

const EMPLOYMENT_TYPES = [
  "professional",
  "internship",
  "freelance",
  "personal",
  "open_source",
] as const;

export function ExperienceForm({
  defaultValues,
  skills,
  experienceId,
}: {
  defaultValues: ExperienceInput;
  skills: { _id: string; name: string }[];
  experienceId?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  async function onSubmit(data: ExperienceInput) {
    setServerError(null);
    const result = experienceId
      ? await updateExperienceAction(experienceId, data)
      : await createExperienceAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/experiences");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Company name (internal)</label>
          <input className={inputClass} {...register("companyName")} />
          {errors.companyName && <p className={fieldErrorClass}>{errors.companyName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Company name (public)</label>
          <input className={inputClass} {...register("publicCompanyName")} />
          {errors.publicCompanyName && (
            <p className={fieldErrorClass}>{errors.publicCompanyName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Position</label>
        <input className={inputClass} {...register("position")} />
        {errors.position && <p className={fieldErrorClass}>{errors.position.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Employment type</label>
          <select className={inputClass} {...register("employmentType")}>
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Employment basis</label>
          <input className={inputClass} {...register("employmentBasis")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Location</label>
          <input className={inputClass} {...register("location")} />
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input className={inputClass} {...register("website")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start date</label>
          <input type="date" className={inputClass} {...register("startDate")} />
          {errors.startDate && <p className={fieldErrorClass}>{errors.startDate.message}</p>}
        </div>
        <div>
          <label className={labelClass}>End date</label>
          <input type="date" className={inputClass} {...register("endDate")} />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <input id="isCurrent" type="checkbox" className={checkboxClass} {...register("isCurrent")} />
        <label htmlFor="isCurrent" className="text-small text-muted">
          This is my current role
        </label>
      </div>

      <div>
        <label className={labelClass}>Summary</label>
        <textarea rows={3} className={inputClass} {...register("summary")} />
      </div>

      <StringListField<ExperienceInput>
        control={control}
        name="responsibilities"
        label="Responsibilities"
      />

      <StringListField<ExperienceInput>
        control={control}
        name="achievements"
        label="Achievements"
      />

      <div>
        <label className={labelClass}>Technologies</label>
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-3 sm:grid-cols-3">
          {skills.map((skill) => (
            <label key={skill._id} className="text-small flex items-center gap-2 text-foreground">
              <input
                type="checkbox"
                value={skill._id}
                className={checkboxClass}
                {...register("technologyIds")}
              />
              {skill.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Company logo URL</label>
        <input className={inputClass} placeholder="https://…" {...register("companyLogo")} />
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
