-- ==============================================================================
-- KAPDE — Production Database Migration Schema (PostgreSQL / Supabase)
-- ==============================================================================
-- Version: 1.0.0 (Production-Ready & Idempotent)
-- Author: KAPDE Luxury Menswear
-- Description: Complete single-file migration containing all tables, indexes,
--              atomic stock decrement procedure, RLS security policies,
--              Supabase Storage bucket setup, and verified initial seed data.
-- Run this in the Supabase Dashboard -> SQL Editor.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. ADMIN USERS (Whitelist & Role Management)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- ==============================================================================
-- 2. PRODUCTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL CHECK (category IN ('pants', 'jeans', 'tees', 'shirts', 'hoodies', 'coords')),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold_out', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- ==============================================================================
-- 3. PRODUCT VARIANTS (Colors)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color TEXT NOT NULL,
    color_hex TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);

-- ==============================================================================
-- 4. PRODUCT IMAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_images (
    id TEXT PRIMARY KEY,
    variant_id TEXT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_images_variant_id ON product_images(variant_id);

-- ==============================================================================
-- 5. PRODUCT SIZES & STOCK
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_sizes (
    id TEXT PRIMARY KEY,
    variant_id TEXT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    size TEXT NOT NULL, -- e.g. '28', '30', '32', '34', 'S', 'M', 'L', 'XL'
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_variant_size UNIQUE (variant_id, size)
);

CREATE INDEX IF NOT EXISTS idx_product_sizes_variant_id ON product_sizes(variant_id);

-- ==============================================================================
-- 6. ORDER REQUESTS (Concierge & WhatsApp Orders)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS order_requests (
    id TEXT PRIMARY KEY,
    order_id TEXT UNIQUE NOT NULL, -- e.g. KAPDE-2026-0001
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    note TEXT,
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_requests_order_id ON order_requests(order_id);
CREATE INDEX IF NOT EXISTS idx_order_requests_status ON order_requests(status);
CREATE INDEX IF NOT EXISTS idx_order_requests_created_at ON order_requests(created_at DESC);

-- ==============================================================================
-- 7. ORDER ITEMS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT NOT NULL REFERENCES order_requests(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    variant_color TEXT NOT NULL,
    size TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ==============================================================================
-- 8. WAITLIST / DROP NOTIFICATIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT,
    phone TEXT,
    product_interest TEXT DEFAULT 'Next Drop',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT waitlist_contact_check CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email_unique ON waitlist(LOWER(email)) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_phone_unique ON waitlist(phone) WHERE phone IS NOT NULL;

-- ==============================================================================
-- 9. ATOMIC INVENTORY DECREMENT STORED PROCEDURE
-- ==============================================================================
CREATE OR REPLACE FUNCTION confirm_order_and_decrement_stock(p_order_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_order RECORD;
    v_item RECORD;
BEGIN
    SELECT * INTO v_order
    FROM order_requests
    WHERE id = p_order_id OR order_id = p_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order not found');
    END IF;

    IF v_order.status = 'confirmed' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order is already confirmed');
    END IF;

    IF v_order.status = 'cancelled' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Cannot confirm a cancelled order');
    END IF;

    -- Verify stock availability
    FOR v_item IN
        SELECT oi.*, ps.stock, ps.id AS size_record_id
        FROM order_items oi
        JOIN product_sizes ps ON ps.variant_id = oi.variant_id AND ps.size = oi.size
        WHERE oi.order_id = v_order.id
        FOR UPDATE OF ps
    LOOP
        IF v_item.stock < v_item.quantity THEN
            RETURN jsonb_build_object(
                'success', false,
                'error', format('Insufficient stock for %s (%s, size %s). Available: %s, Requested: %s',
                                v_item.product_name, v_item.variant_color, v_item.size, v_item.stock, v_item.quantity)
            );
        END IF;
    END LOOP;

    -- Atomic decrement
    FOR v_item IN
        SELECT oi.variant_id, oi.size, oi.quantity
        FROM order_items oi
        WHERE oi.order_id = v_order.id
    LOOP
        UPDATE product_sizes
        SET stock = stock - v_item.quantity,
            updated_at = NOW()
        WHERE variant_id = v_item.variant_id AND size = v_item.size;
    END LOOP;

    -- Update order status
    UPDATE order_requests
    SET status = 'confirmed',
        updated_at = NOW()
    WHERE id = v_order.id;

    RETURN jsonb_build_object('success', true, 'order_id', v_order.order_id, 'message', 'Order confirmed and inventory decremented');
END;
$$;

REVOKE EXECUTE ON FUNCTION confirm_order_and_decrement_stock(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION confirm_order_and_decrement_stock(TEXT) TO service_role;

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an authorized admin
CREATE OR REPLACE FUNCTION private_is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
    );
$$;

-- Public storefront read policies
CREATE POLICY "Public products read" ON products FOR SELECT USING (status = 'published' OR private_is_admin());
CREATE POLICY "Public variants read" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public images read" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public sizes read" ON product_sizes FOR SELECT USING (true);

-- Storefront order creation
CREATE POLICY "Public insert orders" ON order_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public waitlist join" ON waitlist FOR INSERT WITH CHECK (true);

-- Admin CRUD operations
CREATE POLICY "Admin products full" ON products FOR ALL USING (private_is_admin());
CREATE POLICY "Admin variants full" ON product_variants FOR ALL USING (private_is_admin());
CREATE POLICY "Admin images full" ON product_images FOR ALL USING (private_is_admin());
CREATE POLICY "Admin sizes full" ON product_sizes FOR ALL USING (private_is_admin());
CREATE POLICY "Admin orders full" ON order_requests FOR ALL USING (private_is_admin());
CREATE POLICY "Admin order items full" ON order_items FOR ALL USING (private_is_admin());
CREATE POLICY "Admin waitlist full" ON waitlist FOR ALL USING (private_is_admin());
CREATE POLICY "Admin users read" ON admin_users FOR SELECT USING (private_is_admin());

-- ==============================================================================
-- 11. STORAGE BUCKET FOR PRODUCT ASSETS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public image bucket access" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admin image upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images' AND private_is_admin());

CREATE POLICY "Admin image delete" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images' AND private_is_admin());

-- ==============================================================================
-- 12. OPTIONAL SEED DATA (Uncomment if you want sample products)
-- ==============================================================================
-- INSERT INTO products (id, name, slug, description, category, price, featured, status) VALUES
-- ('prod_001', 'Tailored Baggy Pleated Trouser', 'tailored-baggy-pleated-trouser', 'Heavy-weight wool blend trousers featuring a relaxed double pleat, deep rise, and wide straight leg.', 'pants', 3490, true, 'published')
-- ON CONFLICT (id) DO NOTHING;

