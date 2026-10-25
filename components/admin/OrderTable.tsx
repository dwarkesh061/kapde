"use client";

import { useState } from "react";
import Image from "next/image";
import { OrderRequest, OrderStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatPrice } from "@/lib/utils";
import { MessageSquare, Check, X, Eye, ExternalLink, Loader2, Package } from "lucide-react";

interface OrderTableProps {
  initialOrders?: OrderRequest[];
}

export function OrderTable({ initialOrders = [] }: OrderTableProps) {
  const [orders, setOrders] = useState<OrderRequest[]>(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState("");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  async function handleConfirm(orderId: string) {
    setProcessing(true);
    setActionError("");

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "confirm", orderId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to confirm order.");
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId || o.orderId === orderId ? { ...o, status: "confirmed" } : o))
      );

      if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderId === orderId)) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: "confirmed" } : null));
      }
    } catch {
      setActionError("Network error while confirming order.");
    } finally {
      setProcessing(false);
    }
  }

  async function handleCancel(orderId: string) {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setProcessing(true);
    setActionError("");

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel", orderId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to cancel order.");
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId || o.orderId === orderId ? { ...o, status: "cancelled" } : o))
      );

      if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderId === orderId)) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: "cancelled" } : null));
      }
    } catch {
      setActionError("Network error while cancelling order.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Status Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {(["all", "pending", "confirmed", "cancelled"] as const).map((st) => {
          const count = st === "all" ? orders.length : orders.filter((o) => o.status === st).length;
          const isActive = filter === st;

          return (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                fontSize: "11px",
                fontWeight: isActive ? 600 : 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "2px",
                border: `1px solid ${isActive ? "#000000" : "#e5e7eb"}`,
                background: isActive ? "#000000" : "#ffffff",
                color: isActive ? "#ffffff" : "#4b5563",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table Card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "3px",
          overflow: "hidden",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "12px" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6b7280",
                  fontWeight: 600,
                }}
              >
                <th style={{ padding: "12px 18px" }}>Order Ref</th>
                <th style={{ padding: "12px 18px" }}>Customer</th>
                <th style={{ padding: "12px 18px" }}>City</th>
                <th style={{ padding: "12px 18px" }}>Items</th>
                <th style={{ padding: "12px 18px" }}>Total</th>
                <th style={{ padding: "12px 18px" }}>Status</th>
                <th style={{ padding: "12px 18px" }}>Date</th>
                <th style={{ padding: "12px 18px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "48px 18px", textAlign: "center", color: "#9ca3af" }}>
                    No orders matching selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order, idx) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      borderBottom: idx === filtered.length - 1 ? "none" : "1px solid #f3f4f6",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <td style={{ padding: "14px 18px", fontFamily: "monospace", fontWeight: 700, color: "#111827" }}>
                      {order.orderId}
                    </td>

                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 600, color: "#111827" }}>{order.customerName}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>{order.customerPhone}</div>
                    </td>

                    <td style={{ padding: "14px 18px", color: "#4b5563" }}>{order.city}</td>

                    <td style={{ padding: "14px 18px", color: "#4b5563" }}>
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
                    </td>

                    <td style={{ padding: "14px 18px", fontWeight: 700, color: "#111827" }}>
                      {formatPrice(order.total)}
                    </td>

                    <td style={{ padding: "14px 18px" }}>
                      <StatusBadge status={order.status} />
                    </td>

                    <td style={{ padding: "14px 18px", color: "#9ca3af", fontSize: "11px" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>

                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        style={{
                          padding: "6px",
                          borderRadius: "3px",
                          color: "#4b5563",
                          background: "#f3f4f6",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="View order"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              background: "#ffffff",
              border: "1px solid #111111",
              borderRadius: "3px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fafafa",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                    {selectedOrder.orderId}
                  </span>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: "4px 0 0" }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error banner */}
            {actionError && (
              <div
                style={{
                  margin: "16px 24px 0",
                  padding: "12px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: "12px",
                  borderRadius: "2px",
                }}
              >
                {actionError}
              </div>
            )}

            {/* Modal Content */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Customer Box */}
              <div
                style={{
                  padding: "16px",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "2px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                  }}
                >
                  Customer & Shipping Destination
                </span>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                    fontSize: "12px",
                  }}
                >
                  <div>
                    <span style={{ color: "#6b7280", display: "block" }}>Name:</span>
                    <strong style={{ color: "#111827" }}>{selectedOrder.customerName}</strong>
                  </div>

                  <div>
                    <span style={{ color: "#6b7280", display: "block" }}>WhatsApp Phone:</span>
                    <a
                      href={`https://wa.me/${selectedOrder.customerPhone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#15803d",
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                    >
                      <MessageSquare size={13} />
                      <span>{selectedOrder.customerPhone}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>

                  <div>
                    <span style={{ color: "#6b7280", display: "block" }}>City:</span>
                    <span style={{ color: "#111827" }}>{selectedOrder.city}</span>
                  </div>

                  <div>
                    <span style={{ color: "#6b7280", display: "block" }}>Delivery Address:</span>
                    <span style={{ color: "#111827" }}>{selectedOrder.address}</span>
                  </div>

                  {selectedOrder.note && (
                    <div style={{ gridColumn: "1 / -1", paddingTop: "8px", borderTop: "1px solid #e5e7eb" }}>
                      <span style={{ color: "#6b7280", display: "block" }}>Special Note:</span>
                      <span style={{ color: "#374151", fontStyle: "italic" }}>{selectedOrder.note}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                  }}
                >
                  Garment Order Items
                </span>

                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "2px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: idx === selectedOrder.items.length - 1 ? "none" : "1px solid #f3f4f6",
                        background: "#ffffff",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            position: "relative",
                            width: "36px",
                            height: "44px",
                            background: "#f3f4f6",
                            border: "1px solid #e5e7eb",
                            borderRadius: "2px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          {item.imageUrl ? (
                            <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                          ) : (
                            <Package size={16} style={{ color: "#9ca3af", margin: "auto" }} />
                          )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                            {item.productName}
                          </span>
                          <span style={{ fontSize: "11px", color: "#6b7280" }}>
                            Color: {item.variantColor} · Size: <strong style={{ color: "#111827" }}>{item.size}</strong> · Qty: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 4px 0",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  <span>Total Amount</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Action Controls */}
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {selectedOrder.status === "pending" && (
                  <button
                    onClick={() => handleConfirm(selectedOrder.id)}
                    disabled={processing}
                    style={{
                      flex: 1,
                      minWidth: "200px",
                      height: "42px",
                      background: "#000000",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "2px",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {processing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Confirm & Decrement Stock</span>
                      </>
                    )}
                  </button>
                )}

                {selectedOrder.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(selectedOrder.id)}
                    disabled={processing}
                    style={{
                      padding: "0 18px",
                      height: "42px",
                      background: "transparent",
                      color: "#dc2626",
                      border: "1px solid #fca5a5",
                      borderRadius: "2px",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Order
                  </button>
                )}

                <a
                  href={`https://wa.me/${selectedOrder.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedOrder.customerName}, this is KAPDE Atelier regarding your order ${selectedOrder.orderId}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0 18px",
                    height: "42px",
                    background: "#25D366",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "2px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <MessageSquare size={14} />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
