import Link from "next/link";
import { Asset } from "@/lib/data";
import { formatRupiah } from "@/lib/format";

interface AssetCardProps {
  asset: Asset;
  featured?: boolean;
}

export default function AssetCard({ asset, featured = false }: AssetCardProps) {
  const badgeColors: Record<string, string> = {
    Hot: "bg-secondary text-white border-on-background",
    Baru: "bg-tertiary-container text-on-tertiary-container border-on-background",
    Diskon: "bg-primary text-white border-on-background",
    Unggulan: "bg-on-background text-white border-on-background",
  };

  if (featured) {
    return (
      <Link href={`/asset/${asset.id}`}>
        <article className="col-span-1 md:col-span-2 row-span-2 bg-white border-2 border-on-background rounded-2xl overflow-hidden flex flex-col bento-shadow cursor-pointer relative group h-full">
          {asset.badge && (
            <div
              className={`absolute top-4 right-4 z-10 font-headline font-bold text-[12px] px-3 py-1.5 rounded-full border-2 uppercase shadow-[2px_2px_0px_0px_#1A1A1A] ${badgeColors[asset.badge] || badgeColors.Unggulan}`}
            >
              {asset.badge}
            </div>
          )}
          <div className="h-[60%] w-full relative border-b-2 border-on-background overflow-hidden bg-background">
            <img
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              src={asset.image}
              alt={asset.title}
            />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between bg-white">
            <div>
              <h3 className="font-headline text-2xl font-black text-on-background mb-2">{asset.title}</h3>
              <p className="font-body text-[14px] font-medium text-on-surface-variant line-clamp-2">{asset.description}</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-on-background/10">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full border-2 border-on-background object-cover" src={asset.creator.avatar} alt={asset.creator.name} />
                <span className="font-body text-[14px] font-bold">{asset.creator.handle}</span>
              </div>
              <button className="bg-primary text-white font-bold px-4 py-2 rounded-xl border-2 border-on-background bento-shadow-sm active:translate-y-1 active:shadow-none transition-all">
                Beli {formatRupiah(asset.price)}
              </button>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/asset/${asset.id}`}>
      <article className="bg-white border-2 border-on-background rounded-2xl overflow-hidden flex flex-col bento-shadow cursor-pointer group h-full">
        <div className="h-[55%] min-h-[160px] w-full border-b-2 border-on-background overflow-hidden bg-background relative">
          {asset.badge && (
            <div
              className={`absolute top-3 right-3 z-10 font-headline font-bold text-[10px] px-2 py-1 rounded-full border-2 uppercase ${badgeColors[asset.badge] || badgeColors.Unggulan}`}
            >
              {asset.badge}
            </div>
          )}
          <img
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            src={asset.image}
            alt={asset.title}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-[18px] font-bold text-on-background truncate">{asset.title}</h3>
            <span className="inline-block font-body text-[12px] font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded mt-2">
              {asset.category}
            </span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="font-headline font-black text-[18px] text-on-background">{formatRupiah(asset.price)}</span>
            <button
              className="w-8 h-8 rounded-full bg-white border-2 border-on-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Tambah ke keranjang"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
