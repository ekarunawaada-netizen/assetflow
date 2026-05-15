"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { submitApplication } from "./actions";
import Link from "next/link";

export default function RegisterCreatorPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitApplication(formData);
    
    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="max-w-[1280px] mx-auto px-6 py-32 flex flex-col items-center text-center min-h-[70vh]">
          <div className="w-24 h-24 rounded-full bg-tertiary-container border-4 border-on-background flex items-center justify-center mb-8 shadow-[6px_6px_0px_0px_#191c1d]">
            <span className="material-symbols-outlined text-tertiary text-[48px]">check_circle</span>
          </div>
          <h1 className="font-headline text-4xl font-black text-on-background mb-4">Aplikasi Berhasil Dikirim!</h1>
          <p className="font-body text-[18px] text-on-surface-variant max-w-md mb-10">
            Terima kasih telah mendaftar. Tim kami akan meninjau portofolio Anda dan memberikan pembaruan dalam 1-2 hari kerja.
          </p>
          <Link href="/" className="font-headline font-bold text-[16px] bg-primary text-white px-8 py-4 rounded-xl border-2 border-on-background bento-shadow hover:bg-primary/90 transition-colors">
            Kembali ke Beranda
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 py-12 min-h-screen">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-headline text-4xl font-black text-on-background tracking-tight">Daftar Jadi Kreator</h1>
            <p className="font-body text-[16px] text-on-surface-variant mt-2">Bergabunglah dengan komunitas eksklusif kami dan mulai jual karya Anda ke ribuan pengguna.</p>
          </div>

          {/* Form */}
          <div className="bg-white border-4 border-on-background rounded-3xl p-8 bento-shadow">
            {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-xl mb-6 font-body font-bold text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-body font-bold text-[14px] text-on-background block mb-2">Tautan Portofolio *</label>
                <input 
                  type="url" 
                  name="portfolioUrl"
                  required
                  placeholder="https://dribbble.com/username, https://behance.net/username..." 
                  className="w-full bg-background border-4 border-on-background rounded-xl px-4 py-3 font-body text-[15px] font-bold outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#2346d5] transition-all" 
                />
                <p className="font-body text-[12px] text-outline mt-2">Berikan tautan ke portofolio online Anda agar kami dapat meninjau karya Anda.</p>
              </div>

              <div>
                <label className="font-body font-bold text-[14px] text-on-background block mb-2">Pesan / Motivasi (Opsional)</label>
                <textarea 
                  name="message"
                  rows={4} 
                  placeholder="Ceritakan sedikit tentang Anda dan aset apa yang ingin Anda jual di AssetFlow..." 
                  className="w-full bg-background border-4 border-on-background rounded-xl px-4 py-3 font-body text-[15px] outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#2346d5] resize-none transition-all" 
                />
              </div>

              <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 flex gap-4 mt-6">
                <span className="material-symbols-outlined text-primary mt-1">info</span>
                <div>
                  <h4 className="font-headline font-bold text-[14px] text-on-background mb-1">Proses Peninjauan</h4>
                  <p className="font-body text-[13px] text-on-surface-variant">
                    Untuk menjaga kualitas marketplace, setiap kreator baru harus melalui proses persetujuan. Anda akan diberi tahu setelah aplikasi Anda ditinjau.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full font-headline font-black text-[16px] bg-primary text-white py-4 rounded-xl border-4 border-on-background bento-shadow-sm hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 transition-all"
              >
                {loading ? "Mengirim..." : "Kirim Aplikasi"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
