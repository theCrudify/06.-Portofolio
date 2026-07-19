"use server";

import { redirect } from "next/navigation";
import { adminLoginSchema } from "@/lib/validation/admin-login";
import { verifyAdminCredentials } from "@/modules/admin/admin.service";
import { createSession, destroySession } from "@/lib/auth/session";

export type LoginActionState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  if (!admin) {
    return { error: "Invalid email or password." };
  }

  await createSession({ adminId: admin._id.toString(), email: admin.email });
  redirect("/admin/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
