"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AlertCircle, Loader2, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { createClientComponentClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const emailParam = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [devPassword, setDevPassword] = useState("admin");

  // Check if session token exists
  useEffect(() => {
    async function checkExistingSession() {
      try {
        const supabase = createClientComponentClient();
        if (supabase) {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session?.user?.email) {
            setLoading(true);
            const res = await fetch("/api/admin/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "sync-session",
                accessToken: session.access_token,
              }),
            });
            if (res.ok) {
              window.location.href = "/admin/dashboard";
            } else {
              setLoading(false);
            }
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
      }
    }

    if (typeof window !== "undefined") {
      if (window.location.hash && window.location.hash.includes("access_token")) {
        checkExistingSession();
      }
    }
  }, []);

  async function handleGoogleLogin() {
    setLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClientComponentClient();
      if (!supabase) {
        setErrorMessage("Supabase is not configured yet in .env.local. You can use the Quick Admin Login below to test.");
        setLoading(false);
        return;
      }

      const redirectUrl = `${window.location.origin}/admin/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initialize Google login.");
      setLoading(false);
    }
  }

  async function doLogin(passwordToUse: string) {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "password-login",
          password: passwordToUse || "admin",
          email: "admin@kapde.com",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch {
      setErrorMessage("Network error during login.");
      setLoading(false);
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    await doLogin(devPassword);
  }

  let displayError = errorMessage;
  if (!displayError && errorParam === "unauthorized") {
    displayError = emailParam
      ? `Access Denied: "${emailParam}" is not authorized on the admin whitelist.`
      : "Access Denied: Please sign in with an authorized Google account.";
  } else if (!displayError && errorParam) {
    displayError = decodeURIComponent(errorParam);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f7f7",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "3px",
          padding: "44px 36px 40px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src="/Kapde-logo-no-bg.svg"
              alt="KAPDE Admin"
              width={34}
              height={34}
              className="object-contain"
              priority
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#000000",
              }}
            >
              KAPDE
            </span>
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginTop: "2px",
            }}
          >
            Store Management Portal
          </span>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "#111111",
              marginTop: "4px",
            }}
          >
            Atelier Sign In
          </h1>
        </div>

        {displayError && (
          <div
            style={{
              padding: "12px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              fontSize: "12px",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{displayError}</span>
          </div>
        )}

        {/* 1-Click Instant Demo / Temp Auth Banner */}
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #e5e7eb",
            borderRadius: "2px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={16} style={{ color: "#16a34a" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111111" }}>
              Quick Temporary Admin Auth
            </span>
          </div>
          <p style={{ fontSize: "11px", color: "#6b7280", lineHeight: 1.5 }}>
            Instant local access enabled for development & testing. No Google sign-in required.
          </p>
          <button
            type="button"
            onClick={() => doLogin("admin")}
            disabled={loading}
            className="btn-primary"
            style={{ height: "42px", width: "100%", fontSize: "11px" }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <span>Enter as Admin (1-Click)</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>

        {/* Separator */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>
            or password login
          </span>
          <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
        </div>

        {/* Standard Password Form */}
        <form onSubmit={handlePasswordLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Password (default: admin)
            </label>
            <input
              type="password"
              value={devPassword}
              onChange={(e) => setDevPassword(e.target.value)}
              placeholder="Enter password"
              className="input-base"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-secondary"
            style={{ height: "42px", width: "100%", fontSize: "11px", border: "1px solid #111111", background: "#ffffff" }}
          >
            <span>Sign In with Password</span>
          </button>
        </form>

        {/* Google OAuth Option */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: "100%",
              height: "42px",
              background: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "2px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#fafafa")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#ffffff")}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
        </div>

        <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", lineHeight: 1.5 }}>
          Secured with Supabase RLS and HMAC-SHA256 session tokens.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
          <Loader2 size={28} className="animate-spin text-black m-auto" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
