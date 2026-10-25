"use client";

import { useState } from "react";
import { WaitlistEntry } from "@/lib/types";
import { Trash2, MessageSquare, Mail, Download } from "lucide-react";

interface WaitlistTableProps {
  initialEntries?: WaitlistEntry[];
}

export function WaitlistTable({ initialEntries = [] }: WaitlistTableProps) {
  const [entries, setEntries] = useState<WaitlistEntry[]>(initialEntries);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this subscriber from the drop waitlist?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/waitlist?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert("Failed to delete subscriber");
    } finally {
      setDeletingId(null);
    }
  }

  function handleExportCSV() {
    const headers = ["Email", "Phone", "Interest", "Created At"];
    const rows = entries.map((e) => [
      `"${e.email || ""}"`,
      `"${e.phone || ""}"`,
      `"${e.productInterest || ""}"`,
      `"${e.createdAt}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kapde_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Header Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6b7280",
          }}
        >
          Total Subscribers: {entries.length}
        </span>

        {entries.length > 0 && (
          <button
            onClick={handleExportCSV}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "2px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#374151",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Table Card */}
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
                <th style={{ padding: "12px 18px" }}>Contact</th>
                <th style={{ padding: "12px 18px" }}>Preference / Interest</th>
                <th style={{ padding: "12px 18px" }}>Registered Date</th>
                <th style={{ padding: "12px 18px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "48px 18px", textAlign: "center", color: "#9ca3af" }}>
                    No priority drop subscribers yet.
                  </td>
                </tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    style={{
                      borderBottom: idx === entries.length - 1 ? "none" : "1px solid #f3f4f6",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {entry.email && (
                          <a
                            href={`mailto:${entry.email}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "#111827",
                              textDecoration: "underline",
                              fontWeight: 500,
                            }}
                          >
                            <Mail size={13} style={{ color: "#9ca3af" }} />
                            <span>{entry.email}</span>
                          </a>
                        )}
                        {entry.phone && (
                          <a
                            href={`https://wa.me/${entry.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "#15803d",
                              textDecoration: "underline",
                              fontSize: "11px",
                            }}
                          >
                            <MessageSquare size={13} />
                            <span>{entry.phone}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: "14px 18px", fontWeight: 500, color: "#374151" }}>
                      {entry.productInterest || "Next Drop"}
                    </td>

                    <td style={{ padding: "14px 18px", color: "#9ca3af", fontSize: "11px" }}>
                      {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        disabled={deletingId === entry.id}
                        style={{
                          padding: "6px",
                          borderRadius: "3px",
                          color: "#dc2626",
                          background: "#fef2f2",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="Remove subscriber"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
