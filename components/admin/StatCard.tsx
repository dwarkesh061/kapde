"use client";

import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  highlight?: boolean;
  note?: string;
}

export function StatCard({ label, value, icon, highlight, note }: StatCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "3px",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "16px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b7280",
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "3px",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#374151",
          }}
        >
          {icon}
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: "28px",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: highlight ? "#d97706" : "#000000",
          }}
        >
          {value}
        </div>
        {note && (
          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              marginTop: "6px",
              fontWeight: 400,
            }}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
