"use client";

import Image from "next/image";

export function StorefrontBrandStory() {
  return (
    <section id="about" className="bg-[#fafafa] border-t border-b border-gray-200 py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400 block">
              The Philosophy · KAPDE Atelier
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-black leading-tight tracking-tight">
              The anatomy of proportion and permanent style.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
              <p>
                KAPDE was established to challenge the disposable cycle of modern menswear. We design garments that prioritize drape, weight, and timeless ease over fleeting micro-trends.
              </p>
              <p>
                Every trouser cut, selvedge denim roll, and heavyweight cotton tee is developed with architectural precision. Sits comfortably at the waist with an expansive, intentional silhouette that breaks cleanly over leather loafers or low-top sneakers.
              </p>
            </div>

            {/* Core Craftsmanship Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="p-4 bg-white border border-gray-200 rounded-sm">
                <span className="block text-xs font-semibold uppercase tracking-wider text-black">
                  Dense Weight
                </span>
                <span className="text-xs text-neutral-500 mt-1 block">
                  300–480 GSM natural textiles built to last decades.
                </span>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-sm">
                <span className="block text-xs font-semibold uppercase tracking-wider text-black">
                  Savile Row Ease
                </span>
                <span className="text-xs text-neutral-500 mt-1 block">
                  Generous pleats, deep rise, and balanced volume.
                </span>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-sm">
                <span className="block text-xs font-semibold uppercase tracking-wider text-black">
                  Direct Concierge
                </span>
                <span className="text-xs text-neutral-500 mt-1 block">
                  1-on-1 WhatsApp sizing and concierge dispatch.
                </span>
              </div>
            </div>
          </div>

          {/* Lookbook Campaign Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-neutral-200 rounded-sm overflow-hidden border border-gray-200">
              <Image
                src="/images/pleated-trousers.jpg"
                alt="KAPDE Pleated Trousers Drape"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative aspect-[3/4] bg-neutral-200 rounded-sm overflow-hidden border border-gray-200 mt-8">
              <Image
                src="/images/heavyweight-tee.jpg"
                alt="KAPDE Heavyweight Tee Craftsmanship"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
