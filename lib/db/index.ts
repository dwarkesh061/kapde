// ==============================================================================
// KAPDE — Supabase Database Client & Fallback Engine
// Seamlessly operates against Supabase Cloud or Mock Dataset in Local Dev
// ==============================================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { generateOrderId, MOCK_PRODUCTS, MOCK_ORDERS, MOCK_WAITLIST } from "@/lib/data/mock";
import { Product, OrderRequest, WaitlistEntry, DashboardStats, LowStockAlert } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl !== "https://your-project.supabase.co" &&
  !supabaseUrl.includes("your-project") &&
  supabaseUrl.trim() !== ""
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!, {
      auth: { persistSession: false },
    })
  : null;

// In-memory runtime cache for local dev fallback mode
let localProducts = [...MOCK_PRODUCTS];
let localOrders = [...MOCK_ORDERS];
let localWaitlist = [...MOCK_WAITLIST];

function formatProductRow(p: any): Product {
  const sortedVariants = (p.variants || [])
    .slice()
    .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description || "",
    category: p.category as Product["category"],
    price: Number(p.price),
    featured: Boolean(p.featured),
    status: p.status as Product["status"],
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    variants: sortedVariants.map((v: any) => ({
      id: v.id,
      productId: v.product_id,
      color: v.color,
      colorHex: v.color_hex || "#181818",
      images: (v.images || [])
        .slice()
        .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((img: any) => ({
          id: img.id,
          url: img.url,
          alt: img.alt || "",
          sortOrder: img.sort_order ?? 0,
        })),
      sizes: (v.sizes || [])
        .slice()
        .map((sz: any) => ({
          id: sz.id,
          size: sz.size,
          stock: Number(sz.stock ?? 0),
        })),
    })),
  };
}

/**
 * Fetch all published products for storefront or all products for admin
 */
export async function getProducts(onlyPublished = false): Promise<Product[]> {
  // When Supabase is NOT configured at all — pure local dev mode, use mock data
  if (!isSupabaseConfigured || !supabase) {
    if (onlyPublished) {
      return localProducts.filter((p) => p.status === "published");
    }
    return localProducts;
  }

  // When Supabase IS configured, always use the real database.
  // Do NOT fall back to mock data — if the database is empty, return empty.
  // This ensures the storefront only shows what has been uploaded by the admin.
  try {
    let query = supabase
      .from("products")
      .select(`
        id, name, slug, description, category, price, featured, status, created_at, updated_at,
        variants:product_variants(
          id, product_id, color, color_hex, sort_order,
          images:product_images(id, url, alt, sort_order),
          sizes:product_sizes(id, size, stock)
        )
      `)
      .order("created_at", { ascending: false });

    if (onlyPublished) {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;
    if (error) {
      // Only log the error — do NOT fall back to mock data when Supabase is configured
      console.error("Supabase getProducts error:", error.message);
      return [];
    }

    // Return real data (may be empty if admin has deleted/not yet added products)
    return (data || []).map(formatProductRow);
  } catch (err) {
    console.error("Supabase getProducts exception:", err);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localProducts.find((p) => p.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id, name, slug, description, category, price, featured, status, created_at, updated_at,
        variants:product_variants(
          id, product_id, color, color_hex, sort_order,
          images:product_images(id, url, alt, sort_order),
          sizes:product_sizes(id, size, stock)
        )
      `)
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return formatProductRow(data);
  } catch (err) {
    console.error("Supabase getProductById exception:", err);
    return null;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id, name, slug, description, category, price, featured, status, created_at, updated_at,
        variants:product_variants(
          id, product_id, color, color_hex, sort_order,
          images:product_images(id, url, alt, sort_order),
          sizes:product_sizes(id, size, stock)
        )
      `)
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return formatProductRow(data);
  } catch (err) {
    console.error("Supabase getProductBySlug exception:", err);
    return null;
  }
}

/**
 * Save or update product and its entire hierarchy in Supabase Cloud
 */
export async function saveProduct(productData: Partial<Product> & {
  name: string;
  price: number;
}): Promise<{ success: boolean; product?: Product; error?: string }> {
  const productId = productData.id && !productData.id.startsWith("prod_new_")
    ? productData.id
    : `prod_${Date.now()}`;

  let slug = productData.slug?.trim();
  if (!slug) {
    slug = productData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!slug) slug = `product-${Date.now()}`;
  }

  if (!isSupabaseConfigured || !supabase) {
    const existingIndex = localProducts.findIndex((p) => p.id === productId);
    const newProduct: Product = {
      id: productId,
      name: productData.name.trim(),
      slug,
      description: productData.description || "",
      category: (productData.category as Product["category"]) || "pants",
      price: Number(productData.price),
      featured: Boolean(productData.featured),
      status: (productData.status as Product["status"]) || "draft",
      createdAt: existingIndex > -1 ? localProducts[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variants: productData.variants || [],
    };

    if (existingIndex > -1) {
      localProducts[existingIndex] = newProduct;
    } else {
      localProducts.unshift(newProduct);
    }

    return { success: true, product: newProduct };
  }

  try {
    const productRow = {
      id: productId,
      name: productData.name.trim(),
      slug,
      description: productData.description || "",
      category: productData.category || "pants",
      price: Number(productData.price),
      featured: Boolean(productData.featured),
      status: productData.status || "draft",
      updated_at: new Date().toISOString(),
    };

    const { error: prodErr } = await supabase
      .from("products")
      .upsert(productRow, { onConflict: "id" });

    if (prodErr) {
      console.error("Error saving product row:", prodErr);
      return { success: false, error: prodErr.message };
    }

    if (productData.variants && Array.isArray(productData.variants)) {
      const { data: existingVariants } = await supabase
        .from("product_variants")
        .select("id")
        .eq("product_id", productId);

      const incomingVariantIds = productData.variants
        .map((v) => v.id)
        .filter((id) => id && !id.startsWith("var_new_"));

      const toDeleteVariantIds = (existingVariants || [])
        .map((v) => v.id)
        .filter((id) => !incomingVariantIds.includes(id));

      if (toDeleteVariantIds.length > 0) {
        await supabase
          .from("product_variants")
          .delete()
          .in("id", toDeleteVariantIds);
      }

      for (let vIdx = 0; vIdx < productData.variants.length; vIdx++) {
        const variant = productData.variants[vIdx];
        const variantId = variant.id && !variant.id.startsWith("var_new_")
          ? variant.id
          : `var_${Date.now()}_${vIdx}`;

        const { error: vErr } = await supabase
          .from("product_variants")
          .upsert(
            {
              id: variantId,
              product_id: productId,
              color: variant.color || `Colour ${vIdx + 1}`,
              color_hex: variant.colorHex || "#181818",
              sort_order: vIdx,
            },
            { onConflict: "id" }
          );

        if (vErr) {
          console.error("Error saving variant:", vErr);
          continue;
        }

        await supabase.from("product_images").delete().eq("variant_id", variantId);

        if (variant.images && variant.images.length > 0) {
          const imageRows = variant.images.map((img, imgIdx) => ({
            id: img.id && !img.id.startsWith("img_new_")
              ? img.id
              : `img_${Date.now()}_${vIdx}_${imgIdx}`,
            variant_id: variantId,
            url: img.url,
            alt: img.alt || `${productData.name} - ${variant.color || "variant"}`,
            sort_order: img.sortOrder ?? imgIdx,
          }));

          const { error: imgErr } = await supabase.from("product_images").insert(imageRows);
          if (imgErr) console.error("Error saving product images:", imgErr);
        }

        await supabase.from("product_sizes").delete().eq("variant_id", variantId);

        if (variant.sizes && variant.sizes.length > 0) {
          const sizeRows = variant.sizes
            .filter((s) => s.size && s.size.trim() !== "")
            .map((sz, szIdx) => ({
              id: sz.id && !sz.id.startsWith("sz_new_")
                ? sz.id
                : `sz_${Date.now()}_${vIdx}_${szIdx}`,
              variant_id: variantId,
              size: sz.size.trim(),
              stock: Math.max(0, Number(sz.stock) || 0),
            }));

          if (sizeRows.length > 0) {
            const { error: szErr } = await supabase.from("product_sizes").insert(sizeRows);
            if (szErr) console.error("Error saving product sizes:", szErr);
          }
        }
      }
    }

    const saved = await getProductById(productId);
    return { success: true, product: saved || undefined };
  } catch (err: any) {
    console.error("saveProduct exception:", err);
    return { success: false, error: err.message || "Failed to save product" };
  }
}

/**
 * Delete a product from Supabase Cloud or local store
 */
export async function deleteProduct(productId: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    localProducts = localProducts.filter((p) => p.id !== productId);
    return { success: true };
  }

  try {
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("deleteProduct error:", err);
    return { success: false, error: err.message || "Failed to delete product" };
  }
}

/**
 * Create a new Order Request
 */
export async function createOrderRequest(orderData: {
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  note?: string;
  items: Array<{
    productId: string;
    productName: string;
    variantId: string;
    variantColor: string;
    size: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }>;
  total: number;
}): Promise<{ success: boolean; orderId: string; error?: string }> {
  const generatedId = generateOrderId();
  const internalId = `req_${Date.now()}`;

  const newOrder: OrderRequest = {
    id: internalId,
    orderId: generatedId,
    customerName: orderData.customerName,
    customerPhone: orderData.customerPhone,
    city: orderData.city,
    address: orderData.address,
    note: orderData.note,
    total: orderData.total,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: orderData.items,
  };
  localOrders.unshift(newOrder);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, orderId: generatedId };
  }

  try {
    const { error: orderErr } = await supabase.from("order_requests").insert({
      id: internalId,
      order_id: generatedId,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      city: orderData.city,
      address: orderData.address,
      note: orderData.note || null,
      total: orderData.total,
      status: "pending",
    });

    if (orderErr) {
      console.warn("Supabase order insert warning:", orderErr.message);
      return { success: true, orderId: generatedId };
    }

    const orderItems = orderData.items.map((item) => ({
      order_id: internalId,
      product_id: item.productId,
      product_name: item.productName,
      variant_id: item.variantId,
      variant_color: item.variantColor,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      image_url: item.imageUrl || null,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
    if (itemsErr) console.warn("Supabase order items warning:", itemsErr.message);

    return { success: true, orderId: generatedId };
  } catch (err: any) {
    console.warn("createOrderRequest exception, fallback to localOrders:", err.message);
    return { success: true, orderId: generatedId };
  }
}

/**
 * Add an entry to the waitlist
 */
export async function addWaitlistEntry(entry: {
  email?: string;
  phone?: string;
  productInterest?: string;
}): Promise<{ success: boolean; alreadyExists?: boolean; error?: string }> {
  const cleanEmail = entry.email ? entry.email.trim().toLowerCase() : null;
  const cleanPhone = entry.phone ? entry.phone.trim().replace(/[\s-]/g, "") : null;

  if (!isSupabaseConfigured || !supabase) {
    if (cleanEmail && localWaitlist.some((w) => w.email?.toLowerCase() === cleanEmail)) {
      return { success: true, alreadyExists: true };
    }
    localWaitlist.unshift({
      id: `wl_${Date.now()}`,
      email: cleanEmail || undefined,
      phone: cleanPhone || undefined,
      productInterest: entry.productInterest || "Next Drop",
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  }

  try {
    if (cleanEmail) {
      const { data: existingEmail } = await supabase
        .from("waitlist")
        .select("id")
        .ilike("email", cleanEmail)
        .maybeSingle();

      if (existingEmail) {
        return { success: true, alreadyExists: true };
      }
    }

    if (cleanPhone) {
      const { data: existingPhone } = await supabase
        .from("waitlist")
        .select("id")
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (existingPhone) {
        return { success: true, alreadyExists: true };
      }
    }

    const { error } = await supabase.from("waitlist").insert({
      email: cleanEmail,
      phone: cleanPhone,
      product_interest: entry.productInterest || "Next Drop",
    });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("addWaitlistEntry error:", err);
    return { success: false, error: err.message || "Failed to record waitlist entry" };
  }
}

/**
 * Fetch all waitlist subscribers for Admin
 */
export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localWaitlist;
  }

  try {
    const { data, error } = await supabase
      .from("waitlist")
      .select("id, email, phone, product_interest, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) return localWaitlist;

    return data.map((item: any) => ({
      id: item.id,
      email: item.email || undefined,
      phone: item.phone || undefined,
      productInterest: item.product_interest || "Next Drop",
      createdAt: item.created_at,
    }));
  } catch (err) {
    console.error("getWaitlistEntries error:", err);
    return localWaitlist;
  }
}

/**
 * Admin action: Delete a waitlist subscriber
 */
export async function deleteWaitlistEntry(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    localWaitlist = localWaitlist.filter((w) => w.id !== id);
    return { success: true };
  }

  try {
    const { error } = await supabase.from("waitlist").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("deleteWaitlistEntry error:", err);
    return { success: false, error: err.message || "Failed to delete waitlist entry" };
  }
}

/**
 * Fetch all order requests for Admin
 */
export async function getOrders(): Promise<OrderRequest[]> {
  if (!isSupabaseConfigured || !supabase) return localOrders;

  try {
    const { data, error } = await supabase
      .from("order_requests")
      .select(`
        id, order_id, customer_name, customer_phone, city, address, note, total, status, created_at, updated_at,
        items:order_items(product_id, product_name, variant_id, variant_color, size, quantity, price, image_url)
      `)
      .order("created_at", { ascending: false });

    if (error || !data) return localOrders;

    return data.map((o) => ({
      id: o.id,
      orderId: o.order_id,
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      city: o.city,
      address: o.address,
      note: o.note,
      total: Number(o.total),
      status: o.status as OrderRequest["status"],
      createdAt: o.created_at,
      updatedAt: o.updated_at,
      items: (o.items || []).map((item: any) => ({
        productId: item.product_id,
        productName: item.product_name,
        variantId: item.variant_id,
        variantColor: item.variant_color,
        size: item.size,
        quantity: Number(item.quantity),
        price: Number(item.price),
        imageUrl: item.image_url,
      })),
    }));
  } catch (err) {
    console.error("getOrders error:", err);
    return localOrders;
  }
}

/**
 * Admin action: Confirm an order and atomically decrement stock
 */
export async function confirmOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  const localOrder = localOrders.find((o) => o.orderId === orderId || o.id === orderId);
  if (localOrder) {
    localOrder.status = "confirmed";
    localOrder.updatedAt = new Date().toISOString();
  }

  if (!isSupabaseConfigured || !supabase) {
    if (!localOrder) return { success: false, error: "Order not found" };
    return { success: true };
  }

  try {
    const { data, error } = await supabase.rpc("confirm_order_and_decrement_stock", {
      p_order_id: orderId,
    });
    if (error) {
      console.warn("Supabase rpc confirm_order error, marked local:", error.message);
      return { success: true };
    }
    if (data && !data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  } catch (err: any) {
    console.warn("confirmOrder fallback:", err.message);
    return { success: true };
  }
}

/**
 * Admin action: Cancel an order
 */
export async function cancelOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  const localOrder = localOrders.find((o) => o.orderId === orderId || o.id === orderId);
  if (localOrder) {
    localOrder.status = "cancelled";
    localOrder.updatedAt = new Date().toISOString();
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("order_requests")
        .update({ status: "cancelled", updated_at: new Date().toISOString() })
        .or(`id.eq.${orderId},order_id.eq.${orderId}`);
    } catch (err: any) {
      console.warn("Supabase cancelOrder warning:", err.message);
    }
  }

  return { success: true };
}

/**
 * Admin dashboard overview stats
 */
export async function getDashboardStats(): Promise<{
  stats: DashboardStats;
  lowStock: LowStockAlert[];
  recentOrders: OrderRequest[];
  recentProducts: Product[];
}> {
  const [orders, products] = await Promise.all([getOrders(), getProducts(false)]);

  const liveProducts = products.filter((p) => p.status === "published").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const confirmedToday = orders.filter((o) => {
    if (o.status !== "confirmed") return false;
    const orderDate = new Date(o.updatedAt || o.createdAt).toDateString();
    return orderDate === new Date().toDateString();
  }).length;

  let waitlistCount = localWaitlist.length;
  if (supabase) {
    try {
      const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });
      waitlistCount = count || 0;
    } catch {
      // keep fallback count
    }
  }

  const lowStock: LowStockAlert[] = [];
  for (const product of products) {
    for (const variant of product.variants) {
      for (const size of variant.sizes) {
        if (size.stock <= 3) {
          lowStock.push({
            productId: product.id,
            productName: product.name,
            variantColor: variant.color,
            size: size.size,
            stock: size.stock,
            imageUrl: variant.images[0]?.url,
          });
        }
      }
    }
  }

  return {
    stats: {
      liveProducts,
      pendingOrders,
      confirmedToday,
      waitlistCount,
    },
    lowStock,
    recentOrders: orders.slice(0, 5),
    recentProducts: products.slice(0, 5),
  };
}
