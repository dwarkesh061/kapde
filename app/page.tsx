import { getProducts } from "@/lib/db";
import { StorefrontClient } from "./StorefrontClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StorefrontPage() {
  const products = await getProducts(true);

  return <StorefrontClient initialProducts={products} />;
}
