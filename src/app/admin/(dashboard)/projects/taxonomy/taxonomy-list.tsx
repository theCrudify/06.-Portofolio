"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputClass, primaryButtonClass, fieldErrorClass } from "@/components/admin/form-styles";
import { DeleteButton } from "@/components/admin/delete-button";

type Item = { _id: string; name: string; slug: string; sortOrder: number };
type ActionResult = { success: true } | { success: false; error: string };

export function TaxonomyList({
  title,
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  title: string;
  items: Item[];
  onCreate: (input: { name: string; slug: string; sortOrder: number }) => Promise<ActionResult>;
  onUpdate: (
    id: string,
    input: { name: string; slug: string; sortOrder: number }
  ) => Promise<ActionResult>;
  onDelete: (id: string) => Promise<void>;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, { name: string; slug: string }>>({});

  function edited(item: Item) {
    return editing[item._id] ?? { name: item.name, slug: item.slug };
  }

  async function handleCreate() {
    setError(null);
    const result = await onCreate({ name, slug, sortOrder: items.length });
    if (!result.success) {
      setError(result.error);
      return;
    }
    setName("");
    setSlug("");
    router.refresh();
  }

  async function handleUpdate(item: Item) {
    setError(null);
    const current = edited(item);
    const result = await onUpdate(item._id, { ...current, sortOrder: item.sortOrder });
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="text-h4 font-semibold text-foreground">{title}</h2>

      <div className="mt-4 flex flex-col gap-2">
        {items.length === 0 && <p className="text-small text-muted">None yet.</p>}
        {items.map((item) => {
          const current = edited(item);
          return (
            <div key={item._id} className="flex gap-2">
              <input
                className={inputClass}
                value={current.name}
                onChange={(event) =>
                  setEditing((prev) => ({
                    ...prev,
                    [item._id]: { ...current, name: event.target.value },
                  }))
                }
              />
              <input
                className={inputClass}
                value={current.slug}
                onChange={(event) =>
                  setEditing((prev) => ({
                    ...prev,
                    [item._id]: { ...current, slug: event.target.value },
                  }))
                }
              />
              <button
                type="button"
                onClick={() => handleUpdate(item)}
                className="text-small shrink-0 rounded-lg border border-border px-3 text-accent transition-colors hover:bg-surface-muted"
              >
                Save
              </button>
              <DeleteButton action={onDelete.bind(null, item._id)} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2 border-t border-border pt-4">
        <input
          className={inputClass}
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className={inputClass}
          placeholder="slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        />
        <button type="button" onClick={handleCreate} className={primaryButtonClass}>
          Add
        </button>
      </div>

      {error && <p className={fieldErrorClass}>{error}</p>}
    </div>
  );
}
