import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod/v4";

// --- HTML Escaping ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- Rate Limiting (in-memory, per IP) ---
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // per 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// Clean up stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) {
      rateLimit.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// --- Lazy Resend Init ---
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

// --- Validation Schema ---
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  phone: z.string().min(1, "Phone number is required").max(30),
  email: z.email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(5000),
  // Honeypot field: must be empty (bots tend to fill hidden fields)
  website: z.string().max(0, "Bot detected").optional(),
});

// --- Allowed Origins ---
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowedHosts = [
    "physiotherapie-corpusomnia.ch",
    "www.physiotherapie-corpusomnia.ch",
    "localhost",
    "127.0.0.1",
  ];

  if (origin) {
    try {
      const url = new URL(origin);
      return allowedHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const url = new URL(referer);
      return allowedHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
    } catch {
      return false;
    }
  }

  // No Origin or Referer header (e.g. server-side call) -- reject
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // CSRF: validate origin
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, phone, email, message } = result.data;

    // Escape all user input for HTML email
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const resend = getResend();

    const { error } = await resend.emails.send({
      from: `Kontaktformular <${fromAddress}>`,
      to: ["info@physiotherapie-corpusomnia.ch"],
      replyTo: email,
      subject: `Kontaktanfrage von ${safeFirstName} ${safeLastName}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeFirstName} ${safeLastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Telefon</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">E-Mail</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Nachricht</td>
            <td style="padding: 8px 12px; white-space: pre-wrap;">${safeMessage}</td>
          </tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
