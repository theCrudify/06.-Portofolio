"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-small font-medium text-danger hover:underline disabled:opacity-60 disabled:hover:no-underline"
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}

export function DeleteButton({
  action,
  confirmMessage = "Are you sure you want to delete this? This cannot be undone.",
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <SubmitButton label={label} />
    </form>
  );
}
