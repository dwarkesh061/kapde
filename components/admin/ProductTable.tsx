"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatPrice } from "@/lib/utils";
import { Pencil, Plus, Trash2, Package } from "lucide-react";

const STATUS_FILTERS: Array<{ value: ProductStatus | "all"; label: string }> = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Live" },
  { value: "draft", label: "Draft" },
  { value: "sold_out", label: "Sold Out" },
  { value: "archived", label: "Archived" },
];

function getTotalStock(product: Product): number {
  return (product.variants || []).reduce(
    (acc, v) => acc + (v.sizes || []).reduce((a, s) => a + (s.stock || 0), 0),
    0
  );
}

interface ProductTableProps {
  initialProducts?: Product[];
}

export function ProductTable({ initialProducts = [] }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<ProductStatus | "all">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = filter === "all" ? products : products.filter((p) => p.status === filter);

  async function handleDelete(productId: string, productName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}" from the catalog?`
    );
    if (!confirmed) return;

    setDeletingId(productId);
    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete product.");
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Table Header Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {STATUS_FILTERS.map(({ value, label }) => {
            const count =
              value === "all"
                ? products.length
                : products.filter((p) => p.status === value).length;
            const isActive = filter === value;

            return (
              <button
                key={value}
                onClick={() => setFilter(value)}
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
                {label} ({count})
              </button>
            );
          })}
        </div>

        <Link
          href="/admin/products/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px",
            background: "#000000",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "2px",
          }}
        >
          <Plus size={15} />
          <span>Add New Piece</span>
        </Link>
      </div>

      {/* Main Table */}
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
                <th style={{ padding: "12px 18px" }}>Garment</th>
                <th style={{ padding: "12px 18px" }}>Category</th>
                <th style={{ padding: "12px 18px" }}>Price</th>
                <th style={{ padding: "12px 18px" }}>Total Stock</th>
                <th style={{ padding: "12px 18px" }}>Status</th>
                <th style={{ padding: "12px 18px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 18px", textAlign: "center", color: "#9ca3af" }}>
                    No garments found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((product, idx) => {
                  const image = product.variants[0]?.images[0]?.url;
                  const stock = getTotalStock(product);

                  return (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: idx === filtered.length - 1 ? "none" : "1px solid #f3f4f6",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div
                            style={{
                              position: "relative",
                              width: "40px",
                              height: "48px",
                              background: "#f3f4f6",
                              border: "1px solid #e5e7eb",
                              borderRadius: "2px",
                              overflow: "hidden",
                              flexShrink: 0,
                            }}
                          >
                            {image ? (
                              <Image src={image} alt={product.name} fill className="object-cover" />
                            ) : (
                              <Package size={16} style={{ color: "#9ca3af", margin: "auto" }} />
                            )}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                              {product.name}
                            </span>
                            <span style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "monospace" }}>
                              /{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "12px 18px", textTransform: "uppercase", fontSize: "11px", fontWeight: 500, color: "#4b5563" }}>
                        {product.category}
                      </td>

                      <td style={{ padding: "12px 18px", fontWeight: 600, color: "#111827" }}>
                        {formatPrice(product.price)}
                      </td>

                      <td style={{ padding: "12px 18px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontWeight: 600,
                            color: stock === 0 ? "#dc2626" : stock <= 5 ? "#d97706" : "#111827",
                          }}
                        >
                          {stock} units
                        </span>
                      </td>

                      <td style={{ padding: "12px 18px" }}>
                        <StatusBadge status={product.status} />
                      </td>

                      <td style={{ padding: "12px 18px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                          <Link
                            href={`/admin/products/${product.id}`}
                            style={{
                              padding: "6px",
                              borderRadius: "3px",
                              color: "#4b5563",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f3f4f6",
                            }}
                            aria-label="Edit piece"
                          >
                            <Pencil size={14} />
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={deletingId === product.id}
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
                            aria-label="Delete piece"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
