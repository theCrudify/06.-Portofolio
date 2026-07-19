"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { educationSchema, type EducationInput } from "@/lib/validation/education";
import { StringListField } from "@/components/admin/string-list-field";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { createEducationAction, updateEducationAction } from "./actions";

export function EducationForm({
  defaultValues,
  educationId,
}: {
  defaultValues: EducationInput;
  educationId?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EducationInput>({
    resolver: zodResolver(educationSchema),
    defaultValues,
  });

  async function onSubmit(data: EducationInput) {
    setServerError(null);
    const result = educationId
      ? await updateEducationAction(educationId, data)
      : await createEducationAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/education");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Institution</label>
          <input className={inputClass} {...register("institution")} />
          {errors.institution && <p className={fieldErrorClass}>{errors.institution.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Degree</label>
          <input className={inputClass} {...register("degree")} />
          {errors.degree && <p className={fieldErrorClass}>{errors.degree.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Field of study</label>
          <input className={inputClass} {...register("fieldOfStudy")} />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input className={inputClass} {...register("location")} />
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>GPA</label>
          <input className={inputClass} {...register("gpa")} />
        </div>
        <div>
          <label className={labelClass}>Maximum GPA</label>
          <input className={inputClass} {...register("maximumGpa")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} className={inputClass} {...register("description")} />
      </div>

      <StringListField<EducationInput>
        control={control}
        name="scholarships"
        label="Scholarships"
      />

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
