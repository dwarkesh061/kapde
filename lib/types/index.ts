// ==============================================================================
// KAPDE — Core TypeScript Definitions
// High-Fashion Menswear E-Commerce
// ==============================================================================

export type ProductStatus = "draft" | "published" | "sold_out" | "archived";
export type OrderStatus = "pending" | "confirmed" | "cancelled";
export type ProductCategory = "pants" | "jeans" | "tees" | "shirts" | "hoodies" | "coords";

export const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: "Pants & Trousers", value: "pants" },
  { label: "Denim & Jeans", value: "jeans" },
  { label: "Tees & Tops", value: "tees" },
  { label: "Overshirts & Shirts", value: "shirts" },
  { label: "Hoodies & Knitwear", value: "hoodies" },
  { label: "Co-ord Sets", value: "coords" },
];

export interface ProductSize {
  id: string;
  size: string; // "28" | "30" | "32" | "34" | "36" | "S" | "M" | "L" | "XL" | "XXL"
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  colorHex?: string;
  images: ProductImage[];
  sizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  price: number;
  variants: ProductVariant[];
  featured: boolean;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantColor: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantColor: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface OrderRequest {
  id: string;
  orderId: string; // e.g. KAPDE-2026-0042
  items: OrderItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  note?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WaitlistEntry {
  id: string;
  email?: string;
  phone?: string;
  productInterest?: string;
  createdAt: string;
}

export interface DashboardStats {
  liveProducts: number;
  pendingOrders: number;
  confirmedToday: number;
  waitlistCount: number;
}

export interface LowStockAlert {
  productId: string;
  productName: string;
  variantColor: string;
  size: string;
  stock: number;
  imageUrl?: string;
}
