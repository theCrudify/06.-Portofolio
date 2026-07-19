"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { secondaryButtonClass, fieldErrorClass } from "@/components/admin/form-styles";
import { updateContactMessageStatusAction, deleteContactMessageAction } from "../actions";

const STATUS_ACTIONS = [
  { status: "replied", label: "Mark Replied" },
  { status: "archived", label: "Archive" },
  { status: "spam", label: "Mark Spam" },
] as const;

export function MessageActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleStatus(status: string) {
    setError(null);
    const result = await updateContactMessageStatusAction(id, status);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {STATUS_ACTIONS.filter((action) => action.status !== currentStatus).map((action) => (
        <button
          key={action.status}
          type="button"
          onClick={() => handleStatus(action.status)}
          className={secondaryButtonClass}
        >
          {action.label}
        </button>
      ))}
      <DeleteButton action={deleteContactMessageAction.bind(null, id)} />
      {error && <p className={fieldErrorClass}>{error}</p>}
    </div>
  );
}
