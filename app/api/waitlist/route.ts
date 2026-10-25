import { NextRequest, NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`waitlist_${ip}`, {
      intervalMs: 10 * 60 * 1000,
      maxRequests: 10,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, phone, productInterest } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Please provide either an email or a WhatsApp phone number." },
        { status: 400 }
      );
    }

    const result = await addWaitlistEntry({
      email,
      phone,
      productInterest: productInterest || "Next Drop",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to register for waitlist." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      alreadyExists: result.alreadyExists || false,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
