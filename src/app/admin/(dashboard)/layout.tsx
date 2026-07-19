import { requireSession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar email={session.email} />
      <main className="flex-1 overflow-x-hidden px-4 py-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
