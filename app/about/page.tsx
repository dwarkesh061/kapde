import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles, Scissors, Clock } from "lucide-react";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { StorefrontCartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontCheckoutModal } from "@/components/storefront/CheckoutModal";
import { StorefrontWaitlistSection } from "@/components/storefront/WaitlistSection";

export const metadata: Metadata = {
  title: "Atelier & Philosophy — KAPDE",
  description:
    "KAPDE was established to challenge the disposable cycle of modern menswear. Classical tailoring, contemporary volume, and Savile Row ease from Ahmedabad.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Atelier & Philosophy — KAPDE",
    description:
      "Classical tailoring meets contemporary volume. Savile Row ease, heavy natural fibers, and direct WhatsApp concierge.",
    url: "/about",
  },
};

export default function AboutPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917737828319";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello KAPDE Atelier 👋\nI have an inquiry regarding garments, tailoring, or custom sizing."
  )}`;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Universal ALD-Style Header */}
      <StorefrontHeader />

      <main style={{ flex: 1 }}>
        {/* Hero Narrative */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "80px 24px 72px",
            background: "#fafafa",
          }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#888888",
                display: "block",
                marginBottom: "16px",
              }}
            >
              The Atelier Manifesto · KAPDE
            </span>

            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "#111111",
                fontFamily: "var(--font-serif, serif)",
                margin: "0 auto 24px",
                maxWidth: "840px",
              }}
            >
              Classical Tailoring. <br />
              <span style={{ fontStyle: "italic" }}>Architectural</span> Volume.
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 1.8vw, 17px)",
                color: "#555555",
                lineHeight: 1.65,
                maxWidth: "680px",
                margin: "0 auto 36px",
              }}
            >
              KAPDE was established to challenge the disposable cycle of modern fashion.
              We design garments that prioritize drape, substance, and permanent ease over
              fleeting micro-trends.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link
                href="/#collection"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  background: "#000000",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                <span>View The Collection</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  background: "transparent",
                  color: "#000000",
                  border: "1px solid #111111",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                <MessageSquare size={14} />
                <span>Concierge Sizing</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3 Craftsmanship Pillars */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#999999",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Foundational Principles
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 400,
                fontFamily: "var(--font-serif, serif)",
                color: "#111111",
                margin: 0,
              }}
            >
              Crafted With Purpose &amp; Permanence
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px",
            }}
          >
            {/* Pillar 1 */}
            <div
              style={{
                padding: "36px 30px",
                border: "1px solid var(--border)",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f4f4f4",
                  borderRadius: "2px",
                }}
              >
                <Scissors size={20} style={{ color: "#111111" }} />
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                  color: "#111111",
                }}
              >
                Savile Row Ease
              </h3>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, margin: 0 }}>
                Deep double forward pleats, relaxed rise through the seat and thighs, and an intentional break
                engineered to stack effortlessly over leather loafers or low-top sneakers.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                padding: "36px 30px",
                border: "1px solid var(--border)",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f4f4f4",
                  borderRadius: "2px",
                }}
              >
                <ShieldCheck size={20} style={{ color: "#111111" }} />
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                  color: "#111111",
                }}
              >
                Substantial Weight
              </h3>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, margin: 0 }}>
                We reject flimsy, synthetic, painted fabrics. We exclusively mill 300–480 GSM natural worsted
                wool, 14.5oz Japanese shuttle-loom selvedge denim, and combed ringspun cotton jersey.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                padding: "36px 30px",
                border: "1px solid var(--border)",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f4f4f4",
                  borderRadius: "2px",
                }}
              >
                <Clock size={20} style={{ color: "#111111" }} />
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                  color: "#111111",
                }}
              >
                Artisanal Small Batches
              </h3>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, margin: 0 }}>
                Manufactured in limited edition runs out of Ahmedabad, Gujarat. Every finished piece is hand-inspected,
                serially recorded, and verified before fulfillment.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Split Showcase */}
        <section
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                background: "#f3f4f6",
                borderRight: "1px solid var(--border)",
              }}
            >
              <Image
                src="/images/pleated-trousers.jpg"
                alt="KAPDE Tailored Trouser Drape"
                fill
                className="object-cover object-top"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "#ffffff",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Silhouette 01
                </span>
                <p style={{ fontSize: "18px", fontFamily: "var(--font-serif, serif)", margin: "4px 0 0" }}>
                  The Tailored Baggy Pleat
                </p>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                background: "#f3f4f6",
                borderRight: "1px solid var(--border)",
              }}
            >
              <Image
                src="/images/selvedge-denim.jpg"
                alt="KAPDE Raw Selvedge Denim"
                fill
                className="object-cover object-top"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "#ffffff",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Silhouette 02
                </span>
                <p style={{ fontSize: "18px", fontFamily: "var(--font-serif, serif)", margin: "4px 0 0" }}>
                  Wide Japanese Selvedge
                </p>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                background: "#f3f4f6",
              }}
            >
              <Image
                src="/images/heavyweight-tee.jpg"
                alt="KAPDE Heavyweight Tee"
                fill
                className="object-cover object-top"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "#ffffff",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Silhouette 03
                </span>
                <p style={{ fontSize: "18px", fontFamily: "var(--font-serif, serif)", margin: "4px 0 0" }}>
                  300 GSM Heavyweight Tee
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Waitlist Section */}
        <StorefrontWaitlistSection />
      </main>

      {/* Universal ALD-Style Footer */}
      <StorefrontFooter />
      <StorefrontCartDrawer />
      <StorefrontCheckoutModal />
    </div>
  );
}
