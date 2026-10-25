"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim().length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          (p.description || "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-overlay" role="dialog" aria-label="Search">
      {/* Search header */}
      <div className="search-header">
        <div className="header-left" />
        <div className="header-center">
          <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/Kapde-logo-no-bg.svg" alt="KAPDE" width={22} height={22} />
            <span className="site-wordmark">KAPDE</span>
          </Link>
        </div>
        <div className="header-right">
          <button
            onClick={onClose}
            className="header-icon-btn"
            aria-label="Close search"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Search input */}
      <div className="search-input-wrap">
        <Search size={16} className="search-icon" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          id="search-input"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{ color: "var(--text-muted)", flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="search-results">
        {query.trim().length > 1 && results.length === 0 && (
          <div className="empty-state" style={{ minHeight: 200 }}>
            <p className="empty-state-title">No results for "{query}"</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              {results.length} Result{results.length !== 1 ? "s" : ""}
            </p>
            <div className="search-results-grid">
              {results.map((product) => {
                const image =
                  product.variants?.[0]?.images?.[0]?.url ||
                  "/images/pleated-trousers.jpg";
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="product-card"
                    onClick={onClose}
                    style={{ background: "var(--bg)", display: "block" }}
                  >
                    <div className="product-card-image">
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="product-card-info">
                      <div className="product-card-name-row">
                        <span className="product-card-name">{product.name}</span>
                        <span className="product-card-price">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {query.trim().length <= 1 && (
          <div style={{ paddingTop: 24 }}>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Browse categories
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Pants", "T-Shirts", "Sweatshirts", "Shorts", "Accessories"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setQuery(cat)}
                    style={{
                      padding: "8px 14px",
                      border: "1px solid var(--border)",
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        "var(--border)")
                    }
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
