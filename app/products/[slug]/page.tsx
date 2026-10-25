import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/db";
import { ProductDetailClient } from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — KAPDE" };

  return {
    title: `${product.name} — KAPDE`,
    description: product.description || `Shop ${product.name} at KAPDE.`,
    openGraph: {
      title: `${product.name} — KAPDE`,
      description: product.description,
      images: product.variants?.[0]?.images?.[0]?.url
        ? [{ url: product.variants[0].images[0].url }]
        : [],
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(true),
  ]);

  if (!product) notFound();

  return <ProductDetailClient product={product} allProducts={allProducts} />;
}
