"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@/lib/supabase/client";

export function AuthHashDetector() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash || "";
    const search = window.location.search || "";

    const hasHashToken = hash.includes("access_token");
    const hasSearchCode = search.includes("code=");

    if (hasSearchCode && window.location.pathname === "/") {
      window.location.href = `/admin/auth/callback${search}`;
      return;
    }

    if (hasHashToken) {
      if (window.location.pathname === "/" || window.location.pathname === "/admin/login") {
        try {
          const supabase = createClientComponentClient();
          if (supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => {
              if (session?.access_token) {
                fetch("/api/admin/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    action: "sync-session",
                    accessToken: session.access_token,
                  }),
                })
                  .then((res) => {
                    if (res.ok) {
                      window.location.href = "/admin/dashboard";
                    }
                  })
                  .catch((err) => console.error("Session sync error:", err));
              }
            });
          }
        } catch (err) {
          console.error("AuthHashDetector error:", err);
        }
      }
    }
  }, []);

  return null;
}
