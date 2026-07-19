"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { inputClass } from "./form-styles";

export function StringListField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const values: string[] = Array.isArray(field.value) ? field.value : [];

        return (
          <div>
            <label className="text-small mb-1.5 block font-medium text-foreground">{label}</label>
            <div className="flex flex-col gap-2">
              {values.map((value, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => {
                      const next = [...values];
                      next[index] = event.target.value;
                      field.onChange(next);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => field.onChange(values.filter((_, i) => i !== index))}
                    className="text-small shrink-0 rounded-lg border border-border px-3 text-muted transition-colors hover:text-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => field.onChange([...values, ""])}
              className="text-small mt-2 font-medium text-accent hover:underline"
            >
              + Add
            </button>
          </div>
        );
      }}
    />
  );
}
