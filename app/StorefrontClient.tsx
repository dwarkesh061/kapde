"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { StorefrontHeader, NavSidebar } from "@/components/storefront/Header";
import { StorefrontProductShowcase } from "@/components/storefront/ProductShowcase";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { StorefrontCartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontCheckoutModal } from "@/components/storefront/CheckoutModal";
import { SearchOverlay } from "@/components/storefront/SearchOverlay";

interface StorefrontClientProps {
  initialProducts: Product[];
}

export function StorefrontClient({ initialProducts }: StorefrontClientProps) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Main Header */}
      <StorefrontHeader
        onNavOpen={() => setNavOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* Main Content — products immediately after header */}
      <main style={{ flex: 1 }}>
        <StorefrontProductShowcase
          products={initialProducts}
          initialCategory={activeCategory as never}
        />
      </main>

      <StorefrontFooter />

      {/* Navigation Sidebar (dark, ALD-style) */}
      <NavSidebar
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onCategorySelect={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* Full-screen Search */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={initialProducts}
        onSelectProduct={(p) => {
          setSearchOpen(false);
          router.push(`/products/${p.slug}`);
        }}
      />

      {/* Full-screen Cart */}
      <StorefrontCartDrawer />

      {/* Checkout Modal */}
      <StorefrontCheckoutModal />
    </div>
  );
}
