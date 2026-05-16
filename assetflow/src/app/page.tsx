import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { assets } from "@/lib/data";
import AssetCard from "@/components/features/AssetCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AssetFlow — Marketplace Kerajinan Digital",
  description: "Temukan, kumpulkan, dan jual aset digital luar biasa. Marketplace digital premium untuk alat kreatif profesional.",
};

const tickerItems = [
  { label: "TEMPLAT FIGMA", color: "text-[#2346d5]" },
  { label: "BLENDER 3D", color: "text-[#ae2f34]" },
  { label: "KIT NEXT.JS", color: "text-[#006449]" },
  { label: "DASBOR NOTION", color: "text-[#2346d5]" },
  { label: "KOMPONEN FRAMER", color: "text-[#ae2f34]" },
  { label: "TEMPLAT FIGMA", color: "text-[#2346d5]" },
  { label: "BLENDER 3D", color: "text-[#ae2f34]" },
  { label: "KIT NEXT.JS", color: "text-[#006449]" },
  { label: "DASBOR NOTION", color: "text-[#2346d5]" },
  { label: "KOMPONEN FRAMER", color: "text-[#ae2f34]" },
];

import { getDynamicAssets } from "@/lib/data";

export default async function HomePage() {
  const dynamicAssets = await getDynamicAssets();
  const featuredAsset = dynamicAssets[0];
  const gridAssets = dynamicAssets.slice(0, 8);
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-20 pb-20 px-6 overflow-hidden border-b-2 border-on-background bg-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top-right pointer-events-none" />

          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-container border-2 border-on-background text-on-tertiary-container font-bold text-[12px] uppercase tracking-wide bento-shadow-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                v2.0 Sekarang Aktif
              </div>

              <h1 className="font-headline text-5xl lg:text-[64px] font-black text-on-background leading-[1.05] tracking-tight">
                Membangun <br />
                <span className="text-primary inline-block bg-primary/10 px-2 mt-2 border-2 border-on-background bento-shadow-sm -rotate-2">
                  Perbatasan
                </span>{" "}
                Digital.
              </h1>

              <p className="font-body text-[18px] text-on-surface-variant max-w-lg font-medium leading-relaxed">
                Temukan, kumpulkan, dan jual aset digital luar biasa di marketplace premium untuk alat kreatif profesional. Presisi bertemu kegembiraan.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/explore"
                  className="w-full sm:w-auto font-headline font-bold text-[16px] bg-primary text-white px-8 py-4 rounded-xl border-2 border-on-background bento-shadow text-center"
                >
                  Mulai Menjelajah
                </Link>
                <Link
                  href="/how-it-works"
                  className="w-full sm:w-auto font-headline font-bold text-[16px] bg-white text-on-background px-8 py-4 rounded-xl border-2 border-on-background hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span> Cara Kerja
                </Link>
              </div>

              {/* Social proof */}
              <div className="pt-6 border-t border-on-background/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i}`} alt="User" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-background flex items-center justify-center text-[10px] font-bold text-on-background">+10rb</div>
                </div>
                <div>
                  <div className="flex text-yellow-500 text-[14px]">★★★★★</div>
                  <p className="font-body text-[13px] text-on-surface-variant font-bold mt-0.5">Dipercaya oleh 10rb+ kreator</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="relative hidden lg:block h-[500px] w-full">
              {/* Card 1 */}
              <div className="absolute right-0 top-10 w-64 bg-white rounded-xl border-2 border-on-background p-3 shadow-[8px_8px_0px_0px_#191c1d] z-20 animate-float">
                <div className="aspect-video bg-background border-2 border-on-background rounded-lg mb-3 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80" alt="UI Kit" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-headline font-bold text-[14px] text-on-background">Dasbor FinTech</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[12px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">Kit UI</span>
                  <span className="font-bold text-[14px]">Rp 1.2jt</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute left-10 bottom-10 w-56 bg-white rounded-xl border-2 border-on-background p-3 shadow-[8px_8px_0px_0px_#191c1d] z-30 animate-float-alt">
                <div className="aspect-square bg-secondary/10 border-2 border-on-background rounded-lg mb-3 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80" alt="Abstract 3D" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full border border-on-background">HOT</div>
                </div>
                <h4 className="font-headline font-bold text-[14px] text-on-background truncate">Bentuk Abstrak</h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span className="text-[11px] font-bold text-on-surface-variant">@3D_Mstr</span>
                </div>
              </div>

              {/* BG blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/20 rounded-full blur-3xl z-0" />
              <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-primary/20 rounded-full blur-2xl z-0" />
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div className="w-full overflow-hidden bg-on-background text-white py-3 flex relative z-10 border-b-2 border-on-background">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-10 font-headline font-bold text-[14px] uppercase tracking-widest">
            {tickerItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={item.color}>✦</span> {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Category Pills ── */}
        <section className="max-w-[1280px] mx-auto px-6 mt-8 mb-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 whitespace-nowrap pb-2">
            {["Semua Aset", "Seni Digital", "Model 3D", "Templat", "Ikon"].map((cat, i) => (
              <Link
                key={cat}
                href={i === 0 ? "/explore" : `/explore?category=${cat.replace(" ", "+")}`}
                className={`font-headline font-bold text-[14px] px-5 py-2.5 rounded-full border-2 border-on-background transition-all ${
                  i === 0 ? "bg-on-background text-white" : "bg-white text-on-background hover:bg-surface-variant"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured Drops ── */}
        <section className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-headline text-3xl font-black text-on-background uppercase tracking-tight">Rilis Unggulan</h2>
              <p className="font-body text-[16px] font-medium text-on-surface-variant mt-2">Pilihan terkurasi aset digital premium.</p>
            </div>
            <Link className="hidden md:flex font-headline font-bold text-[14px] text-primary hover:underline items-center gap-1" href="/explore">
              Lihat Semua <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gridAssets.slice(0, 3).map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-y-2 border-on-background bg-primary py-12 px-6">
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Aset Digital" },
              { value: "10K+", label: "Kreator Aktif" },
              { value: "Rp 30M+", label: "Penghasilan Kreator" },
              { value: "4.9★", label: "Rating Rata-rata" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-headline text-4xl font-black text-white">{stat.value}</div>
                <div className="font-body text-[14px] font-bold text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trending Now (Replaces Creator CTA) ── */}
        <section className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-headline text-3xl font-black text-on-background uppercase tracking-tight">Terpopuler</h2>
              <p className="font-body text-[16px] font-medium text-on-surface-variant mt-2">Koleksi yang paling banyak dicari kreator.</p>
            </div>
            <Link className="hidden md:flex font-headline font-bold text-[14px] text-primary hover:underline items-center gap-1" href="/explore">
              Lihat Semua <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicAssets.slice(3, 7).map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
