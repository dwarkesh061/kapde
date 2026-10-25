import json
import os

data_raw = open('Refrence_website/Data.md', 'r', encoding='utf-8').read()
ald_items = json.loads(data_raw)

flagship_items = [
    {
        'id': 'prod_001',
        'name': 'Tailored Baggy Pleated Trouser',
        'slug': 'tailored-baggy-pleated-trouser',
        'description': 'Cut from heavy 380 GSM worsted wool twill, this trouser represents the intersection of classical tailoring and contemporary volume. Features deep front double-pleats, cleanly concealed zip-fly with horn button closure, relaxed thigh tapering into a clean break over footwear. Made in limited batches in Ahmedabad.',
        'category': 'pants',
        'price': 3490,
        'featured': True,
        'status': 'published',
        'createdAt': '2026-10-01T10:00:00Z',
        'updatedAt': '2026-10-15T12:00:00Z',
        'variants': [{
            'id': 'var_001_blk',
            'productId': 'prod_001',
            'color': 'Charcoal Black',
            'colorHex': '#181818',
            'images': [
                {'id': 'img_001_1', 'url': '/images/pleated-trousers.jpg', 'alt': 'KAPDE Tailored Baggy Pleated Trouser Full View', 'sortOrder': 0},
                {'id': 'img_001_2', 'url': '/images/ald-pleated-pant.jpg', 'alt': 'KAPDE Tailored Baggy Pleated Trouser Editorial', 'sortOrder': 1}
            ],
            'sizes': [
                {'id': 'sz_001', 'size': '30', 'stock': 4},
                {'id': 'sz_002', 'size': '32', 'stock': 6},
                {'id': 'sz_003', 'size': '34', 'stock': 2},
                {'id': 'sz_004', 'size': '36', 'stock': 0}
            ]
        }]
    },
    {
        'id': 'prod_002',
        'name': 'Wide Selvedge Denim',
        'slug': 'wide-selvedge-denim',
        'description': 'Crafted from 14.5oz Japanese shuttle-loom selvedge denim in an unwashed raw state. Designed with a high-rise waist, voluminous straight leg, and authentic red-line ticker visible on the turn-up. Finished with custom matte black shank buttons and tonal stitching.',
        'category': 'jeans',
        'price': 3890,
        'featured': True,
        'status': 'published',
        'createdAt': '2026-10-02T10:00:00Z',
        'updatedAt': '2026-10-16T14:30:00Z',
        'variants': [{
            'id': 'var_002_raw',
            'productId': 'prod_002',
            'color': 'Raw Indigo',
            'colorHex': '#1c2a44',
            'images': [
                {'id': 'img_002_1', 'url': '/images/selvedge-denim.jpg', 'alt': 'KAPDE Wide Selvedge Denim Editorial View', 'sortOrder': 0}
            ],
            'sizes': [
                {'id': 'sz_005', 'size': '30', 'stock': 5},
                {'id': 'sz_006', 'size': '32', 'stock': 8},
                {'id': 'sz_007', 'size': '34', 'stock': 3},
                {'id': 'sz_008', 'size': '36', 'stock': 1}
            ]
        }]
    },
    {
        'id': 'prod_003',
        'name': 'Boxy Heavyweight Cotton Tee',
        'slug': 'boxy-heavyweight-cotton-tee',
        'description': 'Our signature tee engineered in 300 GSM combed ringspun cotton jersey. Structured silhouette with dropped shoulders, elongated sleeves, and a reinforced 1.2-inch collar rib that will never bacon. Garment dyed and enzyme-washed for supreme handfeel.',
        'category': 'tees',
        'price': 1690,
        'featured': True,
        'status': 'published',
        'createdAt': '2026-10-03T10:00:00Z',
        'updatedAt': '2026-10-18T09:15:00Z',
        'variants': [{
            'id': 'var_003_wht',
            'productId': 'prod_003',
            'color': 'Chalk White',
            'colorHex': '#f4f4f4',
            'images': [
                {'id': 'img_003_1', 'url': '/images/heavyweight-tee.jpg', 'alt': 'KAPDE Boxy Heavyweight Cotton Tee Editorial View', 'sortOrder': 0}
            ],
            'sizes': [
                {'id': 'sz_009', 'size': 'S', 'stock': 5},
                {'id': 'sz_010', 'size': 'M', 'stock': 12},
                {'id': 'sz_011', 'size': 'L', 'stock': 10},
                {'id': 'sz_012', 'size': 'XL', 'stock': 4}
            ]
        }]
    },
    {
        'id': 'prod_004',
        'name': 'Camp Collar Virgin Wool Overshirt',
        'slug': 'camp-collar-virgin-wool-overshirt',
        'description': 'Midweight virgin wool flannel with a relaxed boxy cut, Cuban open collar, and dual oversized chest patch pockets. Natural horn button placket and square-cut hem. An effortless standalone shirt or outerwear layer.',
        'category': 'shirts',
        'price': 4290,
        'featured': False,
        'status': 'published',
        'createdAt': '2026-10-05T11:00:00Z',
        'updatedAt': '2026-10-19T10:00:00Z',
        'variants': [{
            'id': 'var_004_olv',
            'productId': 'prod_004',
            'color': 'Olive Drab',
            'colorHex': '#3e4732',
            'images': [
                {'id': 'img_004_1', 'url': '/images/pleated-trousers.jpg', 'alt': 'KAPDE Camp Collar Overshirt', 'sortOrder': 0}
            ],
            'sizes': [
                {'id': 'sz_013', 'size': 'M', 'stock': 4},
                {'id': 'sz_014', 'size': 'L', 'stock': 6},
                {'id': 'sz_015', 'size': 'XL', 'stock': 2}
            ]
        }]
    },
    {
        'id': 'prod_005',
        'name': 'Architectural Linen-Blend Co-ord Set',
        'slug': 'architectural-linen-blend-coord-set',
        'description': 'A complete two-piece ensemble combining a relaxed unstructured kimono-style shirt jacket with matching double-pleated wide shorts. Cut from structured 55% French linen and 45% organic cotton.',
        'category': 'coords',
        'price': 6490,
        'featured': False,
        'status': 'published',
        'createdAt': '2026-10-07T14:00:00Z',
        'updatedAt': '2026-10-19T13:40:00Z',
        'variants': [{
            'id': 'var_005_san',
            'productId': 'prod_005',
            'color': 'Desert Sand',
            'colorHex': '#d9d2c5',
            'images': [
                {'id': 'img_005_1', 'url': '/images/heavyweight-tee.jpg', 'alt': 'KAPDE Linen-Blend Co-ord Set', 'sortOrder': 0}
            ],
            'sizes': [
                {'id': 'sz_016', 'size': 'M', 'stock': 3},
                {'id': 'sz_017', 'size': 'L', 'stock': 5},
                {'id': 'sz_018', 'size': 'XL', 'stock': 2}
            ]
        }]
    },
    {
        'id': 'prod_006',
        'name': 'Classic Wool & Leather Varsity Jacket',
        'slug': 'classic-wool-leather-varsity-jacket',
        'description': 'Heavyweight Melton wool body paired with buttery grain leather sleeves. Quilted viscose lining, tonal snap front placket, striped rib-knit trims, and archival embroidered KAPDE insignia.',
        'category': 'shirts',
        'price': 8990,
        'featured': True,
        'status': 'published',
        'createdAt': '2026-10-09T10:00:00Z',
        'updatedAt': '2026-10-19T16:00:00Z',
        'variants': [{
            'id': 'var_006_grn',
            'productId': 'prod_006',
            'color': 'Forest Green',
            'colorHex': '#1f3829',
            'images': [
                {'id': 'img_006_1', 'url': '/images/varsity-jacket.jpg', 'alt': 'KAPDE Varsity Jacket', 'sortOrder': 0}
            ],
            'sizes': [
                {'id': 'sz_019', 'size': 'S', 'stock': 2},
                {'id': 'sz_020', 'size': 'M', 'stock': 5},
                {'id': 'sz_021', 'size': 'L', 'stock': 4},
                {'id': 'sz_022', 'size': 'XL', 'stock': 1}
            ]
        }]
    }
]

all_products = list(flagship_items)
base_idx = len(flagship_items) + 1

for idx, p in enumerate(ald_items, start=base_idx):
    prod_id = f'prod_{idx:03d}'
    name = p['name']
    cat = p.get('category', 'hoodies')
    if 'Jacket' in name or 'Vest' in name:
        cat = 'shirts'
    
    variants = []
    for v_idx, v in enumerate(p.get('variants', [])):
        var_id = f'var_{idx:03d}_{v_idx}'
        img_list = []
        for i_idx, img in enumerate(v.get('images', [])):
            url_stem = img['url']
            url = f'/images/products/{url_stem}.jpg'
            img_list.append({
                'id': f'img_{idx:03d}_{v_idx}_{i_idx}',
                'url': url,
                'alt': img.get('alt', f'{name} front view'),
                'sortOrder': i_idx
            })
        
        # Check secondary images
        image_urls = [i['url'] for i in v.get('images', [])]
        if 'FW26WJ032_LinedMechanicJacket_CoffeeBean_1_600x' in image_urls:
            img_list.append({
                'id': f'img_{idx:03d}_{v_idx}_1',
                'url': '/images/products/FW26WJ032_LinedMechanicJacket_CoffeeBean_2_600x.jpg',
                'alt': f'{name} reverse angle',
                'sortOrder': 1
            })
        if 'FW26WP015_CordTrousers_CoffeeBean_1_600x' in image_urls:
            img_list.append({
                'id': f'img_{idx:03d}_{v_idx}_1',
                'url': '/images/products/FW26WP015_CordTrousers_CoffeeBean_2_600x.jpg',
                'alt': f'{name} detail angle',
                'sortOrder': 1
            })

        size_list = []
        for s_idx, sz in enumerate(v.get('sizes', [])):
            size_list.append({
                'id': f'sz_{idx:03d}_{v_idx}_{s_idx}',
                'size': sz['size'],
                'stock': sz['stock']
            })
            
        variants.append({
            'id': var_id,
            'productId': prod_id,
            'color': v.get('color', 'Standard'),
            'colorHex': v.get('colorHex', '#181818'),
            'images': img_list,
            'sizes': size_list
        })
        
    all_products.append({
        'id': prod_id,
        'name': name,
        'slug': p['slug'],
        'description': p['description'],
        'category': cat,
        'price': p['price'],
        'featured': p.get('featured', False),
        'status': 'published',
        'createdAt': f'2026-10-{(idx % 25) + 1:02d}T10:00:00Z',
        'updatedAt': '2026-10-20T12:00:00Z',
        'variants': variants
    })

# Format TypeScript output
mock_ts_content = """// ==============================================================================
// KAPDE — High-Fashion Menswear Mock / Seed Dataset
// Fallback & Local Development Engine
// Auto-generated with Complete Aimé Leon Dore FW26/SS26 & KAPDE Flagship Catalog
// ==============================================================================

import { Product, OrderRequest, WaitlistEntry } from "@/lib/types";

export const MOCK_PRODUCTS: Product[] = """ + json.dumps(all_products, indent=2) + """;

export const MOCK_ORDERS: OrderRequest[] = [
  {
    id: "ord_001",
    orderId: "KAPDE-2026-0001",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98201 12345",
    city: "Mumbai",
    address: "Bandra West, 14th Road, Flat 4B",
    note: "Please deliver before 5 PM",
    total: 3490,
    status: "confirmed",
    createdAt: "2026-10-18T14:20:00Z",
    updatedAt: "2026-10-18T15:10:00Z",
    items: [
      {
        productId: "prod_001",
        productName: "Tailored Baggy Pleated Trouser",
        variantId: "var_001_blk",
        variantColor: "Charcoal Black",
        size: "32",
        quantity: 1,
        price: 3490,
        imageUrl: "/images/pleated-trousers.jpg",
      },
    ],
  },
  {
    id: "ord_002",
    orderId: "KAPDE-2026-0002",
    customerName: "Kabir Malhotra",
    customerPhone: "+91 98110 54321",
    city: "New Delhi",
    address: "Vasant Vihar, Block C-3",
    note: "Call on arrival",
    total: 5580,
    status: "pending",
    createdAt: "2026-10-19T09:12:00Z",
    updatedAt: "2026-10-19T09:12:00Z",
    items: [
      {
        productId: "prod_002",
        productName: "Wide Selvedge Denim",
        variantId: "var_002_raw",
        variantColor: "Raw Indigo",
        size: "32",
        quantity: 1,
        price: 3890,
        imageUrl: "/images/selvedge-denim.jpg",
      },
      {
        productId: "prod_003",
        productName: "Boxy Heavyweight Cotton Tee",
        variantId: "var_003_wht",
        variantColor: "Chalk White",
        size: "L",
        quantity: 1,
        price: 1690,
        imageUrl: "/images/heavyweight-tee.jpg",
      },
    ],
  },
  {
    id: "ord_003",
    orderId: "KAPDE-2026-0003",
    customerName: "Rohan Varma",
    customerPhone: "+91 97400 98765",
    city: "Bengaluru",
    address: "Indiranagar, 12th Main Road",
    total: 3990,
    status: "pending",
    createdAt: "2026-10-20T11:45:00Z",
    updatedAt: "2026-10-20T11:45:00Z",
    items: [
      {
        productId: "prod_007",
        productName: "Fair Isle Jacquard Sweater",
        variantId: "var_007_0",
        variantColor: "Multi",
        size: "M",
        quantity: 1,
        price: 3490,
        imageUrl: "/images/products/FW26KS000_TNFXALDJACQUARDSWEATER_FAIRISLE_1_600x.jpg",
      },
    ],
  },
];

export const MOCK_WAITLIST: WaitlistEntry[] = [
  {
    id: "wl_001",
    email: "rohan.varma@gmail.com",
    phone: "+91 98200 99999",
    productInterest: "Next Drop — Drop 02",
    createdAt: "2026-10-17T08:00:00Z",
  },
  {
    id: "wl_002",
    email: "priya.mehta@outlook.com",
    phone: "+91 98111 22233",
    productInterest: "Wide Selvedge Denim",
    createdAt: "2026-10-18T10:15:00Z",
  },
  {
    id: "wl_003",
    email: "sid.chopra@gmail.com",
    productInterest: "Co-ord Sets",
    createdAt: "2026-10-19T14:40:00Z",
  },
];

export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `KAPDE-${year}-${randomNum}`;
}
"""

with open('lib/data/mock.ts', 'w', encoding='utf-8') as f:
    f.write(mock_ts_content)

print(f"Successfully generated lib/data/mock.ts with {len(all_products)} products!")

# Generate SQL Seed Script
sql_statements = [
    "-- ==============================================================================",
    "-- KAPDE — Complete Supabase Database Seed File",
    f"-- Total Products: {len(all_products)}",
    "-- Includes all KAPDE Flagship Silhouettes & Aimé Leon Dore FW26/SS26 Catalog",
    "-- ==============================================================================\n"
]

for p in all_products:
    desc = p['description'].replace("'", "''")
    p_name = p['name'].replace("'", "''")
    sql_statements.append(
        f"INSERT INTO products (id, name, slug, description, category, price, featured, status, created_at, updated_at) VALUES "
        f"('{p['id']}', '{p_name}', '{p['slug']}', '{desc}', '{p['category']}', {p['price']}, {'TRUE' if p['featured'] else 'FALSE'}, '{p['status']}', '{p['createdAt']}', '{p['updatedAt']}') "
        f"ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;\n"
    )
    for v in p['variants']:
        v_color = v['color'].replace("'", "''")
        sql_statements.append(
            f"INSERT INTO product_variants (id, product_id, color, color_hex, sort_order) VALUES "
            f"('{v['id']}', '{p['id']}', '{v_color}', '{v['colorHex']}', 0) "
            f"ON CONFLICT (id) DO UPDATE SET color = EXCLUDED.color, color_hex = EXCLUDED.color_hex;\n"
        )
        for img in v['images']:
            alt = img['alt'].replace("'", "''")
            sql_statements.append(
                f"INSERT INTO product_images (id, variant_id, url, alt, sort_order) VALUES "
                f"('{img['id']}', '{v['id']}', '{img['url']}', '{alt}', {img['sortOrder']}) "
                f"ON CONFLICT (id) DO NOTHING;\n"
            )
        for sz in v['sizes']:
            sql_statements.append(
                f"INSERT INTO product_sizes (id, variant_id, size, stock) VALUES "
                f"('{sz['id']}', '{v['id']}', '{sz['size']}', {sz['stock']}) "
                f"ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;\n"
            )

with open('seed.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_statements))

print("Successfully generated seed.sql with full relational tables data!")
