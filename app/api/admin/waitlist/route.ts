import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { getWaitlistEntries, deleteWaitlistEntry } from "@/lib/db";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = await getWaitlistEntries();
    return NextResponse.json({ entries });
  } catch (err: any) {
    console.error("Admin waitlist GET error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch waitlist" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Waitlist ID is required." }, { status: 400 });
    }

    const result = await deleteWaitlistEntry(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to delete entry" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Subscriber removed successfully." });
  } catch (err: any) {
    console.error("Admin waitlist DELETE error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
