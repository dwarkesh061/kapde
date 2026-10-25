import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDashboardStats } from "@/lib/db";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard — KAPDE Atelier CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { stats, lowStock, recentOrders } = await getDashboardStats();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          paddingBottom: "24px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9ca3af",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Storefront Intelligence
          </span>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#000000",
              margin: 0,
            }}
          >
            Dashboard Overview
          </h1>
          <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <Link
          href="/admin/products/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            background: "#000000",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "2px",
            transition: "opacity 0.15s ease",
          }}
        >
          <Plus size={16} />
          <span>Add New Piece</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        <StatCard
          label="Active Pieces"
          value={stats.liveProducts}
          icon={<Package size={17} />}
          note="Live on storefront"
        />
        <StatCard
          label="Pending Orders"
          value={stats.pendingOrders}
          icon={<ShoppingBag size={17} />}
          highlight={stats.pendingOrders > 0}
          note="Awaiting WhatsApp confirmation"
        />
        <StatCard
          label="Low Stock Alerts"
          value={lowStock.length}
          icon={<AlertTriangle size={17} />}
          highlight={lowStock.length > 0}
          note={lowStock.length > 0 ? "Requires mill restock" : "All inventory healthy"}
        />
        <StatCard
          label="Waitlist Subscribers"
          value={stats.waitlistCount}
          icon={<Users size={17} />}
          note="Drop 02 priority roster"
        />
      </div>

      {/* Split Tables: Recent Orders & Low Stock Alerts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
          alignItems: "start",
          width: "100%",
        }}
      >
        {/* Recent Orders Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "3px",
            overflow: "hidden",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fafafa",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShoppingBag size={16} style={{ color: "#000000" }} />
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#000000",
                  margin: 0,
                }}
              >
                Recent Orders
              </h2>
            </div>
            <Link
              href="/admin/orders"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#6b7280",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {recentOrders.length === 0 ? (
              <p style={{ padding: "28px 20px", fontSize: "12px", color: "#9ca3af", textAlign: "center", margin: 0 }}>
                No orders logged yet.
              </p>
            ) : (
              recentOrders.map((order, idx) => (
                <div
                  key={order.id}
                  style={{
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: idx === recentOrders.length - 1 ? "none" : "1px solid #f3f4f6",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {order.orderId}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#4b5563" }}>
                      {order.customerName} · {order.city}
                    </span>
                  </div>

                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                      {formatPrice(order.total)}
                    </span>
                    <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alerts Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "3px",
            overflow: "hidden",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fafafa",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={16} style={{ color: "#d97706" }} />
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#000000",
                  margin: 0,
                }}
              >
                Low Inventory Alerts
              </h2>
            </div>
            <Link
              href="/admin/products"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#6b7280",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Manage Catalog</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {lowStock.length === 0 ? (
              <p style={{ padding: "28px 20px", fontSize: "12px", color: "#9ca3af", textAlign: "center", margin: 0 }}>
                All sizes have sufficient stock levels (&gt; 3 units).
              </p>
            ) : (
              lowStock.slice(0, 6).map((item, idx) => (
                <div
                  key={`${item.productId}_${item.size}_${idx}`}
                  style={{
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: idx === Math.min(lowStock.length, 6) - 1 ? "none" : "1px solid #f3f4f6",
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
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Package size={16} style={{ color: "#9ca3af", margin: "auto" }} />
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#111827",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.productName}
                      </span>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>
                        {item.variantColor} · Size: <strong style={{ color: "#111827" }}>{item.size}</strong>
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        color: item.stock <= 1 ? "#dc2626" : "#d97706",
                        display: "block",
                      }}
                    >
                      {item.stock} left
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: item.stock <= 1 ? "#dc2626" : "#d97706",
                      }}
                    >
                      {item.stock <= 1 ? "Critical" : "Low"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
