# KAPDE — Classical Tailoring. Contemporary Volume.

<div align="center">

**Curated Luxury Menswear & Architectural Silhouettes from Ahmedabad.**  
*Editorial Commerce inspired by Aimé Leon Dore.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Storage-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[**Presentation Context**](./context_presentation.md) • [**Technical Architecture**](./context_technical.md) • [**Database Schema**](./schema.sql) • [**Seed Data**](./seed.sql)

</div>

---

## 👔 About KAPDE

KAPDE was established to challenge the disposable cycle of modern menswear. We design garments that prioritize drape, substance, and permanent ease over fleeting micro-trends.

Rooted in Ahmedabad's rich textile history, our pieces are cut with Savile Row ease: deep double pleats, generous volume through the seat and thighs, and an intentional break designed to stack effortlessly over footwear.

Every silhouette is engineered with substantial natural textiles (300 to 480 GSM worsted wool twill, 14.5oz Japanese shuttle-loom denim, combed ringspun cotton).

---

## ✨ Key Features

- **Aimé Leon Dore Editorial Aesthetic:** Clean monochrome palette, flat shadowless design, Sohne interface typography, and Financier Display headlines.
- **26 Curated Luxury Silhouettes:** Complete multi-variant catalog covering Pants & Trousers, Denim & Jeans, Heavyweight Tees, Overshirts, Hoodies & Knitwear, and Co-ord Sets.
- **1-Click WhatsApp Concierge Checkout:** Seamless order manifest generation sent directly to WhatsApp for personalized sizing advice and order closing.
- **Atomic Stock Decrement:** PostgreSQL stored procedure (`confirm_order_and_decrement_stock`) protecting against overselling and race conditions.
- **Dual-Layer Database Engine:** Operates seamlessly with Supabase Cloud PostgreSQL or an in-memory zero-config fallback engine in local development.
- **Real-Time Atelier Admin CMS:** Role-gated dashboard with inventory health alerts (< 3 units), order fulfillment, and product CRUD.
- **Modern SEO & Machine-Readable AI Discoverability:** Automated OpenGraph previews, dynamic `sitemap.xml`, `robots.txt`, and crawler-ready `llms.txt`.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/kapde.git
cd kapde
npm install
```

### 2. Run Locally (Zero-Config Fallback)
KAPDE includes a built-in mock fallback engine that runs immediately with the entire 26-piece catalog:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to view the Atelier CMS.

### 3. Connect Supabase (Optional for Production)
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Run `schema.sql` in your Supabase SQL Editor.
3. Run `seed.sql` to populate the 26 catalog items.

---

## 📜 Documentation

- [**context_presentation.md**](./context_presentation.md) / [**context.md**](./context.md): Exhaustive 15-slide presentation context file ready to feed into Google Gemini / Google Slides to generate a deck.
- [**context_technical.md**](./context_technical.md): Deep-dive technical architecture, ERD diagrams, and engineering specifications.
