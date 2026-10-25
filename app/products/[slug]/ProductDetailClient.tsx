"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, ChevronLeft, MessageSquare } from "lucide-react";
import { StorefrontHeader, NavSidebar } from "@/components/storefront/Header";
import { SearchOverlay } from "@/components/storefront/SearchOverlay";
import { StorefrontCartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontCheckoutModal } from "@/components/storefront/CheckoutModal";
import { StorefrontFooter } from "@/components/storefront/Footer";

interface ProductDetailClientProps {
  product: Product;
  allProducts: Product[];
}

export function ProductDetailClient({ product, allProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  // Accordion states (Left column in ALD reference)
  const [openDetails, setOpenDetails] = useState(false);
  const [openSizing, setOpenSizing] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(true);

  const { addItem, openCart } = useCartStore();

  const variant = product.variants[selectedVariantIdx] || product.variants[0] || {
    id: "default",
    color: "Standard",
    colorHex: "#181818",
    images: [],
    sizes: [],
  };

  const images = variant.images || [];
  const currentImage =
    images[activeImageIdx]?.url ||
    images[0]?.url ||
    product.variants?.[0]?.images?.[0]?.url ||
    "/images/pleated-trousers.jpg";

  const sizes = variant.sizes || [];
  const currentSizeObj =
    sizes.find((s) => s.size === selectedSize) ||
    sizes.find((s) => s.stock > 0) ||
    sizes[0];

  const stock = currentSizeObj?.stock ?? 0;

  function handleAdd() {
    const sizeToUse =
      selectedSize ||
      sizes.find((s) => s.stock > 0)?.size ||
      sizes[0]?.size ||
      "OS";

    if (stock === 0 && sizes.length > 0) return;

    addItem({
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      variantColor: variant.color,
      size: sizeToUse,
      quantity: 1,
      price: product.price,
      imageUrl: currentImage,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  }

  function handleWhatsApp() {
    const sizeToUse = selectedSize || currentSizeObj?.size || "Standard";
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917737828319";
    const msg = encodeURIComponent(
      `Hello KAPDE Concierge 👋\n\nI am inquiring about:\n• Garment: ${product.name}\n• Colorway: ${variant.color}\n• Size: ${sizeToUse}\n• Price: ${formatPrice(product.price)}\n\nPlease advise on garment availability and ordering.`
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Header */}
      <StorefrontHeader
        onNavOpen={() => setNavOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Mobile / Breadcrumb indicator */}
        <div
          style={{
            padding: "10px 16px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "color 0.15s",
            }}
          >
            <ChevronLeft size={12} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {product.category}
          </span>
          <span>/</span>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>
            {product.name}
          </span>
        </div>

        {/* ALD 3-Column Product Detail Layout */}
        <div className="ald-product-layout">
          {/* ── LEFT COLUMN: Title, Price, Accordions ── */}
          <div className="ald-col-left">
            <h1 className="ald-product-title">{product.name}</h1>
            <p className="ald-product-price">{formatPrice(product.price)}</p>

            <div className="ald-accordions">
              {/* 1. Product Details */}
              <div className="ald-accordion-item">
                <button
                  type="button"
                  className="ald-accordion-trigger"
                  onClick={() => setOpenDetails((o) => !o)}
                >
                  <span>Product Details</span>
                  {openDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openDetails && (
                  <div className="ald-accordion-content">
                    <p style={{ marginBottom: 12 }}>
                      {product.description ||
                        "Tailored with precision from premium artisanal materials. Handcrafted silhouette designed for a timeless, structured fit."}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                      <li>• Composition: 100% Fine Long-Staple Cotton</li>
                      <li>• Silhouette: Relaxed luxury atelier drape</li>
                      <li>• Hardware: Custom engraved horn buttons</li>
                      <li>• Origin: Crafted with care by KAPDE</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Sizing */}
              <div className="ald-accordion-item">
                <button
                  type="button"
                  className="ald-accordion-trigger"
                  onClick={() => setOpenSizing((o) => !o)}
                >
                  <span>Sizing</span>
                  {openSizing ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSizing && (
                  <div className="ald-accordion-content">
                    <p style={{ marginBottom: 8 }}>
                      Fits true to size. For an oversized aesthetic, take one size larger.
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>
                      Model is 6'1" / 185 cm and wears size Medium / 32 waist.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Delivery and Returns */}
              <div className="ald-accordion-item">
                <button
                  type="button"
                  className="ald-accordion-trigger"
                  onClick={() => setOpenDelivery((o) => !o)}
                >
                  <span>Delivery and Returns</span>
                  {openDelivery ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openDelivery && (
                  <div className="ald-accordion-content">
                    <p style={{ marginBottom: 8 }}>
                      Orders are processed at our distribution center within 24 to 48 hours. Complimentary standard delivery across India on all orders.
                    </p>
                    <p style={{ marginBottom: 8 }}>
                      Complimentary 7-day atelier exchange policy for unworn items with original tags intact.
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>
                      For expedited fulfillment or sizing consultation, speak directly with our{" "}
                      <span
                        onClick={handleWhatsApp}
                        style={{ textDecoration: "underline", cursor: "pointer", color: "var(--text)" }}
                      >
                        Client Services Concierge
                      </span>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── CENTER COLUMN: Hero Imagery & Thumbnails ── */}
          <div className="ald-col-center">
            <div className="ald-main-image-wrap">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>

            {images.length > 1 && (
              <div className="ald-thumbs-row">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`ald-thumb-btn ${activeImageIdx === idx ? "active" : ""}`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN: Color, Size selector, Add to Bag ── */}
          <div className="ald-col-right">
            {/* Color section */}
            <div style={{ marginBottom: 20 }}>
              <p className="ald-field-label">
                Color: <span style={{ fontWeight: 400, textTransform: "none" }}>{variant.color}</span>
              </p>

              {product.variants.length > 1 && (
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  {product.variants.map((v, i) => {
                    const isSelected = selectedVariantIdx === i;
                    const vThumb = v.images?.[0]?.url;
                    return (
                      <button
                        key={v.id}
                        title={v.color}
                        onClick={() => {
                          setSelectedVariantIdx(i);
                          setSelectedSize("");
                          setActiveImageIdx(0);
                        }}
                        style={{
                          width: 48,
                          height: 56,
                          position: "relative",
                          border: `1px solid ${isSelected ? "#000000" : "var(--border)"}`,
                          background: v.colorHex || "#f2f2f2",
                          cursor: "pointer",
                          overflow: "hidden",
                          transition: "border-color 0.15s ease",
                        }}
                      >
                        {vThumb ? (
                          <Image src={vThumb} alt={v.color} fill className="object-cover" sizes="48px" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Size selection dropdown */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ position: "relative" }}>
                <select
                  value={selectedSize || (currentSizeObj ? currentSizeObj.size : "")}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="ald-size-select"
                  id="size-selector"
                  aria-label="Select garment size"
                >
                  <option value="" disabled>
                    Select Size
                  </option>
                  {sizes.map((s) => (
                    <option key={s.id} value={s.size} disabled={s.stock === 0}>
                      {s.size} {s.stock === 0 ? "— Sold Out" : s.stock <= 3 ? `(${s.stock} left)` : ""}
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                id="add-to-bag-btn"
                onClick={handleAdd}
                disabled={(stock === 0 && sizes.length > 0) || added}
                className="ald-btn-add-to-bag"
              >
                {added ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Check size={16} /> Added to Bag
                  </span>
                ) : stock === 0 && sizes.length > 0 ? (
                  "Sold Out"
                ) : (
                  "Add to Bag"
                )}
              </button>

              <button
                id="whatsapp-order-btn"
                onClick={handleWhatsApp}
                className="ald-btn-whatsapp"
              >
                <MessageSquare size={14} />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "16px", textAlign: "center" }}>
              Complimentary Shipping & 7-Day Exchange
            </p>
          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        {relatedProducts.length > 0 && (
          <section style={{ borderTop: "1px solid var(--border)", marginTop: "60px", background: "var(--bg)" }}>
            <div
              style={{
                padding: "20px 24px 14px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <h3
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                }}
              >
                You May Also Like
              </h3>
            </div>

            <div className="product-grid">
              {relatedProducts.map((p) => {
                const img = p.variants?.[0]?.images?.[0]?.url || "/images/pleated-trousers.jpg";
                return (
                  <Link key={p.id} href={`/products/${p.slug}`} className="product-card">
                    <div className="product-card-image">
                      <Image
                        src={img}
                        alt={p.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="product-card-info">
                      <div className="product-card-name-row">
                        <span className="product-card-name">{p.name}</span>
                        <span className="product-card-price">{formatPrice(p.price)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <StorefrontFooter />

      {/* Overlays */}
      <NavSidebar isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={allProducts}
        onSelectProduct={(p) => router.push(`/products/${p.slug}`)}
      />
      <StorefrontCartDrawer />
      <StorefrontCheckoutModal />
    </div>
  );
}
