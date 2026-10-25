"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusText, setStatusText] = useState("Authenticating with Google…");

  useEffect(() => {
    let active = true;

    async function processAuth() {
      const errorMsg = searchParams.get("error_description") || searchParams.get("error");
      if (errorMsg) {
        console.error("OAuth error:", errorMsg);
        router.replace(`/admin/login?error=${encodeURIComponent(errorMsg)}`);
        return;
      }

      const code = searchParams.get("code");
      const supabase = createClientComponentClient();

      try {
        let accessToken: string | null = null;

        if (code && supabase) {
          setStatusText("Exchanging authorization code…");
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error("Supabase code exchange error:", error);
            const sessionRes = await supabase.auth.getSession();
            if (sessionRes.data?.session?.access_token) {
              accessToken = sessionRes.data.session.access_token;
            } else {
              throw error;
            }
          } else if (data.session) {
            accessToken = data.session.access_token;
          }
        } else if (supabase) {
          setStatusText("Validating session…");
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            accessToken = session.access_token;
          }
        }

        if (!accessToken) {
          throw new Error("No session token received from Google login.");
        }

        if (!active) return;
        setStatusText("Authorizing admin access…");

        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "sync-session",
            accessToken,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Access denied.");
        }

        setStatusText("Redirecting to Admin Dashboard…");
        window.location.href = "/admin/dashboard";
      } catch (err: any) {
        console.error("Callback error:", err);
        if (active) {
          router.replace(
            `/admin/login?error=${encodeURIComponent(
              err.message || "Failed to complete Google sign-in"
            )}`
          );
        }
      }
    }

    processAuth();

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6 gap-4 text-center">
      <Loader2 size={36} className="animate-spin text-black" />
      <h2 className="text-lg font-serif">{statusText}</h2>
      <p className="text-xs text-neutral-500">Please wait while we connect your account.</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 size={28} className="animate-spin text-black" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
