import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { creators } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kreator",
  description: "Temukan kreator digital top di AssetFlow. Telusuri portofolio mereka, ikuti favorit Anda, dan beli langsung dari sumbernya.",
};

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "rb";
  return n.toString();
}

export default function CreatorsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="border-b-2 border-on-background bg-white px-6 py-16">
          <div className="max-w-[1280px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-on-background text-primary font-bold text-[12px] uppercase tracking-wide bento-shadow-sm mb-6">
              <span className="material-symbols-outlined text-[16px]">group</span>
              Komunitas Kreatif
            </div>
            <h1 className="font-headline text-5xl font-black text-on-background tracking-tight mb-4">
              Temui Kreator Kami
            </h1>
            <p className="font-body text-[18px] text-on-surface-variant max-w-xl">
              Seniman, desainer, dan pengembang berbakat yang menggerakkan marketplace premium AssetFlow.
            </p>
          </div>
        </section>

        {/* Grid Kreator */}
        <section className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <article key={creator.id} className="bg-white border-2 border-on-background rounded-2xl overflow-hidden bento-shadow group cursor-pointer">
                {/* Banner */}
                <div className="h-36 w-full overflow-hidden border-b-2 border-on-background relative bg-background">
                  <img
                    src={creator.banner}
                    alt={`${creator.name} banner`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>

                {/* Avatar + info */}
                <div className="px-5 pb-5">
                  <div className="flex items-end justify-between -mt-8 mb-4">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-[4px_4px_0px_0px_#191c1d]"
                      />
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-[12px]">verified</span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/explore?creator=${creator.handle}`}
                      className="font-headline font-bold text-[13px] bg-on-background text-white px-4 py-2 rounded-full border-2 border-on-background hover:bg-primary transition-colors"
                    >
                      Ikuti
                    </Link>
                  </div>

                  <h3 className="font-headline text-[20px] font-black text-on-background">{creator.name}</h3>
                  <p className="font-body text-[13px] font-bold text-primary mb-2">{creator.handle}</p>
                  <p className="font-body text-[14px] text-on-surface-variant line-clamp-2 mb-4">{creator.bio}</p>

                  {/* Tag kategori */}
                  <span className="inline-block font-body text-[12px] font-bold text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full mb-4">
                    {creator.category}
                  </span>

                  {/* Statistik */}
                  <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
                    {[
                      { label: "Pengikut", value: formatNumber(creator.followers) },
                      { label: "Aset", value: creator.assets },
                      { label: "Penjualan", value: formatNumber(creator.sales) },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-headline font-black text-[18px] text-on-background">{stat.value}</div>
                        <div className="font-body text-[12px] text-outline">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Jadi Kreator */}
          <div className="mt-20 border-2 border-on-background rounded-3xl bg-background p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="font-headline text-4xl font-black text-on-background mb-4">Ingin bergabung dengan mereka?</h2>
              <p className="font-body text-[18px] text-on-surface-variant mb-8 max-w-lg mx-auto">
                Mulai jual aset digital Anda hari ini dan bergabunglah dengan komunitas kreator profesional yang berkembang di AssetFlow.
              </p>
              <Link
                href="/upload"
                className="inline-block font-headline font-bold text-[16px] bg-primary text-white px-10 py-4 rounded-xl border-2 border-on-background bento-shadow"
              >
                Jadi Kreator
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
