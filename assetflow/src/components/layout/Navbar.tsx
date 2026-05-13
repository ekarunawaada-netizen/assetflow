"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/explore", label: "Jelajah" },
    { href: "/creators", label: "Kreator" },
    { href: "/collections", label: "Koleksi" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-on-background shadow-[4px_4px_0px_0px_#191c1d] w-full">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1280px] mx-auto">
        {/* Kiri */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-headline text-[24px] font-black text-on-background tracking-tighter hover:text-primary transition-colors"
          >
            AssetFlow
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-12 font-body font-bold text-[14px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Kanan */}
        <div className="flex items-center gap-4">
          {/* Cari */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const q = formData.get("q");
              window.location.href = `/explore?q=${q}`;
            }}
            className="hidden lg:flex items-center bg-background border-2 border-on-background rounded-full px-4 py-2 focus-within:shadow-[4px_4px_0px_0px_#2346d5] transition-all"
          >
            <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
            <input
              name="q"
              className="bg-transparent border-none outline-none text-[14px] font-medium placeholder:text-outline-variant w-48 font-body"
              placeholder="Cari aset..."
              type="text"
            />
          </form>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="font-body font-bold text-[14px] text-on-background bg-white border-2 border-on-background px-5 py-2.5 rounded-full hover:bg-surface-variant transition-colors"
            >
              Masuk
            </Link>
          </div>

          {/* Burger seluler */}
          <button
            className="md:hidden p-2 text-on-background"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Menu seluler */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-on-background bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-bold text-[16px] text-on-background hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-surface-variant">
            <Link
              href="/login"
              className="flex-1 text-center font-body font-bold text-[14px] text-on-background bg-white border-2 border-on-background px-4 py-2.5 rounded-full"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
