import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AssetCard from "@/components/features/AssetCard";
import { assets } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const asset = assets.find((a) => a.id === id);
  if (!asset) return { title: "Asset Not Found" };

  return {
    title: `${asset.title} | AssetFlow`,
    description: asset.description,
  };
}

export default async function AssetDetailPage({ params }: PageProps) {
  const { id } = await params;
  const asset = assets.find((a) => a.id === id);

  if (!asset) {
    notFound();
  }

  const relatedAssets = assets
    .filter((a) => a.category === asset.category && a.id !== asset.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Breadcrumbs */}
        <nav className="max-w-container-max mx-auto px-gap-md py-6">
          <div className="flex items-center gap-2 font-body text-[14px] text-on-surface-variant font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-background">{asset.title}</span>
          </div>
        </nav>

        <section className="max-w-container-max mx-auto px-gap-md pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Image Preview */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-surface border-2 border-on-background rounded-3xl overflow-hidden bento-shadow-sm">
                <img 
                  src={asset.image} 
                  alt={asset.title} 
                  className="w-full aspect-video object-cover"
                />
              </div>

              {/* Tabs / Description */}
              <div className="space-y-6">
                <div className="flex gap-8 border-b-2 border-outline-variant pb-4">
                  <button className="font-headline font-bold text-[16px] text-primary border-b-4 border-primary pb-4 mb-[-18px]">
                    Description
                  </button>
                  <button className="font-headline font-bold text-[16px] text-on-surface-variant hover:text-on-background transition-colors pb-4">
                    Reviews ({asset.reviews})
                  </button>
                  <button className="font-headline font-bold text-[16px] text-on-surface-variant hover:text-on-background transition-colors pb-4">
                    Support
                  </button>
                </div>

                <div className="prose prose-on-background max-w-none">
                  <p className="font-body text-[18px] text-on-surface-variant leading-relaxed">
                    {asset.description}
                  </p>
                  <p className="font-body text-[16px] text-on-surface-variant mt-4 leading-relaxed">
                    This premium asset was carefully crafted by {asset.creator.name} using professional tools. 
                    It includes all the source files you need to kickstart your next project.
                  </p>
                  <h4 className="font-headline font-bold text-[20px] text-on-background mt-8 mb-4">What's included:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Fully layered & organized source files",
                      "High-resolution exports (PNG, SVG, JPG)",
                      "Free lifetime updates",
                      "Standard Commercial License",
                      "Documentation & Quick Start Guide",
                      "Direct support from the creator"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 font-body text-[15px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Purchase Sidebar */}
            <div className="space-y-6">
              <div className="bg-surface border-2 border-on-background rounded-3xl p-8 bento-shadow flex flex-col gap-6 sticky top-28">
                <div>
                  <h1 className="font-headline text-3xl font-black text-on-background leading-tight mb-2">
                    {asset.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="bg-primary-container/10 text-primary font-bold text-[12px] px-2 py-0.5 rounded border border-primary/20">
                      {asset.category}
                    </span>
                    <div className="flex text-yellow-500 text-[14px]">★★★★★</div>
                    <span className="text-[13px] font-bold text-on-surface-variant">({asset.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-6 border-y-2 border-outline-variant">
                  <div className="font-headline text-4xl font-black text-on-background">
                    ${asset.price}
                  </div>
                  {asset.priceEth && (
                    <div className="text-right">
                      <div className="font-body font-bold text-[14px] text-on-surface-variant">Estimated</div>
                      <div className="font-headline font-bold text-[18px] text-primary">{asset.priceEth}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-primary text-on-primary font-headline font-bold text-[18px] py-4 rounded-xl border-2 border-on-background bento-shadow active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Buy Now
                  </button>
                  <button className="w-full bg-surface text-on-background font-headline font-bold text-[16px] py-4 rounded-xl border-2 border-on-background hover:bg-surface-variant transition-colors flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">favorite</span>
                    Add to Wishlist
                  </button>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between font-body text-[14px]">
                    <span className="text-on-surface-variant font-medium">Last updated</span>
                    <span className="text-on-background font-bold">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-[14px]">
                    <span className="text-on-surface-variant font-medium">Downloads</span>
                    <span className="text-on-background font-bold">{asset.downloads}+</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-[14px]">
                    <span className="text-on-surface-variant font-medium">File Size</span>
                    <span className="text-on-background font-bold">124 MB</span>
                  </div>
                </div>

                {/* Creator Card */}
                <div className="mt-4 pt-6 border-t-2 border-outline-variant">
                  <div className="flex items-center gap-4">
                    <img 
                      src={asset.creator.avatar} 
                      alt={asset.creator.name} 
                      className="w-12 h-12 rounded-full border-2 border-on-background"
                    />
                    <div>
                      <div className="font-headline font-bold text-[16px] text-on-background">
                        {asset.creator.name}
                      </div>
                      <Link 
                        href={`/creators?handle=${asset.creator.handle}`}
                        className="font-body font-bold text-[13px] text-primary hover:underline"
                      >
                        {asset.creator.handle}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure Checkout Info */}
              <div className="bg-tertiary-container border-2 border-on-background rounded-2xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-on-tertiary-container">verified_user</span>
                <p className="font-body text-[13px] text-on-tertiary-container font-medium">
                  Secure checkout. All files are scanned for viruses and malware before publication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* More from Category */}
        {relatedAssets.length > 0 && (
          <section className="border-t-2 border-on-background bg-surface py-20 px-gap-md">
            <div className="max-w-container-max mx-auto">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="font-headline text-3xl font-black text-on-background uppercase tracking-tight">
                    More like this
                  </h2>
                  <p className="font-body text-[16px] font-medium text-on-surface-variant mt-2">
                    Explore more {asset.category} assets you might like.
                  </p>
                </div>
                <Link 
                  href={`/explore?category=${asset.category}`}
                  className="font-headline font-bold text-[14px] text-primary hover:underline flex items-center gap-1"
                >
                  View Category <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedAssets.map((a) => (
                  <AssetCard key={a.id} asset={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
