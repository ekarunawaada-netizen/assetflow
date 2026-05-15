"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  LayoutDashboard, 
  ImagePlus, 
  BarChart3, 
  Settings, 
  LogOut,
  Package,
  Inbox,
  ExternalLink
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Aset Saya", href: "/assets", icon: Package },
  { label: "Tambah Aset", href: "/assets/add", icon: ImagePlus },
  { label: "Aplikasi", href: "/applications", icon: Inbox },
  { label: "Analitik", href: "/analytics", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <aside className="w-72 bg-surface border-r-4 border-on-background h-screen sticky top-0 flex flex-col transition-all">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary border-2 border-on-background rounded-xl flex items-center justify-center bento-shadow-sm">
            <span className="text-white font-black text-sm">AF</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-black text-xl tracking-tight leading-none">AssetFlow</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-6 py-4 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-body font-black text-sm transition-all border-2 ${
                isActive 
                  ? "bg-primary text-white border-on-background bento-shadow-sm" 
                  : "text-on-background border-transparent hover:border-on-background hover:bg-white hover:bento-shadow-sm"
              }`}
            >
              <Icon size={20} strokeWidth={2.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t-4 border-on-background space-y-3">
        <a 
          href={process.env.NEXT_PUBLIC_MARKETPLACE_URL || "#"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-body font-black text-sm text-primary border-2 border-transparent hover:border-on-background hover:bg-primary/10 transition-all"
        >
          <ExternalLink size={20} strokeWidth={2.5} />
          Lihat Marketplace
        </a>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-body font-black text-sm text-secondary border-2 border-transparent hover:border-on-background hover:bg-secondary/10 transition-all"
        >
          <LogOut size={20} strokeWidth={2.5} />
          Keluar Sesi
        </button>
      </div>
    </aside>

  );
}
