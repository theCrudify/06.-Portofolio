"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { skillSchema, type SkillInput } from "@/lib/validation/skill";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { createSkillAction, updateSkillAction } from "./actions";

const PROFICIENCY_OPTIONS = [
  { value: "primary", label: "Primary" },
  { value: "proficient", label: "Proficient" },
  { value: "working_knowledge", label: "Working knowledge" },
  { value: "familiar", label: "Familiar" },
] as const;

export function SkillForm({
  defaultValues,
  categories,
  skillId,
}: {
  defaultValues: SkillInput;
  categories: { _id: string; name: string }[];
  skillId?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues,
  });

  async function onSubmit(data: SkillInput) {
    setServerError(null);
    const result = skillId ? await updateSkillAction(skillId, data) : await createSkillAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/skills");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-xl flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input className={inputClass} {...register("name")} />
          {errors.name && <p className={fieldErrorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input className={inputClass} {...register("slug")} />
          {errors.slug && <p className={fieldErrorClass}>{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} {...register("categoryId")}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className={fieldErrorClass}>{errors.categoryId.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Proficiency</label>
          <select className={inputClass} {...register("proficiency")}>
            {PROFICIENCY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} className={inputClass} {...register("description")} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Icon</label>
          <input className={inputClass} {...register("icon")} />
        </div>
        <div>
          <label className={labelClass}>Years of use</label>
          <input type="number" className={inputClass} {...register("yearsOfUse")} />
        </div>
        <div>
          <label className={labelClass}>Sort order</label>
          <input
            type="number"
            className={inputClass}
            {...register("sortOrder", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <input
            id="isFeatured"
            type="checkbox"
            className={checkboxClass}
            {...register("isFeatured")}
          />
          <label htmlFor="isFeatured" className="text-small text-muted">
            Featured
          </label>
        </div>
        <div className="flex items-center gap-2.5">
          <input
            id="isPublished"
            type="checkbox"
            className={checkboxClass}
            {...register("isPublished")}
          />
          <label htmlFor="isPublished" className="text-small text-muted">
            Published
          </label>
        </div>
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
