"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('Profile')
          .select('role')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from('Profile')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setProfile(profile);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/explore", label: "Jelajah" },
    { href: "/creators", label: "Kreator" },
    { href: "/collections", label: "Koleksi" },
  ];

  if (profile?.role === 'ADMIN') {
    navLinks.push({ href: process.env.NEXT_PUBLIC_ADMIN_URL || "#", label: "Admin Panel" });
  }

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
            <svg className="w-5 h-5 text-outline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              name="q"
              className="bg-transparent border-none outline-none text-[14px] font-medium placeholder:text-outline-variant w-48 font-body"
              placeholder="Cari aset..."
              type="text"
            />
          </form>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="font-body font-black text-[13px] text-red-500 bg-red-50 border-2 border-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition-all flex items-center gap-2"
                >
                  <LogOut size={16} /> Keluar
                </button>
                <Link
                  href="/profile"
                  className="w-10 h-10 bg-primary/10 border-2 border-on-background rounded-full flex items-center justify-center hover:bg-primary/20 transition-all overflow-hidden"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-primary" />
                  )}
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="font-body font-bold text-[14px] text-on-background bg-white border-2 border-on-background px-5 py-2.5 rounded-full hover:bg-surface-variant transition-colors"
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Burger seluler */}
          <button
            className="md:hidden p-2 text-on-background"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
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
          <div className="flex flex-col gap-3 pt-2 border-t border-surface-variant">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-3 bg-surface border-2 border-on-background rounded-2xl font-black text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={20} /> Profil Saya
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-center font-body font-black text-[14px] text-red-500 bg-red-50 border-2 border-red-500 px-4 py-3 rounded-2xl flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> Keluar
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex-1 text-center font-body font-bold text-[14px] text-on-background bg-white border-2 border-on-background px-4 py-2.5 rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
