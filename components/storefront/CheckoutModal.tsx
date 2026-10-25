"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { X, CheckCircle2, MessageSquare, ArrowRight, Loader2 } from "lucide-react";

export function StorefrontCheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, getTotalPrice, clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderResult, setOrderResult] = useState<{
    orderId: string;
    whatsappUrl: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const total = getTotalPrice();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerPhone: phone.trim(),
          city: city.trim(),
          address: address.trim(),
          note: note.trim() || undefined,
          items,
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to process checkout. Please try again.");
        setLoading(false);
        return;
      }

      setOrderResult({
        orderId: data.orderId,
        whatsappUrl: data.whatsappUrl,
      });

      clearCart();
      try {
        window.open(data.whatsappUrl, "_blank");
      } catch {}
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function handleDone() {
    setOrderResult(null);
    closeCheckout();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          background: "#ffffff",
          border: "1px solid #111111",
          borderRadius: "2px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eaeaea",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              src="/Kapde-logo-no-bg.svg"
              alt="KAPDE Crest"
              width={26}
              height={26}
              className="object-contain"
            />
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#888888",
                  display: "block",
                }}
              >
                Concierge Checkout
              </span>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#000000",
                  marginTop: "2px",
                  letterSpacing: "0.02em",
                }}
              >
                {orderResult ? "Order Received" : "Complete Your Order"}
              </h3>
            </div>
          </div>
          <button
            onClick={handleDone}
            style={{
              padding: "6px",
              color: "#888888",
              cursor: "pointer",
              transition: "color 0.15s",
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {orderResult ? (
          <div style={{ padding: "36px 28px", textAlign: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#f0fdf4",
                color: "#15803d",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                border: "1px solid #bbf7d0",
              }}
            >
              <CheckCircle2 size={30} />
            </div>

            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#888888",
                  display: "block",
                }}
              >
                Order Reference
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#000000",
                  letterSpacing: "0.06em",
                  marginTop: "4px",
                }}
              >
                {orderResult.orderId}
              </p>
              <p style={{ fontSize: "12px", color: "#666666", maxWidth: "420px", margin: "10px auto 0", lineHeight: 1.6 }}>
                Your order request has been logged. Our concierge team is ready on WhatsApp to confirm sizing and dispatch your garment.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
              <a
                href={orderResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ height: "46px", fontSize: "12px" }}
              >
                <MessageSquare size={16} />
                <span>Open WhatsApp to Confirm</span>
              </a>

              <button
                onClick={handleDone}
                className="btn-secondary"
                style={{ height: "44px", fontSize: "12px" }}
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "24px 28px 32px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: "12px",
                  borderRadius: "2px",
                }}
              >
                {error}
              </div>
            )}

            {/* Items Summary Box */}
            <div
              style={{
                padding: "14px 16px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#4b5563",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>Order Summary ({items.length} items)</span>
                <span style={{ color: "#000000", fontWeight: 700, fontSize: "12px" }}>
                  {formatPrice(total)}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "8px" }}>
                {items.map((item) => (
                  <div
                    key={`${item.variantId}-${item.size}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#4b5563",
                      lineHeight: 1.4,
                    }}
                  >
                    <span>
                      {item.quantity}× {item.productName}{" "}
                      <span style={{ color: "#888888" }}>
                        ({item.variantColor}, {item.size})
                      </span>
                    </span>
                    <span style={{ fontWeight: 500, color: "#111111", whiteSpace: "nowrap", marginLeft: "12px" }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111111",
                    marginBottom: "6px",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Kapoor"
                  className="input-base"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#111111",
                      marginBottom: "6px",
                    }}
                  >
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="input-base"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#111111",
                      marginBottom: "6px",
                    }}
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Delhi"
                    className="input-base"
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111111",
                    marginBottom: "6px",
                  }}
                >
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment/Building, Street, Landmark, Pincode"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "2px",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    color: "#000000",
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#000000")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111111",
                    marginBottom: "6px",
                  }}
                >
                  Order Note (Optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Special delivery instructions or sizing notes"
                  className="input-base"
                />
              </div>
            </div>

            <div style={{ paddingTop: "6px" }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", height: "46px", fontSize: "12px" }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order on WhatsApp</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
              <p style={{ fontSize: "11px", color: "#888888", textAlign: "center", marginTop: "8px" }}>
                Clicking will open WhatsApp with your pre-formatted order request.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
