"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname === "/login") {
    return null; 
  }
  
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b-4 border-on-background flex items-center justify-between px-6 z-40 bento-shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary border-2 border-on-background rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">AF</span>
          </div>
          <span className="font-headline font-black text-lg">Admin</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border-2 border-on-background rounded-xl active:bg-surface-variant transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <AdminSidebar />
      </div>
    </>
  );
}
