import { NextResponse } from "next/server";
import { isWorkEmail, isValidEmail } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organization, email } = body;

    // Validate required fields
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

    // If RESEND_API_KEY is configured, send email notification
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Replika <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: `New Early Access Request: ${organization}`,
        html: `
          <h2>New Replika Early Access Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } else {
      // Log to console in development
      console.log("Early Access Request:", { name, organization, email });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
