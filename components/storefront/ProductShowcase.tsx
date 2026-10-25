"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductCategory, CATEGORIES } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";

interface ProductShowcaseProps {
  products: Product[];
  initialCategory?: ProductCategory | "all";
}

export function StorefrontProductShowcase({
  products,
  initialCategory = "all",
}: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "all" | "new-arrivals"
  >(initialCategory);
  const [refineOpen, setRefineOpen] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-asc" | "price-desc"
  >("recommended");

  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === "all" || activeCategory === "new-arrivals"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [products, activeCategory, sortBy]);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);

  // Reset page when category or sorting changes
  const handleCategorySelect = (cat: ProductCategory | "all" | "new-arrivals") => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setViewAll(false);
    setRefineOpen(false);
  };

  const handleSortChange = (newSort: "recommended" | "price-asc" | "price-desc") => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  const displayedProducts = viewAll
    ? filteredProducts
    : filteredProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setViewAll(false);
    const target = document.getElementById("shop-toolbar") || document.getElementById("collection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* Toolbar: "Shop All +" | Sort · Refine */}
      <div id="shop-toolbar" className="shop-toolbar">
        <button
          id="shop-all-btn"
          className="shop-toolbar-left"
          onClick={() => setRefineOpen((o) => !o)}
        >
          {activeCategory === "all" || activeCategory === "new-arrivals"
            ? "Shop All +"
            : `${
                CATEGORIES.find((c) => c.value === activeCategory)?.label ??
                activeCategory
              } ×`}
        </button>

        <div className="shop-toolbar-right">
          <button
            className="toolbar-control"
            onClick={() => {
              const cycle: Array<typeof sortBy> = [
                "recommended",
                "price-asc",
                "price-desc",
              ];
              const idx = cycle.indexOf(sortBy);
              handleSortChange(cycle[(idx + 1) % cycle.length]);
            }}
          >
            Sort:{" "}
            {sortBy === "recommended"
              ? "Recommended"
              : sortBy === "price-asc"
              ? "Price ↑"
              : "Price ↓"}
          </button>
          <button
            className="toolbar-control"
            onClick={() => setRefineOpen((o) => !o)}
          >
            Refine
          </button>
        </div>
      </div>

      {/* Refine Panel — category filters */}
      {refineOpen && (
        <RefinePanel
          activeCategory={activeCategory}
          onSelect={(cat) => handleCategorySelect(cat as ProductCategory | "all" | "new-arrivals")}
          onClose={() => setRefineOpen(false)}
          products={products}
        />
      )}

      {/* 4-column product grid with generous ALD spacing */}
      <section id="collection">
        {filteredProducts.length === 0 ? (
          <div className="empty-state" style={{ minHeight: "60vh" }}>
            <p className="empty-state-title">No products found</p>
            <button
              className="empty-state-sub"
              onClick={() => handleCategorySelect("all")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              View all →
            </button>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* ALD Bottom Navigation & Item count — only shown if totalPages > 1 or multiple items */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 16px 56px",
                  gap: "18px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {!viewAll && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {/* Previous button */}
                    <button
                      onClick={() => goToPage(safePage - 1)}
                      disabled={safePage <= 1}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "15px",
                        cursor: safePage <= 1 ? "not-allowed" : "pointer",
                        opacity: safePage <= 1 ? 0.25 : 0.75,
                        color: "var(--text)",
                        padding: "4px 6px",
                      }}
                      aria-label="Previous Page"
                    >
                      ‹
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = safePage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "12px",
                            fontWeight: isActive ? 600 : 400,
                            letterSpacing: "0.08em",
                            color: isActive ? "var(--text)" : "#888888",
                            borderBottom: isActive ? "1.5px solid var(--text)" : "1.5px solid transparent",
                            padding: "2px 4px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          aria-label={`Page ${pageNum}`}
                        >
                          {pageNum.toString().padStart(2, "0")}
                        </button>
                      );
                    })}

                    {/* Next button */}
                    <button
                      onClick={() => goToPage(safePage + 1)}
                      disabled={safePage >= totalPages}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "15px",
                        cursor: safePage >= totalPages ? "not-allowed" : "pointer",
                        opacity: safePage >= totalPages ? 0.25 : 0.75,
                        color: "var(--text)",
                        padding: "4px 6px",
                      }}
                      aria-label="Next Page"
                    >
                      ›
                    </button>
                  </div>
                )}

                {/* View All / Paginated Toggle */}
                <button
                  onClick={() => {
                    setViewAll((prev) => !prev);
                    if (viewAll) {
                      setCurrentPage(1);
                    }
                  }}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    padding: "7px 16px",
                    cursor: "pointer",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    transition: "all 0.15s",
                  }}
                >
                  {viewAll ? "VIEW PAGINATED" : `VIEW ALL (${filteredProducts.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

/* ── Product Card — links to /products/[slug] ──── */
function ProductCard({ product }: { product: Product }) {
  const image =
    product.variants?.[0]?.images?.[0]?.url || "/images/pleated-trousers.jpg";

  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card-image">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500"
        />
      </div>
      <div className="product-card-info">
        <div className="product-card-name-row">
          <span className="product-card-name">{product.name}</span>
          <span className="product-card-price">{formatPrice(product.price)}</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Refine Panel ───────────────────────────────── */
function RefinePanel({
  activeCategory,
  onSelect,
  onClose,
  products,
}: {
  activeCategory: string;
  onSelect: (cat: string) => void;
  onClose: () => void;
  products: Product[];
}) {
  const allCategories = [
    { value: "all", label: "All Products" },
    ...CATEGORIES,
  ];

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        padding: "14px 16px",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
      }}
    >
      {allCategories.map((cat) => {
        const count =
          cat.value === "all"
            ? products.length
            : products.filter((p) => p.category === cat.value).length;
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            style={{
              fontSize: "11px",
              fontWeight: isActive ? 600 : 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "6px 12px",
              border: `1px solid ${isActive ? "var(--text)" : "var(--border)"}`,
              background: isActive ? "var(--text)" : "var(--bg)",
              color: isActive ? "var(--text-inverse)" : "var(--text)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {cat.label}
            {count > 0 && ` (${count})`}
          </button>
        );
      })}
      <button
        onClick={onClose}
        style={{
          marginLeft: "auto",
          fontSize: "11px",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          cursor: "pointer",
        }}
      >
        <X size={12} /> Close
      </button>
    </div>
  );
}
