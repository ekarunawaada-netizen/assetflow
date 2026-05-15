"use client";
import { useState, useEffect } from "react";
import { getApplications, updateApplicationStatus } from "@/app/actions/application";
import { Check, X, Search, Filter, Inbox } from "lucide-react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      const data = await getApplications();
      setApplications(data);
      setLoading(false);
    };
    fetchApps();
  }, []);

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    if (confirm(`Apakah Anda yakin ingin mengubah status menjadi ${status}?`)) {
      await updateApplicationStatus(id, status);
      const data = await getApplications();
      setApplications(data);
    }
  };

  return (
    <div className="p-12 space-y-12 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-headline font-black text-5xl text-on-background tracking-tight">Aplikasi Kreator</h1>
          <p className="text-outline font-bold mt-2 text-lg">Kelola pendaftaran kreator baru di AssetFlow.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-background" size={20} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama atau pesan..."
            className="w-full bg-white border-4 border-on-background rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none bento-shadow-sm focus:bg-primary/5 transition-all"
          />
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white border-4 border-on-background rounded-2xl font-black text-sm text-on-background bento-shadow-sm hover:bg-primary/5 transition-all">
          <Filter size={20} strokeWidth={2.5} /> Saring Data
        </button>
      </div>

      {/* Table / Empty State */}
      <div className="bg-white border-4 border-on-background rounded-[2.5rem] overflow-hidden bento-shadow">
        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-on-background bg-primary/5">
                  <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Pengguna</th>
                  <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Portfolio URL</th>
                  <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Pesan</th>
                  <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-xs font-black text-on-background uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-on-background/10">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-on-background shrink-0 bg-secondary/10 flex items-center justify-center font-bold text-lg">
                           {app.user?.avatar ? <img src={app.user.avatar} alt="" className="w-full h-full object-cover" /> : app.user?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-base font-black text-on-background leading-tight">{app.user?.name || "User"}</p>
                          <p className="text-xs text-primary font-black mt-1 uppercase tracking-wider">{new Date(app.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">
                        {app.portfolioUrl || "-"}
                      </a>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-on-background max-w-xs truncate" title={app.message}>{app.message || "-"}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                        app.status === "APPROVED" 
                          ? "bg-tertiary-container text-tertiary border-on-background" 
                          : app.status === "REJECTED" ? "bg-red-100 text-red-600 border-red-600" : "bg-secondary/10 text-secondary border-on-background"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {app.status === "PENDING" && (
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => handleUpdateStatus(app.id, "APPROVED")}
                            className="p-3 text-tertiary border-2 border-transparent hover:border-on-background hover:bg-tertiary/10 rounded-xl transition-all" 
                            title="Terima"
                          >
                            <Check size={20} strokeWidth={2.5} />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, "REJECTED")}
                            className="p-3 text-red-600 border-2 border-transparent hover:border-red-600 hover:bg-red-50 rounded-xl transition-all" 
                            title="Tolak"
                          >
                            <X size={20} strokeWidth={2.5} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary/5 border-4 border-dashed border-on-background/20 rounded-3xl flex items-center justify-center text-outline mb-6">
              <Inbox size={40} />
            </div>
            <h3 className="text-2xl font-black text-on-background mb-2">Belum Ada Aplikasi</h3>
            <p className="text-outline font-bold max-w-sm">Daftar pendaftaran kreator akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
