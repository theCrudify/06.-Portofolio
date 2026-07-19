"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { skillCategorySchema, type SkillCategoryInput } from "@/lib/validation/skill-category";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { createSkillCategoryAction, updateSkillCategoryAction } from "./actions";

export function CategoryForm({
  defaultValues,
  categoryId,
}: {
  defaultValues: SkillCategoryInput;
  categoryId?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkillCategoryInput>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues,
  });

  async function onSubmit(data: SkillCategoryInput) {
    setServerError(null);
    const result = categoryId
      ? await updateSkillCategoryAction(categoryId, data)
      : await createSkillCategoryAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/skills");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-xl flex-col gap-5">
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

      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} className={inputClass} {...register("description")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Icon</label>
          <input className={inputClass} {...register("icon")} />
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
