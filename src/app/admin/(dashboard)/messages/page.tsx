import Link from "next/link";
import { getAllContactMessages } from "@/modules/contact/contact.service";
import { StatusBadge } from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

const STATUS_TABS = ["all", "new", "read", "replied", "archived", "spam"] as const;
type StatusTab = (typeof STATUS_TABS)[number];

const STATUS_TONE = {
  new: "accent",
  read: "neutral",
  replied: "success",
  archived: "neutral",
  spam: "danger",
} as const;

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus: StatusTab = STATUS_TABS.includes(status as StatusTab)
    ? (status as StatusTab)
    : "all";
  const messages = await getAllContactMessages(activeStatus);

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Messages</h1>
      <p className="text-body mt-1 text-muted">Inquiries submitted through the contact form.</p>

      <div className="mt-6 flex gap-2 border-b border-border">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab}
            href={tab === "all" ? "/admin/messages" : `/admin/messages?status=${tab}`}
            className={`text-small border-b-2 px-3 py-2 font-medium capitalize transition-colors ${
              activeStatus === tab
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
        {messages.length === 0 && <p className="text-body px-5 py-4 text-muted">No messages.</p>}
        {messages.map((message) => (
          <Link
            key={message._id.toString()}
            href={`/admin/messages/${message._id}`}
            className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-surface-muted"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-body font-medium text-foreground">{message.name}</span>
                <StatusBadge
                  label={message.status ?? "new"}
                  tone={STATUS_TONE[(message.status ?? "new") as keyof typeof STATUS_TONE]}
                />
              </div>
              <p className="text-small mt-1 text-muted">{message.subject}</p>
            </div>
            <span className="text-small text-muted">
              {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                new Date(message.createdAt as unknown as string)
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
