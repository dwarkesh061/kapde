"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";
import { StorefrontHeader } from "@/components/storefront/Header";

export function StorefrontCartDrawer() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    isOpen,
    closeCart,
    openCheckout,
    removeItem,
    updateQuantity,
    getTotalPrice,
  } = useCartStore();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const total = getTotalPrice();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/* Use the same header */}
      <header className="site-header">
        <div className="header-left">
          <button
            onClick={closeCart}
            className="header-icon-btn"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
            aria-label="Close cart"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <div className="header-center">
          <span className="site-wordmark">KAPDE</span>
        </div>
        <div className="header-right">
          <button
            onClick={closeCart}
            className="header-icon-btn"
            aria-label="Close cart and go back"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Cart body */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="cart-page">
          {/* Cart title */}
          <p className="cart-page-title">Cart</p>

          <div className="cart-layout">
            {/* Left: items */}
            <div>
              {items.length === 0 ? (
                <div className="empty-state" style={{ minHeight: "50vh" }}>
                  <p className="empty-state-title">Your bag is empty</p>
                  <button
                    className="empty-state-sub"
                    onClick={closeCart}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <>
                  <p className="cart-section-label">Available Now</p>
                  {items.map((item) => (
                    <div
                      key={`${item.variantId}-${item.size}`}
                      className="cart-item"
                    >
                      {/* Image */}
                      <div className="cart-item-image">
                        <Image
                          src={item.imageUrl || "/images/pleated-trousers.jpg"}
                          alt={item.productName}
                          fill
                          sizes="120px"
                          className="object-cover object-top"
                        />
                      </div>

                      {/* Details */}
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.productName}</p>
                        <p className="cart-item-variant">
                          {item.variantColor?.toUpperCase()} / {item.size}
                        </p>
                        <p className="cart-item-price">
                          {formatPrice(item.price)}
                        </p>

                        <div className="cart-qty-row">
                          <div className="cart-qty-ctrl">
                            <button
                              className="cart-qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="cart-qty-num">{item.quantity}</span>
                            <button
                              className="cart-qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="cart-remove-btn"
                            onClick={() =>
                              removeItem(item.variantId, item.size)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Right: Summary */}
            {items.length > 0 && (
              <div className="cart-summary">
                <p
                  style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                  }}
                >
                  Taxes calculated at checkout
                </p>

                <div className="cart-subtotal-line">
                  <span className="cart-subtotal-label">Subtotal</span>
                  <span className="cart-subtotal-value">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="cart-action-row">
                  <button className="cart-btn-update" onClick={closeCart}>
                    Update
                  </button>
                  <button
                    className="cart-btn-checkout"
                    onClick={openCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
