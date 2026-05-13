"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AssetCard from "@/components/features/AssetCard";
import { assets, categories } from "@/lib/data";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const sortOptions = ["Terbaru", "Harga: Rendah ke Tinggi", "Harga: Tinggi ke Rendah", "Paling Populer"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") || "";
  
  const [activeCategory, setActiveCategory] = useState("Semua Aset");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [searchQuery, setSearchQuery] = useState(qParam);

  useEffect(() => {
    setSearchQuery(qParam);
  }, [qParam]);

  const filtered = useMemo(() => {
    let list = [...assets];
    if (activeCategory !== "Semua Aset") {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (searchQuery) {
      list = list.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (sortBy === "Harga: Rendah ke Tinggi") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "Harga: Tinggi ke Rendah") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "Paling Populer") list.sort((a, b) => b.downloads - a.downloads);
    return list;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Header Halaman */}
        <div className="mb-10">
          <h1 className="font-headline text-4xl font-black text-on-background tracking-tight">Jelajahi Aset</h1>
          <p className="font-body text-[16px] text-on-surface-variant mt-2">Telusuri {assets.length}+ aset digital premium dari kreator kelas dunia.</p>
        </div>

        {/* Bilah Cari + Urutkan */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center bg-white border-2 border-on-background rounded-xl px-4 py-3 focus-within:shadow-[4px_4px_0px_0px_#2346d5] transition-all">
            <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none text-[14px] font-medium placeholder:text-outline-variant w-full font-body"
              placeholder="Cari berdasarkan judul, tag, atau kreator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-outline hover:text-on-background">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-[14px] font-bold text-on-surface-variant whitespace-nowrap">Urutkan:</span>
            <select
              className="bg-white border-2 border-on-background rounded-xl px-4 py-3 font-body font-bold text-[14px] text-on-background outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pil Kategori */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-headline font-bold text-[14px] px-5 py-2.5 rounded-full border-2 border-on-background whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-on-background text-white"
                  : "bg-white text-on-background hover:bg-surface-variant"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jumlah hasil */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-body text-[14px] text-on-surface-variant">
            Menampilkan <span className="font-bold text-on-background">{filtered.length}</span> hasil
            {activeCategory !== "Semua Aset" && <span> di <span className="font-bold text-primary">{activeCategory}</span></span>}
          </p>
        </div>

        {/* Grid Aset */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">search_off</span>
            <h3 className="font-headline text-2xl font-bold text-on-background">Aset tidak ditemukan</h3>
            <p className="font-body text-[16px] text-on-surface-variant mt-2">Coba sesuaikan pencarian atau filter kategori Anda.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("Semua Aset"); }}
              className="mt-6 font-headline font-bold text-[14px] bg-primary text-white px-6 py-3 rounded-xl border-2 border-on-background bento-shadow-sm"
            >
              Hapus Filter
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center font-headline font-bold">Memuat...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
