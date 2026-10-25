import { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "New Product — KAPDE CMS",
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
  return <ProductForm mode="new" />;
}
