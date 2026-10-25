"use client";

import { useState } from "react";
import Link from "next/link";
import { StorefrontHeader, NavSidebar } from "@/components/storefront/Header";
import { SearchOverlay } from "@/components/storefront/SearchOverlay";
import { StorefrontCartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontCheckoutModal } from "@/components/storefront/CheckoutModal";
import { StorefrontFooter } from "@/components/storefront/Footer";

export default function PrivacyPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <StorefrontHeader
        onNavOpen={() => setNavOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <main style={{ flex: 1, maxWidth: "800px", margin: "0 auto", padding: "48px 24px 80px", width: "100%" }}>
        <div style={{ marginBottom: "32px", borderBottom: "1px solid var(--border)", paddingBottom: "20px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
            Client Confidentiality & Privacy
          </span>
          <h1 style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
            Last updated: October 2026
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontSize: "13px", lineHeight: 1.8, color: "#222" }}>
          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              1. Our Privacy Commitment
            </h2>
            <p>
              KAPDE values the privacy and confidentiality of our patrons. This Privacy Policy details how we collect, utilize, and protect your personal identification information across our digital storefront, waitlist subscriptions, and WhatsApp concierge communications.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              2. Information We Collect
            </h2>
            <p>
              When initiating an order or joining our priority drop waitlist, we collect strictly necessary details to fulfill your garments:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <li>Client Name and WhatsApp Contact Number</li>
              <li>Shipping Address, Postal Pincode, and Delivery City</li>
              <li>Garment sizing preferences and personalized order notes</li>
              <li>Waitlist email address (if opted-in for drop previews)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              3. Use of Information
            </h2>
            <p>
              Client data is used exclusively to:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <li>Confirm garment availability and process orders via our WhatsApp Concierge</li>
              <li>Dispatch parcels via verified domestic air express couriers</li>
              <li>Provide direct fulfillment notifications and shipping tracking links</li>
              <li>Notify priority waitlist members regarding upcoming collection drops</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              4. Data Protection & Non-Disclosure
            </h2>
            <p>
              We maintain strict administrative safeguards. KAPDE will never sell, rent, monetize, or publicly share your contact information with unauthorized third-party marketing services. Trusted logistics partners receive only your destination address and phone contact for shipping delivery purposes.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              5. Client Rights & Opt-Out
            </h2>
            <p>
              You maintain full authority over your data. To review, modify, or permanently remove your contact details or unsubscribe from our waitlist roster, simply message our concierge at{" "}
              <a href="mailto:privacy@kapde.com" style={{ textDecoration: "underline", color: "var(--text)" }}>
                privacy@kapde.com
              </a>{" "}
              or message +91 77378 28319.
            </p>
          </section>
        </div>

        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          <Link href="/" className="btn-secondary" style={{ height: "38px" }}>
            ← Return to Collection
          </Link>
        </div>
      </main>

      <StorefrontFooter />

      <NavSidebar isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={[]}
        onSelectProduct={() => {}}
      />
      <StorefrontCartDrawer />
      <StorefrontCheckoutModal />
    </div>
  );
}
