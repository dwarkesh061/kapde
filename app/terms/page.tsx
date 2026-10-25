"use client";

import { useState } from "react";
import Link from "next/link";
import { StorefrontHeader, NavSidebar } from "@/components/storefront/Header";
import { SearchOverlay } from "@/components/storefront/SearchOverlay";
import { StorefrontCartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontCheckoutModal } from "@/components/storefront/CheckoutModal";
import { StorefrontFooter } from "@/components/storefront/Footer";

export default function TermsPage() {
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
            Legal & Client Services
          </span>
          <h1 style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            Terms & Conditions
          </h1>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
            Last updated: October 2026
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontSize: "13px", lineHeight: 1.8, color: "#222" }}>
          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              1. Atelier Overview
            </h2>
            <p>
              Welcome to KAPDE. By accessing or purchasing garments through our digital storefront or concierge ordering channels, you agree to comply with and be bound by these Terms and Conditions. Our atelier specializes in limited-run menswear, bespoke tailoring, and curated contemporary silhouettes.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              2. Concierge Orders & Availability
            </h2>
            <p>
              Due to our limited batch production models, items added to the shopping bag are confirmed on a first-order basis upon submission to our WhatsApp Concierge team. While we strive to maintain real-time inventory precision, rare discrepancies in fabric availability or sizing may result in alternative garment proposals or full prompt refunds.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              3. Pricing & Payment
            </h2>
            <p>
              All listed prices are stated in Indian National Rupees (INR / ₹) inclusive of applicable goods and services taxes. Concierge payments are securely settled through certified direct payment gateways, UPI, NetBanking, and verified Cash-on-Delivery where eligible.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              4. Shipping & Logistics
            </h2>
            <p>
              Standard domestic delivery is complimentary across all pan-India pin codes. Orders are processed at our central atelier within 24–48 hours of concierge confirmation and dispatched via air courier services. Typical delivery timelines range between 3 to 5 business days depending on transit zone.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              5. Returns & Exchanges
            </h2>
            <p>
              Garments in pristine, unworn condition with all original tags attached are eligible for exchange or store credit within 7 calendar days of delivery receipt. Made-to-measure, customized alterations, or archive sale items are final sale.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", color: "var(--text)" }}>
              6. Client Inquiries
            </h2>
            <p>
              For sizing consultations, custom fabric requests, or order assistance, please reach our concierge at{" "}
              <a href="mailto:concierge@kapde.com" style={{ textDecoration: "underline", color: "var(--text)" }}>
                concierge@kapde.com
              </a>{" "}
              or via WhatsApp at +91 77378 28319.
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
