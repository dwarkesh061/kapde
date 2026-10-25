import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "kapde_admin_session";
const SECRET = process.env.ADMIN_SESSION_SECRET || "kapde_super_secret_jwt_key_2026_default_secure";

function base64UrlEncode(str: string): string {
  if (typeof btoa === "function") {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(str).toString("base64url");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  if (typeof atob === "function") {
    return atob(base64);
  }
  return Buffer.from(base64, "base64").toString();
}

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface AdminSessionPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function isWhitelistedAdminEmail(email: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  
  const envEmails = (process.env.ADMIN_EMAILS || "admin@kapde.com,owner@kapde.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return envEmails.includes(cleanEmail);
}

export async function verifyAdminEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check environment variable whitelist
  if (isWhitelistedAdminEmail(cleanEmail)) {
    return true;
  }

  // 2. Check Supabase admin_users table
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", cleanEmail)
        .maybeSingle();
      if (!error && data) {
        return true;
      }
    }
  } catch (err) {
    console.warn("Error checking admin_users table:", err);
  }

  return false;
}

export async function signSessionToken(payload: AdminSessionPayload): Promise<string> {
  const enc = new TextEncoder();
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const data = `${header}.${body}`;

  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const sigBase64 = base64UrlEncode(
    String.fromCharCode(...new Uint8Array(signature))
  );

  return `${data}.${sigBase64}`;
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, sig] = parts;
    const data = `${header}.${body}`;

    const key = await getCryptoKey();
    const sigBytes = Uint8Array.from(base64UrlDecode(sig), (c) => c.charCodeAt(0));
    const enc = new TextEncoder();

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(data)
    );

    if (!isValid) return null;

    const payload: AdminSessionPayload = JSON.parse(base64UrlDecode(body));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return null;
    }

    const isAllowed = await verifyAdminEmail(payload.email);
    if (!isAllowed) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { SESSION_COOKIE_NAME };
