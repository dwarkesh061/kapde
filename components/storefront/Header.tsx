"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { CATEGORIES } from "@/lib/types";

interface HeaderProps {
  onNavOpen?: () => void;
  onSearchOpen?: () => void;
}

export function StorefrontHeader({ onNavOpen, onSearchOpen }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { getItemCount, openCart } = useCartStore();

  useEffect(() => { setMounted(true); }, []);

  const count = mounted ? getItemCount() : 0;

  return (
    <header className="site-header">
      {/* Left: Hamburger */}
      <div className="header-left">
        <button
          id="nav-open-btn"
          onClick={onNavOpen}
          className="header-icon-btn"
          aria-label="Open navigation"
        >
          {/* Hamburger lines — exact ALD style */}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1"  x2="20" y2="1"  stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* Center: Brand Crest Logo & Wordmark (Light background) */}
      <div className="header-center">
        <Link href="/" className="site-wordmark" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            src="/Kapde-logo-no-bg.svg"
            alt="KAPDE Crest"
            width={24}
            height={24}
            className="object-contain"
            priority
          />
          <span>KAPDE</span>
        </Link>
      </div>

      {/* Right: Search + Bag */}
      <div className="header-right">
        <button
          id="search-open-btn"
          onClick={onSearchOpen}
          className="header-icon-btn"
          aria-label="Search"
        >
          <Search size={18} strokeWidth={1.5} />
        </button>

        <button
          id="cart-open-btn"
          onClick={openCart}
          className="header-icon-btn cart-badge-btn"
          aria-label={`Shopping bag${count > 0 ? `, ${count} items` : ""}`}
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          {count > 0 && (
            <span className="cart-count">{count > 9 ? "9+" : count}</span>
          )}
        </button>
      </div>
    </header>
  );
}

/* ── Navigation Sidebar (dark charcoal, ALD-style) ────── */
interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (cat: string) => void;
  activeCategory?: string;
}

export function NavSidebar({
  isOpen,
  onClose,
  onCategorySelect,
  activeCategory = "all",
}: NavSidebarProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), productInterest: "Newsletter & Drops" }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {}
    setLoading(false);
  }

  const topCategories = [
    { value: "all",           label: "All Products" },
    { value: "new-arrivals",  label: "New Arrivals" },
  ];

  return (
    <div className="nav-overlay" role="dialog" aria-label="Navigation menu">
      <div className="nav-backdrop" onClick={onClose} />
      <nav className="nav-panel">
        {/* Header row — same height as site header */}
        <div className="nav-header">
          <button
            onClick={onClose}
            className="nav-close-btn"
            aria-label="Close navigation"
            style={{ justifySelf: "start" }}
          >
            <X size={14} strokeWidth={2} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em" }}>
              SHOP
            </span>
          </button>

          {/* Center wordmark with dark-bg SVG logo */}
          <Link
            href="/"
            onClick={onClose}
            className="site-wordmark"
            style={{
              color: "rgba(255,255,255,0.9)",
              justifySelf: "center",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Image
              src="/Kapde-logo-black-bg.svg"
              alt="KAPDE Crest"
              width={22}
              height={22}
              className="object-contain"
            />
            <span>KAPDE</span>
          </Link>

          {/* Spacer */}
          <div />
        </div>

        {/* Category list */}
        <div className="nav-category-list">
          {topCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { onCategorySelect?.(cat.value); onClose(); }}
              className={`nav-category-item ${activeCategory === cat.value ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}

          <div className="nav-divider" />

          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { onCategorySelect?.(cat.value); onClose(); }}
              className={`nav-category-item ${activeCategory === cat.value ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}

          <div className="nav-divider" style={{ marginTop: 16 }} />

          <Link
            href="/about"
            onClick={onClose}
            className="nav-category-item"
            style={{ opacity: 0.85, fontSize: "12px" }}
          >
            Atelier &amp; Philosophy
          </Link>

          <Link
            href="/admin/login"
            onClick={onClose}
            className="nav-category-item"
            style={{ opacity: 0.5, fontSize: "11px" }}
          >
            Admin CMS
          </Link>
        </div>

        {/* Footer: email subscribe */}
        <div className="nav-footer">
          <form className="nav-email-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <p style={{ fontSize: "11px", color: "#4ade80", fontWeight: 600, letterSpacing: "0.08em" }}>
                ✓ You are on the priority drop roster.
              </p>
            ) : (
              <div className="nav-email-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="nav-email-input"
                />
                <button type="submit" disabled={loading} className="nav-subscribe-btn">
                  {loading ? "..." : "Subscribe"}
                </button>
              </div>
            )}
            <p className="nav-privacy-note">
              By providing your email address, you agree to our Privacy Policy
            </p>
          </form>
        </div>
      </nav>
    </div>
  );
}
