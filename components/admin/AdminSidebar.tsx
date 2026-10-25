"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ mobileOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  }

  const navItems = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Waitlist",
      href: "/admin/waitlist",
      icon: Users,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 45,
            backdropFilter: "blur(2px)",
          }}
          className="admin-sidebar-backdrop"
        />
      )}

      {/* Sidebar Element */}
      <aside
        className={`admin-sidebar ${mobileOpen ? "open" : ""}`}
        style={{
          width: "260px",
          height: "100vh",
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
          zIndex: 50,
          boxSizing: "border-box",
        }}
      >
        {/* Top Header & Navigation */}
        <div style={{ display: "flex", flexDirection: "column", padding: "24px 20px 0" }}>
          {/* Brand Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "20px",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "24px",
            }}
          >
            <Link
              href="/admin/dashboard"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Image
                  src="/Kapde-logo-no-bg.svg"
                  alt="KAPDE Crest"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "15px",
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
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  paddingLeft: "34px",
                }}
              >
                Atelier CMS
              </span>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="admin-sidebar-close"
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "3px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isActive ? "#ffffff" : "#4b5563",
                    background: isActive ? "#000000" : "transparent",
                    transition: "all 0.15s ease",
                  }}
                  className={`admin-nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon
                    size={17}
                    strokeWidth={isActive ? 2 : 1.75}
                    style={{ flexShrink: 0, color: isActive ? "#ffffff" : "#6b7280" }}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: User info, Live Storefront & Logout */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Admin badge */}
          <div
            style={{
              padding: "8px 12px",
              background: "#f9fafb",
              border: "1px solid #f3f4f6",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ShieldCheck size={15} style={{ color: "#16a34a", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>
                Admin Session
              </span>
              <span style={{ fontSize: "10px", color: "#6b7280" }}>
                Full Atelier Access
              </span>
            </div>
          </div>

          {/* Live Storefront link */}
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 12px",
              fontSize: "12px",
              fontWeight: 500,
              color: "#374151",
              textDecoration: "none",
              borderRadius: "3px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              transition: "background 0.15s",
            }}
          >
            <span>Live Storefront</span>
            <ExternalLink size={14} style={{ color: "#9ca3af" }} />
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 12px",
              fontSize: "12px",
              fontWeight: 500,
              color: "#dc2626",
              background: "transparent",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
