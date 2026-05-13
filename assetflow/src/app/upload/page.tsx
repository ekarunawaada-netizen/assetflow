"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

const categories = ["Kit UI", "Model 3D", "Templat", "Set Ikon", "Seni Digital", "Motion / Animasi", "Font", "Lainnya"];
const licenses = [
  { id: "standard", label: "Lisensi Standar", desc: "Untuk penggunaan pribadi dan komersial. Bukan untuk dijual kembali.", price: "Gratis" },
  { id: "extended", label: "Lisensi Diperluas", desc: "Termasuk hak penjualan kembali dan penyiaran.", price: "+$50" },
];

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedLicense, setSelectedLicense] = useState("standard");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file.name);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="max-w-[1280px] mx-auto px-6 py-32 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-tertiary-container border-2 border-on-background flex items-center justify-center mb-8 shadow-[6px_6px_0px_0px_#191c1d]">
            <span className="material-symbols-outlined text-tertiary text-[48px]">check_circle</span>
          </div>
          <h1 className="font-headline text-4xl font-black text-on-background mb-4">Aset Berhasil Dikirim!</h1>
          <p className="font-body text-[18px] text-on-surface-variant max-w-md mb-10">
            Aset Anda sedang ditinjau. Kami akan memberi tahu Anda dalam waktu 24 jam setelah aktif di marketplace.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { setSubmitted(false); setStep(1); setSelectedFile(null); }}
              className="font-headline font-bold text-[16px] bg-primary text-white px-8 py-4 rounded-xl border-2 border-on-background bento-shadow"
            >
              Unggah Lagi
            </button>
            <Link href="/explore" className="font-headline font-bold text-[16px] bg-white text-on-background px-8 py-4 rounded-xl border-2 border-on-background hover:bg-surface-variant transition-colors">
              Telusuri Marketplace
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-black text-on-background tracking-tight">Unggah Aset Anda</h1>
          <p className="font-body text-[16px] text-on-surface-variant mt-2">Bagikan karya Anda dengan 10rb+ pembeli kreatif di AssetFlow.</p>
        </div>

        {/* Langkah Progres */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto hide-scrollbar pb-2">
          {[
            { n: 1, label: "Detail Aset" },
            { n: 2, label: "Harga & Lisensi" },
            { n: 3, label: "Tinjau & Kirim" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-4 shrink-0">
              <div className={`flex items-center gap-3 ${step >= s.n ? "text-on-background" : "text-outline-variant"}`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-headline font-black text-[16px] transition-all ${
                  step > s.n ? "bg-tertiary border-on-background text-white" :
                  step === s.n ? "bg-primary border-on-background text-white" :
                  "bg-white border-outline-variant text-outline-variant"
                }`}>
                  {step > s.n ? <span className="material-symbols-outlined text-[18px]">check</span> : s.n}
                </div>
                <span className={`font-headline font-bold text-[14px] whitespace-nowrap ${step >= s.n ? "text-on-background" : "text-outline-variant"}`}>{s.label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 min-w-[32px] ${step > s.n ? "bg-on-background" : "bg-surface-variant"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Utama */}
          <div className="lg:col-span-2 space-y-6">

            {/* Langkah 1: Detail Aset */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Unggah File */}
                <div className="bg-white border-2 border-on-background rounded-2xl p-6">
                  <h2 className="font-headline font-bold text-[18px] text-on-background mb-4">Unggah File</h2>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                      dragActive ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary hover:bg-background"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
                    {selectedFile ? (
                      <div>
                        <span className="material-symbols-outlined text-[48px] text-tertiary mb-3 block">check_circle</span>
                        <p className="font-headline font-bold text-[16px] text-on-background">{selectedFile}</p>
                        <p className="font-body text-[13px] text-outline mt-1">Klik untuk mengubah file</p>
                      </div>
                    ) : (
                      <div>
                        <span className="material-symbols-outlined text-[48px] text-outline-variant mb-3 block">upload_file</span>
                        <p className="font-headline font-bold text-[16px] text-on-background">Seret & lepas file Anda di sini</p>
                        <p className="font-body text-[14px] text-outline mt-2">atau <span className="text-primary font-bold">telusuri</span> untuk mengunggah</p>
                        <p className="font-body text-[12px] text-outline-variant mt-3">Mendukung: ZIP, PSD, Figma, Blender, SVG, PNG hingga 500MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Aset */}
                <div className="bg-white border-2 border-on-background rounded-2xl p-6 space-y-5">
                  <h2 className="font-headline font-bold text-[18px] text-on-background">Informasi Aset</h2>

                  <div>
                    <label className="font-body font-bold text-[13px] text-on-background block mb-2">Judul Aset *</label>
                    <input type="text" placeholder="misal: Kit UI Dasbor Minimalis" className="w-full border-2 border-on-background rounded-xl px-4 py-3 font-body text-[14px] outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#2346d5] transition-all" />
                  </div>

                  <div>
                    <label className="font-body font-bold text-[13px] text-on-background block mb-2">Deskripsi *</label>
                    <textarea rows={4} placeholder="Jelaskan aset Anda secara detail — apa yang disertakan, cara penggunaan, kompatibilitas..." className="w-full border-2 border-on-background rounded-xl px-4 py-3 font-body text-[14px] outline-none focus:border-primary resize-none transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body font-bold text-[13px] text-on-background block mb-2">Kategori *</label>
                      <select className="w-full border-2 border-on-background rounded-xl px-4 py-3 font-body text-[14px] outline-none bg-white cursor-pointer">
                        <option value="">Pilih kategori</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="font-body font-bold text-[13px] text-on-background block mb-2">Tag</label>
                      <input type="text" placeholder="misal: dark, minimal, react" className="w-full border-2 border-on-background rounded-xl px-4 py-3 font-body text-[14px] outline-none focus:border-primary transition-all" />
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full font-headline font-bold text-[16px] bg-primary text-white py-4 rounded-xl border-2 border-on-background bento-shadow">
                  Lanjut ke Harga →
                </button>
              </div>
            )}

            {/* Langkah 2: Harga & Lisensi */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-white border-2 border-on-background rounded-2xl p-6 space-y-5">
                  <h2 className="font-headline font-bold text-[18px] text-on-background">Tetapkan Harga Anda</h2>

                  <div>
                    <label className="font-body font-bold text-[13px] text-on-background block mb-2">Harga (USD) *</label>
                    <div className="flex items-center border-2 border-on-background rounded-xl overflow-hidden focus-within:shadow-[4px_4px_0px_0px_#2346d5] transition-all">
                      <span className="font-headline font-bold text-[18px] px-4 py-3 bg-background border-r-2 border-on-background">$</span>
                      <input type="number" placeholder="29" min="1" className="flex-1 px-4 py-3 font-headline font-bold text-[24px] outline-none" />
                    </div>
                    <p className="font-body text-[12px] text-outline mt-2">Rentang yang disarankan: $9 – $149. Anda menyimpan 70–80% dari setiap penjualan.</p>
                  </div>

                  <div>
                    <label className="font-body font-bold text-[13px] text-on-background block mb-3">Tipe Lisensi *</label>
                    <div className="space-y-3">
                      {licenses.map((lic) => (
                        <label key={lic.id} className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedLicense === lic.id ? "border-primary bg-primary/5" : "border-surface-variant hover:border-outline-variant"}`}>
                          <input type="radio" name="license" value={lic.id} checked={selectedLicense === lic.id} onChange={() => setSelectedLicense(lic.id)} className="mt-1 accent-primary" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-headline font-bold text-[15px] text-on-background">{lic.label}</span>
                              <span className="font-body font-bold text-[13px] text-primary">{lic.price}</span>
                            </div>
                            <p className="font-body text-[13px] text-outline mt-1">{lic.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 font-headline font-bold text-[16px] bg-white text-on-background py-4 rounded-xl border-2 border-on-background hover:bg-surface-variant transition-colors">
                    ← Kembali
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 font-headline font-bold text-[16px] bg-primary text-white py-4 rounded-xl border-2 border-on-background bento-shadow">
                    Tinjau & Kirim →
                  </button>
                </div>
              </div>
            )}

            {/* Langkah 3: Tinjau & Kirim */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white border-2 border-on-background rounded-2xl p-6">
                  <h2 className="font-headline font-bold text-[18px] text-on-background mb-6">Tinjau Listing Anda</h2>
                  <div className="space-y-4">
                    {[
                      { label: "File", value: selectedFile || "Tidak ada file" },
                      { label: "Judul", value: "Kit UI Dasbor Minimalis (contoh)" },
                      { label: "Kategori", value: "Kit UI" },
                      { label: "Harga", value: "$29" },
                      { label: "Lisensi", value: selectedLicense === "standard" ? "Lisensi Standar" : "Lisensi Diperluas" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-3 border-b border-surface-variant last:border-0">
                        <span className="font-body font-bold text-[13px] text-outline">{item.label}</span>
                        <span className="font-body font-bold text-[14px] text-on-background">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-tertiary-container border-2 border-on-background rounded-2xl p-5 flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">info</span>
                  <p className="font-body text-[14px] text-on-tertiary-container">
                    Dengan mengirimkan, Anda mengonfirmasi bahwa Anda memiliki hak atas konten ini dan menyetujui <a href="#" className="font-bold underline">Ketentuan Layanan</a> dan <a href="#" className="font-bold underline">Kebijakan Kreator</a> kami.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 font-headline font-bold text-[16px] bg-white text-on-background py-4 rounded-xl border-2 border-on-background hover:bg-surface-variant transition-colors">
                    ← Kembali
                  </button>
                  <button onClick={() => setSubmitted(true)} className="flex-1 font-headline font-bold text-[16px] bg-tertiary text-white py-4 rounded-xl border-2 border-on-background bento-shadow">
                    Kirim Aset ✓
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Tips */}
          <div className="space-y-6">
            <div className="bg-on-background text-white border-2 border-on-background rounded-2xl p-6 bento-shadow">
              <h3 className="font-headline font-bold text-[18px] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">tips_and_updates</span>
                Tips Kreator
              </h3>
              <ul className="space-y-3">
                {[
                  "Gunakan gambar pratinjau resolusi tinggi",
                  "Tulis deskripsi detail dengan contoh penggunaan",
                  "Sertakan video demo atau pratinjau",
                  "Tambahkan tag yang relevan untuk pencarian",
                  "Tetapkan harga bersaing — cek aset serupa",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2 font-body text-[13px] text-outline-variant">
                    <span className="text-primary-container mt-0.5 shrink-0">✦</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-2 border-on-background rounded-2xl p-6">
              <h3 className="font-headline font-bold text-[16px] text-on-background mb-3">Kalkulator Pendapatan</h3>
              <div className="space-y-2">
                {[
                  { price: "$29", monthly: "100 penjualan", earn: "$2.030/bln" },
                  { price: "$59", monthly: "50 penjualan", earn: "$2.065/bln" },
                  { price: "$99", monthly: "20 penjualan", earn: "$1.386/bln" },
                ].map((r) => (
                  <div key={r.price} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div>
                      <span className="font-headline font-bold text-[14px] text-on-background">{r.price}</span>
                      <span className="font-body text-[12px] text-outline ml-2">× {r.monthly}</span>
                    </div>
                    <span className="font-headline font-bold text-[14px] text-tertiary">{r.earn}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] text-outline mt-3">Berdasarkan 70% bagi hasil kreator</p>
            </div>

            <Link href="/how-it-works" className="block border-2 border-on-background rounded-2xl p-5 bg-primary/5 hover:bg-primary/10 transition-colors text-center">
              <span className="material-symbols-outlined text-primary text-[28px] block mb-2">help</span>
              <p className="font-headline font-bold text-[14px] text-primary">Butuh bantuan? Baca Panduan Kreator kami</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
