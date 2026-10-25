"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Do not show sidebar layout on login or auth callback
  if (pathname.includes("/login") || pathname.includes("/auth")) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fa",
        color: "#111111",
        position: "relative",
      }}
    >
      {/* Sidebar (Desktop sticky & Mobile off-canvas) */}
      <AdminSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Mobile Top Header (only on small screens) */}
        <header
          className="admin-mobile-header"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111111",
            }}
            aria-label="Open admin navigation"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>

          <Link
            href="/admin/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "#000000",
            }}
          >
            <Image
              src="/Kapde-logo-no-bg.svg"
              alt="KAPDE"
              width={22}
              height={22}
              className="object-contain"
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              KAPDE ATELIER
            </span>
          </Link>

          <div style={{ width: "24px" }} />
        </header>

        {/* Content Container */}
        <main
          style={{
            flex: 1,
            padding: "36px 32px 64px",
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
          className="admin-main-container"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
