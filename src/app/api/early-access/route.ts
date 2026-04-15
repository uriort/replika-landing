import { NextResponse } from "next/server";
import { isWorkEmail, isValidEmail } from "@/lib/validators";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");
const NOTIFY_EMAIL = "uri@deepersignals.com";

async function saveLead(lead: { name: string; organization: string; email: string; existingClient: string; submittedAt: string }) {
  const dir = path.dirname(LEADS_FILE);
  await fs.mkdir(dir, { recursive: true });

  let leads: unknown[] = [];
  try {
    const existing = await fs.readFile(LEADS_FILE, "utf-8");
    leads = JSON.parse(existing);
  } catch {
    // File doesn't exist yet
  }

  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organization, email, existingClient } = body;

    if (!name?.trim() || !organization?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!isWorkEmail(email)) {
      return NextResponse.json(
        { error: "Please use your work email address" },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();

    // Save lead to file
    await saveLead({ name, organization, email, existingClient: existingClient || "Not specified", submittedAt });

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Replika <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `New Early Access Request: ${organization}`,
        html: `
          <h2>New Replika Early Access Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Existing Client:</strong> ${existingClient || "Not specified"}</p>
          <p><strong>Submitted:</strong> ${submittedAt}</p>
        `,
      });
    } else {
      console.log("Early Access Lead (no RESEND_API_KEY configured):", { name, organization, email, existingClient, submittedAt });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
