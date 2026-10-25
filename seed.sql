-- ==============================================================================
-- KAPDE — Complete Supabase Database Seed File
-- Total Products: 26
-- Includes all KAPDE Flagship Silhouettes & Aimé Leon Dore FW26/SS26 Catalog
-- ==============================================================================

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_001', 'Tailored Baggy Pleated Trouser', 'tailored-baggy-pleated-trouser', 'Cut from heavy 380 GSM worsted wool twill, this trouser represents the intersection of classical tailoring and contemporary volume. Features deep front double-pleats, cleanly concealed zip-fly with horn button closure, relaxed thigh tapering into a clean break over footwear. Made in limited batches in Ahmedabad.', 'pants', 3490, TRUE, 'published', '2026-10-01T10:00:00Z', '2026-10-15T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_001_blk', 'prod_001', 'Charcoal Black', '#181818', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_001_1', 'var_001_blk', '/images/pleated-trousers.jpg', 'KAPDE Tailored Baggy Pleated Trouser Full View', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_001_2', 'var_001_blk', '/images/ald-pleated-pant.jpg', 'KAPDE Tailored Baggy Pleated Trouser Editorial', 1) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_001', 'var_001_blk', '30', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_002', 'var_001_blk', '32', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_003', 'var_001_blk', '34', 2) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_004', 'var_001_blk', '36', 0) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_002', 'Wide Selvedge Denim', 'wide-selvedge-denim', 'Crafted from 14.5oz Japanese shuttle-loom selvedge denim in an unwashed raw state. Designed with a high-rise waist, voluminous straight leg, and authentic red-line ticker visible on the turn-up. Finished with custom matte black shank buttons and tonal stitching.', 'jeans', 3890, TRUE, 'published', '2026-10-02T10:00:00Z', '2026-10-16T14:30:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_002_raw', 'prod_002', 'Raw Indigo', '#1c2a44', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_002_1', 'var_002_raw', '/images/selvedge-denim.jpg', 'KAPDE Wide Selvedge Denim Editorial View', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_005', 'var_002_raw', '30', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_006', 'var_002_raw', '32', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_007', 'var_002_raw', '34', 3) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_008', 'var_002_raw', '36', 1) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_003', 'Boxy Heavyweight Cotton Tee', 'boxy-heavyweight-cotton-tee', 'Our signature tee engineered in 300 GSM combed ringspun cotton jersey. Structured silhouette with dropped shoulders, elongated sleeves, and a reinforced 1.2-inch collar rib that will never bacon. Garment dyed and enzyme-washed for supreme handfeel.', 'tees', 1690, TRUE, 'published', '2026-10-03T10:00:00Z', '2026-10-18T09:15:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_003_wht', 'prod_003', 'Chalk White', '#f4f4f4', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_003_1', 'var_003_wht', '/images/heavyweight-tee.jpg', 'KAPDE Boxy Heavyweight Cotton Tee Editorial View', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_009', 'var_003_wht', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_010', 'var_003_wht', 'M', 12) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_011', 'var_003_wht', 'L', 10) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_012', 'var_003_wht', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_004', 'Camp Collar Virgin Wool Overshirt', 'camp-collar-virgin-wool-overshirt', 'Midweight virgin wool flannel with a relaxed boxy cut, Cuban open collar, and dual oversized chest patch pockets. Natural horn button placket and square-cut hem. An effortless standalone shirt or outerwear layer.', 'shirts', 4290, FALSE, 'published', '2026-10-05T11:00:00Z', '2026-10-19T10:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_004_olv', 'prod_004', 'Olive Drab', '#3e4732', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_004_1', 'var_004_olv', '/images/pleated-trousers.jpg', 'KAPDE Camp Collar Overshirt', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_013', 'var_004_olv', 'M', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_014', 'var_004_olv', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_015', 'var_004_olv', 'XL', 2) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_005', 'Architectural Linen-Blend Co-ord Set', 'architectural-linen-blend-coord-set', 'A complete two-piece ensemble combining a relaxed unstructured kimono-style shirt jacket with matching double-pleated wide shorts. Cut from structured 55% French linen and 45% organic cotton.', 'coords', 6490, FALSE, 'published', '2026-10-07T14:00:00Z', '2026-10-19T13:40:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_005_san', 'prod_005', 'Desert Sand', '#d9d2c5', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_005_1', 'var_005_san', '/images/heavyweight-tee.jpg', 'KAPDE Linen-Blend Co-ord Set', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_016', 'var_005_san', 'M', 3) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_017', 'var_005_san', 'L', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_018', 'var_005_san', 'XL', 2) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_006', 'Classic Wool & Leather Varsity Jacket', 'classic-wool-leather-varsity-jacket', 'Heavyweight Melton wool body paired with buttery grain leather sleeves. Quilted viscose lining, tonal snap front placket, striped rib-knit trims, and archival embroidered KAPDE insignia.', 'shirts', 8990, TRUE, 'published', '2026-10-09T10:00:00Z', '2026-10-19T16:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_006_grn', 'prod_006', 'Forest Green', '#1f3829', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_006_1', 'var_006_grn', '/images/varsity-jacket.jpg', 'KAPDE Varsity Jacket', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_019', 'var_006_grn', 'S', 2) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_020', 'var_006_grn', 'M', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_021', 'var_006_grn', 'L', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_022', 'var_006_grn', 'XL', 1) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_007', 'Fair Isle Jacquard Sweater', 'fair-isle-jacquard-sweater', 'Crafted from a mid-weight woolen blend, this Fair Isle jacquard sweater features a traditional multi-color patterned weave with a soft, cozy drape. Offers a regular fit; true to size for a classic silhouette.', 'hoodies', 3490, TRUE, 'published', '2026-10-08T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_007_0', 'prod_007', 'Multi', '#5A2C3C', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_007_0_0', 'var_007_0', '/images/products/FW26KS000_TNFXALDJACQUARDSWEATER_FAIRISLE_1_600x.jpg', 'Fair Isle Jacquard Sweater front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_007_0_0', 'var_007_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_007_0_1', 'var_007_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_007_0_2', 'var_007_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_007_0_3', 'var_007_0', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_008', 'Novelty Crewneck Navy Blazer', 'novelty-crewneck-navy-blazer', 'A refined knit crewneck in a deep navy hue, featuring a subtle embroidered novelty graphic on the chest. Made from a breathable cotton-knit blend with a smooth texture and relaxed drape. Size up for an oversized look.', 'hoodies', 3290, FALSE, 'published', '2026-10-09T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_008_0', 'prod_008', 'Navy Blazer', '#121A2E', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_008_0_0', 'var_008_0', '/images/products/FW26KS001_NoveltyCrewneck_NAVYBLAZER_600x.jpg', 'Novelty Crewneck Navy Blazer front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_008_0_0', 'var_008_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_008_0_1', 'var_008_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_008_0_2', 'var_008_0', 'L', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_009', 'Novelty Crewneck Pristine', 'novelty-crewneck-pristine', 'Clean pristine white cotton-blend knit featuring a delicate embroidered chest graphic. Features a soft medium-weight weave and comfortable relaxed drape. True to size.', 'hoodies', 3290, FALSE, 'published', '2026-10-10T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_009_0', 'prod_009', 'Pristine', '#F3F3F0', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_009_0_0', 'var_009_0', '/images/products/FW26KS001_NoveltyCrewneck_PRISTINE_600x.jpg', 'Novelty Crewneck Pristine front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_009_0_0', 'var_009_0', 'S', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_009_0_1', 'var_009_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_009_0_2', 'var_009_0', 'L', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_010', 'Black Onyx Zip Turtleneck', 'black-onyx-zip-turtleneck', 'Structured ribbed zip-up turtleneck in a sleek black onyx shade. Heavyweight knit texture with a structured collar and tailored drape. Fits true to size.', 'hoodies', 3890, FALSE, 'published', '2026-10-11T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_010_0', 'prod_010', 'Black Onyx', '#161616', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_010_0_0', 'var_010_0', '/images/products/FW26KS009_BLACKONYX_2_600x.jpg', 'Black Onyx Zip Turtleneck front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_010_0_0', 'var_010_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_010_0_1', 'var_010_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_010_0_2', 'var_010_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_010_0_3', 'var_010_0', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_011', 'Pristine Ribbed Zip Turtleneck', 'pristine-ribbed-zip-turtleneck', 'Thick gauge ribbed knit zip turtleneck in a pristine off-white tone. Features an elevated texture, premium warmth, and structured drape. Standard fit.', 'hoodies', 3890, FALSE, 'published', '2026-10-12T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_011_0', 'prod_011', 'Pristine', '#F4F1EA', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_011_0_0', 'var_011_0', '/images/products/FW26KS009_PRISTINE_1_600x.jpg', 'Pristine Ribbed Zip Turtleneck front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_011_0_0', 'var_011_0', 'S', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_011_0_1', 'var_011_0', 'M', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_011_0_2', 'var_011_0', 'L', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_012', 'Equestrian Red Crewneck', 'equestrian-red-crewneck', 'Rich equestrian red cotton crewneck featuring a contrast cream ribbed collar and minimal chest branding. Mid-weight fleece-backed loopback jersey with a comfortable drape.', 'hoodies', 2990, FALSE, 'published', '2026-10-13T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_012_0', 'prod_012', 'Equestrian Red', '#A31D24', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_012_0_0', 'var_012_0', '/images/products/FW26KS010_EquestrianRed_1_600x.jpg', 'Equestrian Red Crewneck front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_012_0_0', 'var_012_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_012_0_1', 'var_012_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_012_0_2', 'var_012_0', 'L', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_012_0_3', 'var_012_0', 'XL', 3) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_013', 'Jet Black Contrast Collar Crewneck', 'jet-black-contrast-collar-crewneck', 'Deep jet black heavy crewneck featuring a contrast oatmeal ribbed neckline and embroidered chest text. Soft cotton blend with a plush handfeel and clean drape.', 'hoodies', 2990, FALSE, 'published', '2026-10-14T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_013_0', 'prod_013', 'Jet Black', '#1C1C1C', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_013_0_0', 'var_013_0', '/images/products/FW26KS010_JETBLACK_1_600x.jpg', 'Jet Black Contrast Collar Crewneck front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_013_0_0', 'var_013_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_013_0_1', 'var_013_0', 'M', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_013_0_2', 'var_013_0', 'L', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_013_0_3', 'var_013_0', 'XL', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_014', 'Multi Striped Half-Zip Polo', 'multi-striped-half-zip-polo', 'Vintage-inspired horizontal multi-stripe patterned knit with a quarter-zip collar. Soft knit cotton fabric offering a relaxed, retro drape.', 'hoodies', 3490, TRUE, 'published', '2026-10-15T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_014_0', 'prod_014', 'Multi Stripe', '#4A3B32', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_014_0_0', 'var_014_0', '/images/products/FW26KS012_MULTI_1_600x.jpg', 'Multi Striped Half-Zip Polo front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_014_0_0', 'var_014_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_014_0_1', 'var_014_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_014_0_2', 'var_014_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_014_0_3', 'var_014_0', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_015', 'Jet Black Knit Hoodie', 'jet-black-knit-hoodie', 'Cozy minimal hooded sweatshirt in solid jet black. Crafted from a heavy fleece-lined cotton blend with a structured hood and relaxed drape.', 'hoodies', 3590, FALSE, 'published', '2026-10-16T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_015_0', 'prod_015', 'Jet Black', '#181818', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_015_0_0', 'var_015_0', '/images/products/FW26KS019_JETBLACK_1_600x.jpg', 'Jet Black Knit Hoodie front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_015_0_0', 'var_015_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_015_0_1', 'var_015_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_015_0_2', 'var_015_0', 'L', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_015_0_3', 'var_015_0', 'XL', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_016', 'Oatmeal Melange Knit Hoodie', 'oatmeal-melange-knit-hoodie', 'Relaxed-fit hooded sweatshirt in an oatmeal melange shade. Heavyweight cotton fleece with a soft brushed interior and comfortable slouchy drape.', 'hoodies', 3590, FALSE, 'published', '2026-10-17T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_016_0', 'prod_016', 'Oatmeal Melange', '#D6D0C5', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_016_0_0', 'var_016_0', '/images/products/FW26KS019_OATMEALMELANGE_1_600x.jpg', 'Oatmeal Melange Knit Hoodie front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_016_0_0', 'var_016_0', 'S', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_016_0_1', 'var_016_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_016_0_2', 'var_016_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_016_0_3', 'var_016_0', 'XL', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_017', 'Coffee Bean Geometric Pattern Sweater', 'coffee-bean-geometric-pattern-sweater', 'Rich coffee bean brown sweater featuring an intricate all-over geometric pattern weave. Soft textured yarn with a cozy, substantial feel and standard fit.', 'hoodies', 3690, FALSE, 'published', '2026-10-18T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_017_0', 'prod_017', 'Coffee Bean', '#3D261D', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_017_0_0', 'var_017_0', '/images/products/FW26KS024_COFFEEBEAN_1_600x.jpg', 'Coffee Bean Geometric Pattern Sweater front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_017_0_0', 'var_017_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_017_0_1', 'var_017_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_017_0_2', 'var_017_0', 'L', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_018', 'Pristine Geometric Pattern Sweater', 'pristine-geometric-pattern-sweater', 'Off-white pristine base sweater detailed with a striking contrast geometric grid pattern. Soft knit fabric composition offering warmth and an effortless drape.', 'hoodies', 3690, FALSE, 'published', '2026-10-19T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_018_0', 'prod_018', 'Pristine', '#EAE5DC', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_018_0_0', 'var_018_0', '/images/products/FW26KS024_PRISTINE_2_600x.jpg', 'Pristine Geometric Pattern Sweater front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_018_0_0', 'var_018_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_018_0_1', 'var_018_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_018_0_2', 'var_018_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_019', 'Blue Half-Zip Knit Pullover', 'blue-half-zip-knit-pullover', 'Vibrant blue half-zip sweater crafted from a tightly woven smooth cotton yarn. Features a polished collar, metal zip pull, and structured straight drape.', 'hoodies', 3490, FALSE, 'published', '2026-10-20T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_019_0', 'prod_019', 'Blue', '#154A8C', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_019_0_0', 'var_019_0', '/images/products/FW26WJ007_BLUE_6_600x.jpg', 'Blue Half-Zip Knit Pullover front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_019_0_0', 'var_019_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_019_0_1', 'var_019_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_019_0_2', 'var_019_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_019_0_3', 'var_019_0', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_020', 'Jet Black Half-Zip Knit Pullover', 'jet-black-half-zip-knit-pullover', 'Sleek jet black half-zip pullover made with a fine knit gauge for a clean, sophisticated look. Offers a comfortable regular fit and smooth drape.', 'hoodies', 3490, FALSE, 'published', '2026-10-21T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_020_0', 'prod_020', 'Jet Black', '#1A1A1A', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_020_0_0', 'var_020_0', '/images/products/FW26WJ007_JETBLACK_6_600x.jpg', 'Jet Black Half-Zip Knit Pullover front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_020_0_0', 'var_020_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_020_0_1', 'var_020_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_020_0_2', 'var_020_0', 'L', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_020_0_3', 'var_020_0', 'XL', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_021', 'Biker Vest Black Onyx', 'biker-vest-black-onyx', 'Heavy-duty utility biker vest in black onyx featuring a cozy faux-shearling lining and clean zippered front closure. Layering essential with a structured boxy cut.', 'shirts', 4290, FALSE, 'published', '2026-10-22T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_021_0', 'prod_021', 'Black Onyx', '#242220', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_021_0_0', 'var_021_0', '/images/products/FW26WJ027_BikerVest_BlackOnyx_1_600x.jpg', 'Biker Vest Black Onyx front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_021_0_0', 'var_021_0', 'S', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_021_0_1', 'var_021_0', 'M', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_021_0_2', 'var_021_0', 'L', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_021_0_3', 'var_021_0', 'XL', 3) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_022', 'Lined Mechanic Jacket Coffee Bean', 'lined-mechanic-jacket-coffee-bean', 'Classic workwear-inspired mechanic jacket in a deep coffee bean brown. Durable heavy cotton canvas exterior with an insulated inner lining and clean collar detail.', 'shirts', 4590, TRUE, 'published', '2026-10-23T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_022_0', 'prod_022', 'Coffee Bean', '#4A3226', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_022_0_0', 'var_022_0', '/images/products/FW26WJ032_LinedMechanicJacket_CoffeeBean_1_600x.jpg', 'Lined Mechanic Jacket Coffee Bean front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_022_0_1', 'var_022_0', '/images/products/FW26WJ032_LinedMechanicJacket_CoffeeBean_2_600x.jpg', 'Lined Mechanic Jacket Coffee Bean reverse angle', 1) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_022_0_0', 'var_022_0', 'S', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_022_0_1', 'var_022_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_022_0_2', 'var_022_0', 'L', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_022_0_3', 'var_022_0', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_023', 'Cord Trousers Coffee Bean', 'cord-trousers-coffee-bean', 'Wide-wale cotton corduroy trousers in a rich coffee bean brown shade. Features a mid-weight textured weave, straight-leg cut, and relaxed drape. True to size waist sizing.', 'pants', 3290, FALSE, 'published', '2026-10-24T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_023_0', 'prod_023', 'Coffee Bean', '#3D281F', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_023_0_0', 'var_023_0', '/images/products/FW26WP015_CordTrousers_CoffeeBean_1_600x.jpg', 'Cord Trousers Coffee Bean front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_023_0_1', 'var_023_0', '/images/products/FW26WP015_CordTrousers_CoffeeBean_2_600x.jpg', 'Cord Trousers Coffee Bean detail angle', 1) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_023_0_0', 'var_023_0', '30', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_023_0_1', 'var_023_0', '32', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_023_0_2', 'var_023_0', '34', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_023_0_3', 'var_023_0', '36', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_024', 'Cord Trousers Jet Black', 'cord-trousers-jet-black', 'Classic straight-leg corduroy pants in deep jet black. Crafted from a durable cotton corduroy fabric with a soft handfeel and structured drape. Standard waist fit.', 'pants', 3290, FALSE, 'published', '2026-10-25T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_024_0', 'prod_024', 'Jet Black', '#1A1A1A', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_024_0_0', 'var_024_0', '/images/products/FW26WP015_CordTrousers_JetBlack_1_600x.jpg', 'Cord Trousers Jet Black front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_024_0_0', 'var_024_0', '30', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_024_0_1', 'var_024_0', '32', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_024_0_2', 'var_024_0', '34', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_024_0_3', 'var_024_0', '36', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_025', 'Nylon Track Pant Jet Black', 'nylon-track-pant-jet-black', 'Lightweight technical nylon track trousers in jet black. Features a breathable weave, relaxed sporty drape, and comfortable elasticated waistband.', 'pants', 2890, FALSE, 'published', '2026-10-01T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_025_0', 'prod_025', 'Jet Black', '#171717', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_025_0_0', 'var_025_0', '/images/products/SS26WP040_NYLONTRACKPANT_JETBLACK_1_600x.jpg', 'Nylon Track Pant Jet Black front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_025_0_0', 'var_025_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_025_0_1', 'var_025_0', 'M', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_025_0_2', 'var_025_0', 'L', 6) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_025_0_3', 'var_025_0', 'XL', 4) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES ('prod_026', 'Nylon Track Pant Navy Blazer', 'nylon-track-pant-navy-blazer', 'Performance-ready nylon track pants in navy blazer blue. Crisp, lightweight fabric with an effortless casual drape and secure elastic waist.', 'pants', 2890, FALSE, 'published', '2026-10-02T10:00:00Z', '2026-10-20T12:00:00Z') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES ('var_026_0', 'prod_026', 'Navy Blazer', '#1C2536', 0) ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;

INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES ('img_026_0_0', 'var_026_0', '/images/products/SS26WP040_NYLONTRACKPANT_NAVYBLAZER_1_600x.jpg', 'Nylon Track Pant Navy Blazer front view', 0) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_026_0_0', 'var_026_0', 'S', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_026_0_1', 'var_026_0', 'M', 7) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_026_0_2', 'var_026_0', 'L', 8) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO product_sizes (id, variant_id, size, stock) VALUES ('sz_026_0_3', 'var_026_0', 'XL', 5) ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;
