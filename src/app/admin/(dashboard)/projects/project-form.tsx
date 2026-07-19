"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { projectSchema, type ProjectInput } from "@/lib/validation/project";
import { StringListField } from "@/components/admin/string-list-field";
import {
  inputClass,
  labelClass,
  checkboxClass,
  fieldErrorClass,
  primaryButtonClass,
} from "@/components/admin/form-styles";
import { createProjectAction, updateProjectAction } from "./actions";

const EMPLOYMENT_TYPES = [
  "professional",
  "internship",
  "freelance",
  "personal",
  "open_source",
] as const;

export function ProjectForm({
  defaultValues,
  industries,
  projectTypes,
  experiences,
  skills,
  projectId,
}: {
  defaultValues: ProjectInput;
  industries: { _id: string; name: string }[];
  projectTypes: { _id: string; name: string }[];
  experiences: { _id: string; label: string }[];
  skills: { _id: string; name: string }[];
  projectId?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  async function onSubmit(data: ProjectInput) {
    setServerError(null);
    const result = projectId
      ? await updateProjectAction(projectId, data)
      : await createProjectAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-3xl flex-col gap-8">
      <section className="flex flex-col gap-5">
        <h2 className="text-h4 font-semibold text-foreground">Basics</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input className={inputClass} {...register("title")} />
            {errors.title && <p className={fieldErrorClass}>{errors.title.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input className={inputClass} {...register("slug")} />
            {errors.slug && <p className={fieldErrorClass}>{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Short description</label>
          <textarea rows={2} className={inputClass} {...register("shortDescription")} />
          {errors.shortDescription && (
            <p className={fieldErrorClass}>{errors.shortDescription.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Public client label</label>
          <input className={inputClass} {...register("publicClientLabel")} />
          {errors.publicClientLabel && (
            <p className={fieldErrorClass}>{errors.publicClientLabel.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Cover image URL</label>
          <input className={inputClass} placeholder="https://…" {...register("coverImage")} />
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-h4 font-semibold text-foreground">Classification</h2>
          <Link
            href="/admin/projects/taxonomy"
            className="text-small font-medium text-accent hover:underline"
          >
            Manage industries & types
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Industry</label>
            <select className={inputClass} {...register("industryId")}>
              <option value="">None</option>
              {industries.map((industry) => (
                <option key={industry._id} value={industry._id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Project type</label>
            <select className={inputClass} {...register("projectTypeId")}>
              <option value="">None</option>
              {projectTypes.map((projectType) => (
                <option key={projectType._id} value={projectType._id}>
                  {projectType.name}
                </option>
              ))}
            </select>
          </div>
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
            <label className={labelClass}>Role</label>
            <input className={inputClass} {...register("role")} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Related experience</label>
          <select className={inputClass} {...register("relatedExperienceId")}>
            <option value="">None</option>
            {experiences.map((experience) => (
              <option key={experience._id} value={experience._id}>
                {experience.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Visibility</label>
            <select className={inputClass} {...register("visibility")}>
              <option value="public">Public</option>
              <option value="anonymized">Anonymized</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select className={inputClass} {...register("status")}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2.5 pt-6">
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
          <div>
            <label className={labelClass}>Featured order</label>
            <input
              type="number"
              className={inputClass}
              {...register("featuredOrder", { valueAsNumber: true })}
            />
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start date</label>
            <input type="date" className={inputClass} {...register("startDate")} />
          </div>
          <div>
            <label className={labelClass}>End date</label>
            <input type="date" className={inputClass} {...register("endDate")} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="text-h4 font-semibold text-foreground">Content</h2>

        <div>
          <label className={labelClass}>Overview</label>
          <textarea rows={4} className={inputClass} {...register("overview")} />
        </div>
        <div>
          <label className={labelClass}>Business context</label>
          <textarea rows={4} className={inputClass} {...register("businessContext")} />
        </div>
        <div>
          <label className={labelClass}>Problems</label>
          <textarea rows={4} className={inputClass} {...register("problems")} />
        </div>
        <div>
          <label className={labelClass}>Solution</label>
          <textarea rows={4} className={inputClass} {...register("solution")} />
        </div>
        <div>
          <label className={labelClass}>Business workflow</label>
          <textarea rows={4} className={inputClass} {...register("businessWorkflow")} />
        </div>
        <div>
          <label className={labelClass}>Architecture description</label>
          <textarea rows={4} className={inputClass} {...register("architectureDescription")} />
        </div>
        <div>
          <label className={labelClass}>Technical challenges</label>
          <textarea rows={4} className={inputClass} {...register("technicalChallenges")} />
        </div>
        <div>
          <label className={labelClass}>Confidentiality notice</label>
          <textarea rows={2} className={inputClass} {...register("confidentialityNotice")} />
        </div>

        <StringListField<ProjectInput>
          control={control}
          name="responsibilities"
          label="Responsibilities"
        />
        <StringListField<ProjectInput> control={control} name="keyFeatures" label="Key features" />
        <StringListField<ProjectInput> control={control} name="results" label="Results" />
      </section>

      <section className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="text-h4 font-semibold text-foreground">Technologies</h2>

        <div>
          <label className={labelClass}>Technologies used</label>
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
          <label className={labelClass}>Integrations</label>
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-3 sm:grid-cols-3">
            {skills.map((skill) => (
              <label key={skill._id} className="text-small flex items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  value={skill._id}
                  className={checkboxClass}
                  {...register("integrationIds")}
                />
                {skill.name}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="text-h4 font-semibold text-foreground">SEO</h2>
        <div>
          <label className={labelClass}>SEO title</label>
          <input className={inputClass} {...register("seo.title")} />
        </div>
        <div>
          <label className={labelClass}>SEO description</label>
          <textarea rows={2} className={inputClass} {...register("seo.description")} />
        </div>
      </section>

      {serverError && <p className={fieldErrorClass}>{serverError}</p>}

      <div>
        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
