import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { createContactMessage, isRateLimited } from "@/modules/contact/contact.service";

function hashIp(ip: string): string {
  const secret = process.env.AUTH_SECRET ?? "";
  return createHash("sha256").update(`${ip}:${secret}`).digest("hex");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIp(ip);

  const limited = await isRateLimited(ipHash);
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    await createContactMessage({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || "",
      subject: parsed.data.subject,
      message: parsed.data.message,
      purpose: parsed.data.purpose,
      ipHash,
      userAgent: request.headers.get("user-agent") ?? "",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
