import { notFound } from "next/navigation";
import Link from "next/link";
import { getContactMessageById } from "@/modules/contact/contact.service";
import { StatusBadge } from "@/components/admin/status-badge";
import { MessageActions } from "./message-actions";

export const dynamic = "force-dynamic";

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const message = await getContactMessageById(id);
  if (!message) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin/messages" className="text-small font-medium text-accent hover:underline">
        ← Back to messages
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <h1 className="text-h2 font-semibold text-foreground">{message.subject}</h1>
        <StatusBadge label={message.status ?? "new"} tone="accent" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-small text-muted">
        <p>
          <span className="font-medium text-foreground">From:</span> {message.name} (
          {message.email})
        </p>
        {message.company && (
          <p>
            <span className="font-medium text-foreground">Company:</span> {message.company}
          </p>
        )}
        <p>
          <span className="font-medium text-foreground">Purpose:</span>{" "}
          {message.purpose.replace(/_/g, " ")}
        </p>
        <p>
          <span className="font-medium text-foreground">Received:</span>{" "}
          {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(
            new Date(message.createdAt as unknown as string)
          )}
        </p>
      </div>

      <div className="text-body mt-6 whitespace-pre-wrap rounded-xl border border-border bg-surface p-5 text-foreground">
        {message.message}
      </div>

      <div className="mt-6">
        <MessageActions id={id} currentStatus={message.status ?? "new"} />
      </div>
    </div>
  );
}
