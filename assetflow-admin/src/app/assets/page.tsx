"use client";
import { 
  MoreVertical, 
  Search, 
  Plus, 
  ExternalLink,
  Edit2,
  Trash2,
  Filter
} from "lucide-react";
import Link from "next/link";

const assets = [
  { id: "1", title: "Glassmorphism UI Kit", category: "UI Kit", price: "$29", sales: 124, status: "Aktif", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", title: "Futuristic 3D Character", category: "3D Model", price: "$45", sales: 86, status: "Aktif", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" },
  { id: "3", title: "Abstract Gradient Pack", category: "Seni Digital", price: "$12", sales: 245, status: "Draft", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" },
  { id: "4", title: "Neo-Brutalism Template", category: "Web Template", price: "$59", sales: 42, status: "Aktif", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop" },
  { id: "5", title: "Claymation Icons", category: "Ikon", price: "$15", sales: 167, status: "Aktif", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
];

export default function AssetsPage() {
  return (
    <div className="p-12 space-y-12 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-headline font-black text-5xl text-on-background tracking-tight">Koleksi Aset</h1>
          <p className="text-outline font-bold mt-2 text-lg">Kelola dan pantau semua aset digital yang terdaftar.</p>
        </div>
        <Link 
          href="/assets/add"
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-base flex items-center gap-3 border-2 border-on-background bento-shadow hover:scale-105 transition-all"
        >
          <Plus size={24} strokeWidth={3} /> Tambah Aset Baru
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-background" size={20} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Cari aset berdasarkan judul atau ID..."
            className="w-full bg-white border-4 border-on-background rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none bento-shadow-sm focus:bg-primary/5 transition-all"
          />
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white border-4 border-on-background rounded-2xl font-black text-sm text-on-background bento-shadow-sm hover:bg-primary/5 transition-all">
          <Filter size={20} strokeWidth={2.5} /> Saring Data
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border-4 border-on-background rounded-[2.5rem] overflow-hidden bento-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-on-background bg-primary/5">
                <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Detail Aset</th>
                <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Harga</th>
                <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Penjualan</th>
                <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest text-right">Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-on-background/10">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-on-background flex-shrink-0 bento-shadow-sm">
                        <img src={asset.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-base font-black text-on-background leading-tight">{asset.title}</p>
                        <p className="text-xs text-primary font-black mt-1 uppercase tracking-wider">ID: #{asset.id}928</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-on-background bg-secondary/10 px-3 py-1.5 rounded-lg border-2 border-on-background">
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-black text-on-background tracking-tight">{asset.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-on-background">{asset.sales}</span>
                      <span className="text-[10px] text-tertiary font-black bg-tertiary-container border border-on-background px-1.5 py-0.5 rounded-md">+12%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                      asset.status === "Aktif" 
                        ? "bg-tertiary-container text-tertiary border-on-background" 
                        : "bg-secondary/10 text-secondary border-on-background"
                    }`}>
                      <span className={`w-2 h-2 rounded-full border border-on-background ${asset.status === "Aktif" ? "bg-tertiary" : "bg-secondary"}`} />
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-3 text-on-background border-2 border-transparent hover:border-on-background hover:bg-primary/10 rounded-xl transition-all" title="Edit">
                        <Edit2 size={20} strokeWidth={2.5} />
                      </button>
                      <button className="p-3 text-on-background border-2 border-transparent hover:border-on-background hover:bg-secondary/10 rounded-xl transition-all" title="Hapus">
                        <Trash2 size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t-4 border-on-background flex items-center justify-between bg-primary/5">
          <p className="text-sm text-outline font-black uppercase tracking-wider">Menampilkan 5 dari 1,284 aset</p>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 border-2 border-on-background rounded-xl text-xs font-black bg-white hover:bento-shadow-sm transition-all">Sebelumnya</button>
            <button className="px-6 py-2.5 border-2 border-on-background rounded-xl text-xs font-black bg-white hover:bento-shadow-sm transition-all">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}

