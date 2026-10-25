import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminEmail,
  signSessionToken,
  getAdminSession,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: { email: session.email, role: session.role },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // 1. Logout
    if (action === "logout") {
      const response = NextResponse.json({ success: true });
      response.cookies.set(SESSION_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    // 2. Dev / Password Login (Instant test mode)
    if (action === "password-login") {
      const { password, email } = body;
      const expectedPassword = process.env.ADMIN_PASSWORD || "admin";
      const targetEmail = (email || "admin@kapde.com").trim().toLowerCase();

      if (password !== expectedPassword) {
        return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
      }

      const now = Math.floor(Date.now() / 1000);
      const token = await signSessionToken({
        email: targetEmail,
        role: "superadmin",
        iat: now,
        exp: now + 7 * 24 * 60 * 60,
      });

      const response = NextResponse.json({
        success: true,
        user: { email: targetEmail, role: "superadmin" },
      });

      response.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    // 3. Supabase Google OAuth Session Sync
    if (action === "sync-session") {
      const { accessToken } = body;
      if (!accessToken) {
        return NextResponse.json({ error: "Missing access token" }, { status: 400 });
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.json({ error: "Supabase configuration error" }, { status: 500 });
      }

      const { createClient } = await import("@supabase/supabase-js");
      const client = createClient(supabaseUrl, supabaseAnonKey);
      const {
        data: { user },
        error,
      } = await client.auth.getUser(accessToken);

      if (error || !user?.email) {
        return NextResponse.json({ error: "Invalid Supabase session token" }, { status: 401 });
      }

      const cleanEmail = user.email.trim().toLowerCase();
      let isAllowed = await verifyAdminEmail(cleanEmail);

      if (!isAllowed) {
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
        const adminClient = createClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false },
        });
        const name = user.user_metadata?.full_name || cleanEmail.split("@")[0];
        await adminClient.from("admin_users").upsert(
          { email: cleanEmail, name, role: "admin" },
          { onConflict: "email" }
        );
        isAllowed = true;
      }

      const now = Math.floor(Date.now() / 1000);
      const token = await signSessionToken({
        email: cleanEmail,
        role: "admin",
        iat: now,
        exp: now + 7 * 24 * 60 * 60,
      });

      const response = NextResponse.json({
        success: true,
        user: { email: cleanEmail, role: "admin" },
      });

      response.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
