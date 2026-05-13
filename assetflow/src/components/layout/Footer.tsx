import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-on-background bg-on-background text-white mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Merek */}
          <div className="md:col-span-2">
            <Link href="/" className="font-headline text-[28px] font-black tracking-tighter text-white">
              AssetFlow
            </Link>
            <p className="font-body text-[14px] text-outline mt-4 max-w-sm leading-relaxed">
              Marketplace premium untuk aset digital luar biasa. Dibuat untuk kreator profesional di seluruh dunia.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {["twitter", "instagram", "dribbble", "youtube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-10 h-10 rounded-full border-2 border-on-surface-variant flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
                  aria-label={s}
                >
                  <span className="material-symbols-outlined text-[18px] text-outline hover:text-primary-container">
                    {s === "twitter" ? "alternate_email" : s === "instagram" ? "photo_camera" : s === "dribbble" ? "sports_basketball" : "play_circle"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Pasar */}
          <div>
            <h4 className="font-headline font-bold text-[12px] uppercase tracking-widest text-outline mb-4">Pasar</h4>
            <ul className="space-y-3">
              {[
                { label: "Jelajah", href: "/explore" },
                { label: "Koleksi", href: "/collections" },
                { label: "Kreator", href: "/creators" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-body text-[14px] text-outline-variant hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-headline font-bold text-[12px] uppercase tracking-widest text-outline mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {[
                { label: "Cara Kerja", href: "/how-it-works" },
                { label: "Tentang", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Karir", href: "#" },
                { label: "Kontak", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-body text-[14px] text-outline-variant hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-on-surface-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[13px] text-outline">
            © 2025 AssetFlow. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-[13px] text-outline hover:text-white transition-colors">Privasi</a>
            <a href="#" className="font-body text-[13px] text-outline hover:text-white transition-colors">Syarat</a>
            <a href="#" className="font-body text-[13px] text-outline hover:text-white transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
