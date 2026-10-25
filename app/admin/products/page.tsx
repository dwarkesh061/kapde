import { Metadata } from "next";
import { getProducts } from "@/lib/db";
import { ProductTable } from "@/components/admin/ProductTable";

export const metadata: Metadata = {
  title: "Products Catalog — KAPDE CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getProducts(false);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 block mb-1">
          Catalog Management
        </span>
        <h1 className="text-3xl font-serif text-black">
          Atelier Collection
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Configure product silhouettes, colorways, imagery, and size inventory.
        </p>
      </div>

      <ProductTable initialProducts={products} />
    </div>
  );
}
