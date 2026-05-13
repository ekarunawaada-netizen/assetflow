import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { collections } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse curated collections of premium digital assets on AssetFlow.",
};

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="border-b-2 border-on-background bg-white px-6 py-16">
          <div className="max-w-[1280px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-container border-2 border-on-background text-on-tertiary-container font-bold text-[12px] uppercase tracking-wide bento-shadow-sm mb-6">
              <span className="material-symbols-outlined text-[16px]">collections</span>
              Curated For You
            </div>
            <h1 className="font-headline text-5xl font-black text-on-background tracking-tight mb-4">Collections</h1>
            <p className="font-body text-[18px] text-on-surface-variant max-w-xl">
              Hand-picked bundles of premium digital assets organized by theme, style, and purpose.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="max-w-[1280px] mx-auto px-6 py-16">
          {/* Featured collection - large */}
          <div className="mb-12">
            <h2 className="font-headline text-2xl font-black text-on-background uppercase tracking-tight mb-6">
              Editor&apos;s Pick
            </h2>
            <Link href={`/explore`}>
              <article className="group relative border-2 border-on-background rounded-3xl overflow-hidden bento-shadow cursor-pointer bg-on-background">
                <div className="h-80 overflow-hidden">
                  <img
                    src={collections[0].image}
                    alt={collections[0].title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <div className="flex gap-2 mb-4">
                    {collections[0].tags.map((tag) => (
                      <span key={tag} className="font-body text-[12px] font-bold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline text-4xl font-black text-white mb-2">{collections[0].title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-[16px] text-white/80 max-w-lg">{collections[0].description}</p>
                    <div className="flex items-center gap-4 shrink-0 ml-8">
                      <span className="font-headline font-bold text-[14px] text-white/70">
                        {collections[0].assetCount} assets
                      </span>
                      <span className="w-12 h-12 rounded-full bg-white border-2 border-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-background text-[24px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Grid of collections */}
          <h2 className="font-headline text-2xl font-black text-on-background uppercase tracking-tight mb-6">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.slice(1).map((col) => (
              <Link key={col.id} href="/explore">
                <article className="group border-2 border-on-background rounded-2xl overflow-hidden bento-shadow cursor-pointer bg-white">
                  <div className="h-48 overflow-hidden border-b-2 border-on-background relative bg-background">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {col.tags.map((tag) => (
                        <span key={tag} className="font-body text-[11px] font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-headline text-[20px] font-bold text-on-background mb-1">{col.title}</h3>
                    <p className="font-body text-[13px] text-on-surface-variant line-clamp-2 mb-4">{col.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-headline font-black text-[16px] text-on-background">{col.assetCount}</span>
                        <span className="font-body text-[13px] text-outline ml-1">assets</span>
                      </div>
                      <span className="font-body text-[12px] font-bold text-primary">{col.curator}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
