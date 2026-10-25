"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-white border-b border-gray-200">
      {/* Editorial Split Hero */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[82vh]">
        {/* Left Editorial Narrative Column */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-gray-200 bg-[#fafafa]">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 border border-black px-3 py-1 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-black">
                Drop 01 — Edition MXXVI
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif text-black leading-[1.08] tracking-tight">
                Classical Tailoring. <br />
                <span className="italic font-normal">Contemporary</span> Volume.
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-sans">
                Engineered with heavy worsted wool, Japanese shuttle-loom denim, and 300 GSM ringspun cotton jersey. No fast fashion. No compromises.
              </p>
            </div>
          </div>

          <div className="pt-10 lg:pt-0 space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#collection"
                className="btn-primary text-center"
              >
                Explore Collection
              </Link>
              <Link
                href="#categories"
                className="btn-secondary text-center"
              >
                Browse Categories
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-left">
              <div>
                <span className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                  Cut
                </span>
                <span className="text-xs font-medium text-black">
                  Relaxed & Wide
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                  Fabrics
                </span>
                <span className="text-xs font-medium text-black">
                  Natural Fibers
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                  Ordering
                </span>
                <span className="text-xs font-medium text-black">
                  WhatsApp Direct
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right High-Fashion Lookbook Imagery */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2">
          {/* Main Visual: Pleated Trousers */}
          <div className="relative h-[480px] sm:h-full min-h-[500px] border-b sm:border-b-0 sm:border-r border-gray-200 group overflow-hidden bg-neutral-100">
            <Image
              src="/images/pleated-trousers.jpg"
              alt="KAPDE Tailored Baggy Pleated Trouser Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-300">
                Look 01
              </span>
              <h2 className="text-xl sm:text-2xl font-serif">
                Tailored Pleated Trouser
              </h2>
              <span className="text-xs font-medium text-neutral-300 mt-1">
                Charcoal Wool Twill · ₹3,490
              </span>
            </div>
          </div>

          {/* Secondary Visual: Raw Selvedge Denim */}
          <div className="relative h-[480px] sm:h-full min-h-[500px] group overflow-hidden bg-neutral-100">
            <Image
              src="/images/selvedge-denim.jpg"
              alt="KAPDE Wide Selvedge Denim Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-300">
                Look 02
              </span>
              <h2 className="text-xl sm:text-2xl font-serif">
                Wide Japanese Selvedge
              </h2>
              <span className="text-xs font-medium text-neutral-300 mt-1">
                14.5oz Raw Indigo · ₹3,890
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
