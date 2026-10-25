// ==============================================================================
// KAPDE — High-Fashion Menswear Mock / Seed Dataset
// Fallback & Local Development Engine
// Auto-generated with Complete Aimé Leon Dore FW26/SS26 & KAPDE Flagship Catalog
// ==============================================================================

import { Product, OrderRequest, WaitlistEntry } from "@/lib/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    "id": "prod_001",
    "name": "Tailored Baggy Pleated Trouser",
    "slug": "tailored-baggy-pleated-trouser",
    "description": "Cut from heavy 380 GSM worsted wool twill, this trouser represents the intersection of classical tailoring and contemporary volume. Features deep front double-pleats, cleanly concealed zip-fly with horn button closure, relaxed thigh tapering into a clean break over footwear. Made in limited batches in Ahmedabad.",
    "category": "pants",
    "price": 3490,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-01T10:00:00Z",
    "updatedAt": "2026-10-15T12:00:00Z",
    "variants": [
      {
        "id": "var_001_blk",
        "productId": "prod_001",
        "color": "Charcoal Black",
        "colorHex": "#181818",
        "images": [
          {
            "id": "img_001_1",
            "url": "/images/pleated-trousers.jpg",
            "alt": "KAPDE Tailored Baggy Pleated Trouser Full View",
            "sortOrder": 0
          },
          {
            "id": "img_001_2",
            "url": "/images/ald-pleated-pant.jpg",
            "alt": "KAPDE Tailored Baggy Pleated Trouser Editorial",
            "sortOrder": 1
          }
        ],
        "sizes": [
          {
            "id": "sz_001",
            "size": "30",
            "stock": 4
          },
          {
            "id": "sz_002",
            "size": "32",
            "stock": 6
          },
          {
            "id": "sz_003",
            "size": "34",
            "stock": 2
          },
          {
            "id": "sz_004",
            "size": "36",
            "stock": 0
          }
        ]
      }
    ]
  },
  {
    "id": "prod_002",
    "name": "Wide Selvedge Denim",
    "slug": "wide-selvedge-denim",
    "description": "Crafted from 14.5oz Japanese shuttle-loom selvedge denim in an unwashed raw state. Designed with a high-rise waist, voluminous straight leg, and authentic red-line ticker visible on the turn-up. Finished with custom matte black shank buttons and tonal stitching.",
    "category": "jeans",
    "price": 3890,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-02T10:00:00Z",
    "updatedAt": "2026-10-16T14:30:00Z",
    "variants": [
      {
        "id": "var_002_raw",
        "productId": "prod_002",
        "color": "Raw Indigo",
        "colorHex": "#1c2a44",
        "images": [
          {
            "id": "img_002_1",
            "url": "/images/selvedge-denim.jpg",
            "alt": "KAPDE Wide Selvedge Denim Editorial View",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_005",
            "size": "30",
            "stock": 5
          },
          {
            "id": "sz_006",
            "size": "32",
            "stock": 8
          },
          {
            "id": "sz_007",
            "size": "34",
            "stock": 3
          },
          {
            "id": "sz_008",
            "size": "36",
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "prod_003",
    "name": "Boxy Heavyweight Cotton Tee",
    "slug": "boxy-heavyweight-cotton-tee",
    "description": "Our signature tee engineered in 300 GSM combed ringspun cotton jersey. Structured silhouette with dropped shoulders, elongated sleeves, and a reinforced 1.2-inch collar rib that will never bacon. Garment dyed and enzyme-washed for supreme handfeel.",
    "category": "tees",
    "price": 1690,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-03T10:00:00Z",
    "updatedAt": "2026-10-18T09:15:00Z",
    "variants": [
      {
        "id": "var_003_wht",
        "productId": "prod_003",
        "color": "Chalk White",
        "colorHex": "#f4f4f4",
        "images": [
          {
            "id": "img_003_1",
            "url": "/images/heavyweight-tee.jpg",
            "alt": "KAPDE Boxy Heavyweight Cotton Tee Editorial View",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_009",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_010",
            "size": "M",
            "stock": 12
          },
          {
            "id": "sz_011",
            "size": "L",
            "stock": 10
          },
          {
            "id": "sz_012",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_004",
    "name": "Camp Collar Virgin Wool Overshirt",
    "slug": "camp-collar-virgin-wool-overshirt",
    "description": "Midweight virgin wool flannel with a relaxed boxy cut, Cuban open collar, and dual oversized chest patch pockets. Natural horn button placket and square-cut hem. An effortless standalone shirt or outerwear layer.",
    "category": "shirts",
    "price": 4290,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-05T11:00:00Z",
    "updatedAt": "2026-10-19T10:00:00Z",
    "variants": [
      {
        "id": "var_004_olv",
        "productId": "prod_004",
        "color": "Olive Drab",
        "colorHex": "#3e4732",
        "images": [
          {
            "id": "img_004_1",
            "url": "/images/pleated-trousers.jpg",
            "alt": "KAPDE Camp Collar Overshirt",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_013",
            "size": "M",
            "stock": 4
          },
          {
            "id": "sz_014",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_015",
            "size": "XL",
            "stock": 2
          }
        ]
      }
    ]
  },
  {
    "id": "prod_005",
    "name": "Architectural Linen-Blend Co-ord Set",
    "slug": "architectural-linen-blend-coord-set",
    "description": "A complete two-piece ensemble combining a relaxed unstructured kimono-style shirt jacket with matching double-pleated wide shorts. Cut from structured 55% French linen and 45% organic cotton.",
    "category": "coords",
    "price": 6490,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-07T14:00:00Z",
    "updatedAt": "2026-10-19T13:40:00Z",
    "variants": [
      {
        "id": "var_005_san",
        "productId": "prod_005",
        "color": "Desert Sand",
        "colorHex": "#d9d2c5",
        "images": [
          {
            "id": "img_005_1",
            "url": "/images/heavyweight-tee.jpg",
            "alt": "KAPDE Linen-Blend Co-ord Set",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_016",
            "size": "M",
            "stock": 3
          },
          {
            "id": "sz_017",
            "size": "L",
            "stock": 5
          },
          {
            "id": "sz_018",
            "size": "XL",
            "stock": 2
          }
        ]
      }
    ]
  },
  {
    "id": "prod_006",
    "name": "Classic Wool & Leather Varsity Jacket",
    "slug": "classic-wool-leather-varsity-jacket",
    "description": "Heavyweight Melton wool body paired with buttery grain leather sleeves. Quilted viscose lining, tonal snap front placket, striped rib-knit trims, and archival embroidered KAPDE insignia.",
    "category": "shirts",
    "price": 8990,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-09T10:00:00Z",
    "updatedAt": "2026-10-19T16:00:00Z",
    "variants": [
      {
        "id": "var_006_grn",
        "productId": "prod_006",
        "color": "Forest Green",
        "colorHex": "#1f3829",
        "images": [
          {
            "id": "img_006_1",
            "url": "/images/varsity-jacket.jpg",
            "alt": "KAPDE Varsity Jacket",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_019",
            "size": "S",
            "stock": 2
          },
          {
            "id": "sz_020",
            "size": "M",
            "stock": 5
          },
          {
            "id": "sz_021",
            "size": "L",
            "stock": 4
          },
          {
            "id": "sz_022",
            "size": "XL",
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "prod_007",
    "name": "Fair Isle Jacquard Sweater",
    "slug": "fair-isle-jacquard-sweater",
    "description": "Crafted from a mid-weight woolen blend, this Fair Isle jacquard sweater features a traditional multi-color patterned weave with a soft, cozy drape. Offers a regular fit; true to size for a classic silhouette.",
    "category": "hoodies",
    "price": 3490,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-08T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_007_0",
        "productId": "prod_007",
        "color": "Multi",
        "colorHex": "#5A2C3C",
        "images": [
          {
            "id": "img_007_0_0",
            "url": "/images/products/FW26KS000_TNFXALDJACQUARDSWEATER_FAIRISLE_1_600x.jpg",
            "alt": "Fair Isle Jacquard Sweater front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_007_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_007_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_007_0_2",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_007_0_3",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_008",
    "name": "Novelty Crewneck Navy Blazer",
    "slug": "novelty-crewneck-navy-blazer",
    "description": "A refined knit crewneck in a deep navy hue, featuring a subtle embroidered novelty graphic on the chest. Made from a breathable cotton-knit blend with a smooth texture and relaxed drape. Size up for an oversized look.",
    "category": "hoodies",
    "price": 3290,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-09T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_008_0",
        "productId": "prod_008",
        "color": "Navy Blazer",
        "colorHex": "#121A2E",
        "images": [
          {
            "id": "img_008_0_0",
            "url": "/images/products/FW26KS001_NoveltyCrewneck_NAVYBLAZER_600x.jpg",
            "alt": "Novelty Crewneck Navy Blazer front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_008_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_008_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_008_0_2",
            "size": "L",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_009",
    "name": "Novelty Crewneck Pristine",
    "slug": "novelty-crewneck-pristine",
    "description": "Clean pristine white cotton-blend knit featuring a delicate embroidered chest graphic. Features a soft medium-weight weave and comfortable relaxed drape. True to size.",
    "category": "hoodies",
    "price": 3290,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-10T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_009_0",
        "productId": "prod_009",
        "color": "Pristine",
        "colorHex": "#F3F3F0",
        "images": [
          {
            "id": "img_009_0_0",
            "url": "/images/products/FW26KS001_NoveltyCrewneck_PRISTINE_600x.jpg",
            "alt": "Novelty Crewneck Pristine front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_009_0_0",
            "size": "S",
            "stock": 6
          },
          {
            "id": "sz_009_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_009_0_2",
            "size": "L",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_010",
    "name": "Black Onyx Zip Turtleneck",
    "slug": "black-onyx-zip-turtleneck",
    "description": "Structured ribbed zip-up turtleneck in a sleek black onyx shade. Heavyweight knit texture with a structured collar and tailored drape. Fits true to size.",
    "category": "hoodies",
    "price": 3890,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-11T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_010_0",
        "productId": "prod_010",
        "color": "Black Onyx",
        "colorHex": "#161616",
        "images": [
          {
            "id": "img_010_0_0",
            "url": "/images/products/FW26KS009_BLACKONYX_2_600x.jpg",
            "alt": "Black Onyx Zip Turtleneck front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_010_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_010_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_010_0_2",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_010_0_3",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_011",
    "name": "Pristine Ribbed Zip Turtleneck",
    "slug": "pristine-ribbed-zip-turtleneck",
    "description": "Thick gauge ribbed knit zip turtleneck in a pristine off-white tone. Features an elevated texture, premium warmth, and structured drape. Standard fit.",
    "category": "hoodies",
    "price": 3890,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-12T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_011_0",
        "productId": "prod_011",
        "color": "Pristine",
        "colorHex": "#F4F1EA",
        "images": [
          {
            "id": "img_011_0_0",
            "url": "/images/products/FW26KS009_PRISTINE_1_600x.jpg",
            "alt": "Pristine Ribbed Zip Turtleneck front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_011_0_0",
            "size": "S",
            "stock": 4
          },
          {
            "id": "sz_011_0_1",
            "size": "M",
            "stock": 6
          },
          {
            "id": "sz_011_0_2",
            "size": "L",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_012",
    "name": "Equestrian Red Crewneck",
    "slug": "equestrian-red-crewneck",
    "description": "Rich equestrian red cotton crewneck featuring a contrast cream ribbed collar and minimal chest branding. Mid-weight fleece-backed loopback jersey with a comfortable drape.",
    "category": "hoodies",
    "price": 2990,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-13T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_012_0",
        "productId": "prod_012",
        "color": "Equestrian Red",
        "colorHex": "#A31D24",
        "images": [
          {
            "id": "img_012_0_0",
            "url": "/images/products/FW26KS010_EquestrianRed_1_600x.jpg",
            "alt": "Equestrian Red Crewneck front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_012_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_012_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_012_0_2",
            "size": "L",
            "stock": 8
          },
          {
            "id": "sz_012_0_3",
            "size": "XL",
            "stock": 3
          }
        ]
      }
    ]
  },
  {
    "id": "prod_013",
    "name": "Jet Black Contrast Collar Crewneck",
    "slug": "jet-black-contrast-collar-crewneck",
    "description": "Deep jet black heavy crewneck featuring a contrast oatmeal ribbed neckline and embroidered chest text. Soft cotton blend with a plush handfeel and clean drape.",
    "category": "hoodies",
    "price": 2990,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-14T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_013_0",
        "productId": "prod_013",
        "color": "Jet Black",
        "colorHex": "#1C1C1C",
        "images": [
          {
            "id": "img_013_0_0",
            "url": "/images/products/FW26KS010_JETBLACK_1_600x.jpg",
            "alt": "Jet Black Contrast Collar Crewneck front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_013_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_013_0_1",
            "size": "M",
            "stock": 6
          },
          {
            "id": "sz_013_0_2",
            "size": "L",
            "stock": 8
          },
          {
            "id": "sz_013_0_3",
            "size": "XL",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_014",
    "name": "Multi Striped Half-Zip Polo",
    "slug": "multi-striped-half-zip-polo",
    "description": "Vintage-inspired horizontal multi-stripe patterned knit with a quarter-zip collar. Soft knit cotton fabric offering a relaxed, retro drape.",
    "category": "hoodies",
    "price": 3490,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-15T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_014_0",
        "productId": "prod_014",
        "color": "Multi Stripe",
        "colorHex": "#4A3B32",
        "images": [
          {
            "id": "img_014_0_0",
            "url": "/images/products/FW26KS012_MULTI_1_600x.jpg",
            "alt": "Multi Striped Half-Zip Polo front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_014_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_014_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_014_0_2",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_014_0_3",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_015",
    "name": "Jet Black Knit Hoodie",
    "slug": "jet-black-knit-hoodie",
    "description": "Cozy minimal hooded sweatshirt in solid jet black. Crafted from a heavy fleece-lined cotton blend with a structured hood and relaxed drape.",
    "category": "hoodies",
    "price": 3590,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-16T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_015_0",
        "productId": "prod_015",
        "color": "Jet Black",
        "colorHex": "#181818",
        "images": [
          {
            "id": "img_015_0_0",
            "url": "/images/products/FW26KS019_JETBLACK_1_600x.jpg",
            "alt": "Jet Black Knit Hoodie front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_015_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_015_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_015_0_2",
            "size": "L",
            "stock": 8
          },
          {
            "id": "sz_015_0_3",
            "size": "XL",
            "stock": 6
          }
        ]
      }
    ]
  },
  {
    "id": "prod_016",
    "name": "Oatmeal Melange Knit Hoodie",
    "slug": "oatmeal-melange-knit-hoodie",
    "description": "Relaxed-fit hooded sweatshirt in an oatmeal melange shade. Heavyweight cotton fleece with a soft brushed interior and comfortable slouchy drape.",
    "category": "hoodies",
    "price": 3590,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-17T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_016_0",
        "productId": "prod_016",
        "color": "Oatmeal Melange",
        "colorHex": "#D6D0C5",
        "images": [
          {
            "id": "img_016_0_0",
            "url": "/images/products/FW26KS019_OATMEALMELANGE_1_600x.jpg",
            "alt": "Oatmeal Melange Knit Hoodie front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_016_0_0",
            "size": "S",
            "stock": 4
          },
          {
            "id": "sz_016_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_016_0_2",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_016_0_3",
            "size": "XL",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_017",
    "name": "Coffee Bean Geometric Pattern Sweater",
    "slug": "coffee-bean-geometric-pattern-sweater",
    "description": "Rich coffee bean brown sweater featuring an intricate all-over geometric pattern weave. Soft textured yarn with a cozy, substantial feel and standard fit.",
    "category": "hoodies",
    "price": 3690,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-18T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_017_0",
        "productId": "prod_017",
        "color": "Coffee Bean",
        "colorHex": "#3D261D",
        "images": [
          {
            "id": "img_017_0_0",
            "url": "/images/products/FW26KS024_COFFEEBEAN_1_600x.jpg",
            "alt": "Coffee Bean Geometric Pattern Sweater front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_017_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_017_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_017_0_2",
            "size": "L",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_018",
    "name": "Pristine Geometric Pattern Sweater",
    "slug": "pristine-geometric-pattern-sweater",
    "description": "Off-white pristine base sweater detailed with a striking contrast geometric grid pattern. Soft knit fabric composition offering warmth and an effortless drape.",
    "category": "hoodies",
    "price": 3690,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-19T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_018_0",
        "productId": "prod_018",
        "color": "Pristine",
        "colorHex": "#EAE5DC",
        "images": [
          {
            "id": "img_018_0_0",
            "url": "/images/products/FW26KS024_PRISTINE_2_600x.jpg",
            "alt": "Pristine Geometric Pattern Sweater front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_018_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_018_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_018_0_2",
            "size": "L",
            "stock": 6
          }
        ]
      }
    ]
  },
  {
    "id": "prod_019",
    "name": "Blue Half-Zip Knit Pullover",
    "slug": "blue-half-zip-knit-pullover",
    "description": "Vibrant blue half-zip sweater crafted from a tightly woven smooth cotton yarn. Features a polished collar, metal zip pull, and structured straight drape.",
    "category": "hoodies",
    "price": 3490,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-20T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_019_0",
        "productId": "prod_019",
        "color": "Blue",
        "colorHex": "#154A8C",
        "images": [
          {
            "id": "img_019_0_0",
            "url": "/images/products/FW26WJ007_BLUE_6_600x.jpg",
            "alt": "Blue Half-Zip Knit Pullover front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_019_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_019_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_019_0_2",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_019_0_3",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_020",
    "name": "Jet Black Half-Zip Knit Pullover",
    "slug": "jet-black-half-zip-knit-pullover",
    "description": "Sleek jet black half-zip pullover made with a fine knit gauge for a clean, sophisticated look. Offers a comfortable regular fit and smooth drape.",
    "category": "hoodies",
    "price": 3490,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-21T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_020_0",
        "productId": "prod_020",
        "color": "Jet Black",
        "colorHex": "#1A1A1A",
        "images": [
          {
            "id": "img_020_0_0",
            "url": "/images/products/FW26WJ007_JETBLACK_6_600x.jpg",
            "alt": "Jet Black Half-Zip Knit Pullover front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_020_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_020_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_020_0_2",
            "size": "L",
            "stock": 7
          },
          {
            "id": "sz_020_0_3",
            "size": "XL",
            "stock": 5
          }
        ]
      }
    ]
  },
  {
    "id": "prod_021",
    "name": "Biker Vest Black Onyx",
    "slug": "biker-vest-black-onyx",
    "description": "Heavy-duty utility biker vest in black onyx featuring a cozy faux-shearling lining and clean zippered front closure. Layering essential with a structured boxy cut.",
    "category": "shirts",
    "price": 4290,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-22T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_021_0",
        "productId": "prod_021",
        "color": "Black Onyx",
        "colorHex": "#242220",
        "images": [
          {
            "id": "img_021_0_0",
            "url": "/images/products/FW26WJ027_BikerVest_BlackOnyx_1_600x.jpg",
            "alt": "Biker Vest Black Onyx front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_021_0_0",
            "size": "S",
            "stock": 4
          },
          {
            "id": "sz_021_0_1",
            "size": "M",
            "stock": 6
          },
          {
            "id": "sz_021_0_2",
            "size": "L",
            "stock": 5
          },
          {
            "id": "sz_021_0_3",
            "size": "XL",
            "stock": 3
          }
        ]
      }
    ]
  },
  {
    "id": "prod_022",
    "name": "Lined Mechanic Jacket Coffee Bean",
    "slug": "lined-mechanic-jacket-coffee-bean",
    "description": "Classic workwear-inspired mechanic jacket in a deep coffee bean brown. Durable heavy cotton canvas exterior with an insulated inner lining and clean collar detail.",
    "category": "shirts",
    "price": 4590,
    "featured": true,
    "status": "published",
    "createdAt": "2026-10-23T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_022_0",
        "productId": "prod_022",
        "color": "Coffee Bean",
        "colorHex": "#4A3226",
        "images": [
          {
            "id": "img_022_0_0",
            "url": "/images/products/FW26WJ032_LinedMechanicJacket_CoffeeBean_1_600x.jpg",
            "alt": "Lined Mechanic Jacket Coffee Bean front view",
            "sortOrder": 0
          },
          {
            "id": "img_022_0_1",
            "url": "/images/products/FW26WJ032_LinedMechanicJacket_CoffeeBean_2_600x.jpg",
            "alt": "Lined Mechanic Jacket Coffee Bean reverse angle",
            "sortOrder": 1
          }
        ],
        "sizes": [
          {
            "id": "sz_022_0_0",
            "size": "S",
            "stock": 4
          },
          {
            "id": "sz_022_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_022_0_2",
            "size": "L",
            "stock": 8
          },
          {
            "id": "sz_022_0_3",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_023",
    "name": "Cord Trousers Coffee Bean",
    "slug": "cord-trousers-coffee-bean",
    "description": "Wide-wale cotton corduroy trousers in a rich coffee bean brown shade. Features a mid-weight textured weave, straight-leg cut, and relaxed drape. True to size waist sizing.",
    "category": "pants",
    "price": 3290,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-24T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_023_0",
        "productId": "prod_023",
        "color": "Coffee Bean",
        "colorHex": "#3D281F",
        "images": [
          {
            "id": "img_023_0_0",
            "url": "/images/products/FW26WP015_CordTrousers_CoffeeBean_1_600x.jpg",
            "alt": "Cord Trousers Coffee Bean front view",
            "sortOrder": 0
          },
          {
            "id": "img_023_0_1",
            "url": "/images/products/FW26WP015_CordTrousers_CoffeeBean_2_600x.jpg",
            "alt": "Cord Trousers Coffee Bean detail angle",
            "sortOrder": 1
          }
        ],
        "sizes": [
          {
            "id": "sz_023_0_0",
            "size": "30",
            "stock": 5
          },
          {
            "id": "sz_023_0_1",
            "size": "32",
            "stock": 8
          },
          {
            "id": "sz_023_0_2",
            "size": "34",
            "stock": 6
          },
          {
            "id": "sz_023_0_3",
            "size": "36",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_024",
    "name": "Cord Trousers Jet Black",
    "slug": "cord-trousers-jet-black",
    "description": "Classic straight-leg corduroy pants in deep jet black. Crafted from a durable cotton corduroy fabric with a soft handfeel and structured drape. Standard waist fit.",
    "category": "pants",
    "price": 3290,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-25T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_024_0",
        "productId": "prod_024",
        "color": "Jet Black",
        "colorHex": "#1A1A1A",
        "images": [
          {
            "id": "img_024_0_0",
            "url": "/images/products/FW26WP015_CordTrousers_JetBlack_1_600x.jpg",
            "alt": "Cord Trousers Jet Black front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_024_0_0",
            "size": "30",
            "stock": 6
          },
          {
            "id": "sz_024_0_1",
            "size": "32",
            "stock": 8
          },
          {
            "id": "sz_024_0_2",
            "size": "34",
            "stock": 7
          },
          {
            "id": "sz_024_0_3",
            "size": "36",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_025",
    "name": "Nylon Track Pant Jet Black",
    "slug": "nylon-track-pant-jet-black",
    "description": "Lightweight technical nylon track trousers in jet black. Features a breathable weave, relaxed sporty drape, and comfortable elasticated waistband.",
    "category": "pants",
    "price": 2890,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-01T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_025_0",
        "productId": "prod_025",
        "color": "Jet Black",
        "colorHex": "#171717",
        "images": [
          {
            "id": "img_025_0_0",
            "url": "/images/products/SS26WP040_NYLONTRACKPANT_JETBLACK_1_600x.jpg",
            "alt": "Nylon Track Pant Jet Black front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_025_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_025_0_1",
            "size": "M",
            "stock": 8
          },
          {
            "id": "sz_025_0_2",
            "size": "L",
            "stock": 6
          },
          {
            "id": "sz_025_0_3",
            "size": "XL",
            "stock": 4
          }
        ]
      }
    ]
  },
  {
    "id": "prod_026",
    "name": "Nylon Track Pant Navy Blazer",
    "slug": "nylon-track-pant-navy-blazer",
    "description": "Performance-ready nylon track pants in navy blazer blue. Crisp, lightweight fabric with an effortless casual drape and secure elastic waist.",
    "category": "pants",
    "price": 2890,
    "featured": false,
    "status": "published",
    "createdAt": "2026-10-02T10:00:00Z",
    "updatedAt": "2026-10-20T12:00:00Z",
    "variants": [
      {
        "id": "var_026_0",
        "productId": "prod_026",
        "color": "Navy Blazer",
        "colorHex": "#1C2536",
        "images": [
          {
            "id": "img_026_0_0",
            "url": "/images/products/SS26WP040_NYLONTRACKPANT_NAVYBLAZER_1_600x.jpg",
            "alt": "Nylon Track Pant Navy Blazer front view",
            "sortOrder": 0
          }
        ],
        "sizes": [
          {
            "id": "sz_026_0_0",
            "size": "S",
            "stock": 5
          },
          {
            "id": "sz_026_0_1",
            "size": "M",
            "stock": 7
          },
          {
            "id": "sz_026_0_2",
            "size": "L",
            "stock": 8
          },
          {
            "id": "sz_026_0_3",
            "size": "XL",
            "stock": 5
          }
        ]
      }
    ]
  }
];

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
