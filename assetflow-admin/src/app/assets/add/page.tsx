"use client";
import { useState } from "react";
import { createAsset } from "@/app/actions/asset";
import { Upload, X, Check, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AddAssetPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();
  
  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("UI Kit");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }
    setIsSubmitting(true);
    
    try {
      // 1. Upload to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      // 3. Create record in Database
      const result = await createAsset({
        title,
        category,
        price,
        description,
        imageUrl: publicUrl
      });
      
      if (result?.success) {
        setIsSuccess(true);
      } else {
        throw new Error(result?.error || "Gagal menyimpan ke database");
      }
    } catch (error: any) {
      console.error(error);
      alert("Gagal menambahkan aset: " + (error.message || "Terjadi kesalahan"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-12 text-center bg-background">
        <div className="w-24 h-24 bg-tertiary-container border-4 border-on-background rounded-4xl flex items-center justify-center text-tertiary mb-8 bento-shadow animate-bounce">
          <Check size={48} strokeWidth={4} />
        </div>
        <h1 className="font-headline font-black text-5xl mb-4 tracking-tight">Aset Berhasil Diunggah!</h1>
        <p className="text-outline font-bold max-w-md mb-12 text-lg">Aset Anda telah ditambahkan ke database utama dan akan segera muncul di galeri publik.</p>
        <div className="flex gap-6">
          <button 
            onClick={() => { setIsSuccess(false); setPreviewUrl(null); setSelectedFile(null); }}
            className="bg-primary text-white px-10 py-5 rounded-2xl font-black border-2 border-on-background bento-shadow hover:scale-105 transition-all"
          >
            Unggah Lagi
          </button>
          <Link href="/assets" className="bg-white border-4 border-on-background px-10 py-5 rounded-2xl font-black bento-shadow hover:scale-105 transition-all">
            Lihat Koleksi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 max-w-6xl mx-auto bg-background min-h-screen">
      <Link href="/assets" className="flex items-center gap-3 text-on-background hover:text-primary transition-all mb-8 font-black text-sm uppercase tracking-widest">
        <ArrowLeft size={18} strokeWidth={3} /> Kembali ke Daftar
      </Link>

      <h1 className="font-headline font-black text-5xl mb-12 tracking-tight">Tambah Aset Baru</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Upload Zone */}
        <div className="space-y-8">
          <div className="bg-white border-4 border-on-background p-8 rounded-[2.5rem] bento-shadow">
            <h2 className="font-headline font-black text-xl mb-6 tracking-tight uppercase">Pratinjau Gambar</h2>
            <div 
              className={`relative aspect-square rounded-4xl border-4 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${
                dragActive ? "border-primary bg-primary/5" : "border-on-background/20 hover:border-primary/50"
              }`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileChange}
                accept="image/*"
              />
              
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <>
                  <div className="p-6 bg-primary/5 border-2 border-on-background/10 rounded-full mb-4 text-primary">
                    <Upload size={40} strokeWidth={3} />
                  </div>
                  <p className="font-black text-base text-on-background">Klik atau tarik file ke sini</p>
                  <p className="text-xs font-bold text-outline mt-2 uppercase tracking-wider">JPG, PNG, WEBP (Maks. 10MB)</p>
                </>
              )}
            </div>
            {selectedFile && (
              <div className="mt-6 flex items-center justify-between p-4 bg-primary/5 rounded-2xl border-2 border-on-background">
                <span className="text-sm font-black truncate max-w-[220px]">{selectedFile.name}</span>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setSelectedFile(null); }}
                  className="text-secondary hover:bg-secondary/10 p-2 rounded-xl transition-all"
                >
                  <X size={20} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>

          <div className="bg-white border-4 border-on-background p-8 rounded-[2.5rem] bento-shadow">
            <h2 className="font-headline font-black text-xl mb-6 tracking-tight uppercase">File Sumber (ZIP)</h2>
            <div className="flex items-center gap-5 p-5 bg-white border-2 border-on-background rounded-2xl bento-shadow-sm">
              <div className="w-14 h-14 bg-primary/10 border-2 border-on-background text-primary rounded-xl flex items-center justify-center bento-shadow-sm">
                <Package size={28} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black tracking-tight leading-none mb-1">asset_source.zip</p>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Harap unggah file proyek lengkap.</p>
              </div>
              <button type="button" className="text-xs font-black text-primary border-b-2 border-primary pb-0.5">Pilih File</button>
            </div>
          </div>
        </div>

        {/* Right: Info Form */}
        <div className="space-y-8">
          <div className="bg-white border-4 border-on-background p-8 rounded-[2.5rem] space-y-8 bento-shadow">
            <h2 className="font-headline font-black text-xl mb-4 tracking-tight uppercase">Informasi Aset</h2>
            
            <div>
              <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-3">Judul Aset</label>
              <input 
                type="text" 
                placeholder="misal: Glassmorphism UI Kit"
                className="w-full bg-white border-4 border-on-background rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-primary/5 transition-all bento-shadow-sm"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-3">Kategori</label>
              <select 
                className="w-full bg-white border-4 border-on-background rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-primary/5 transition-all bento-shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>UI Kit</option>
                <option>3D Model</option>
                <option>Seni Digital</option>
                <option>Templat Website</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-3">Harga (IDR)</label>
              <div className="flex items-center bg-white border-4 border-on-background rounded-2xl px-6 bento-shadow-sm focus-within:bg-primary/5 transition-all">
                <span className="font-black text-on-background mr-3 text-lg">Rp</span>
                <input 
                  type="number" 
                  placeholder="450000"
                  className="w-full bg-transparent py-4 text-sm font-black outline-none"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-3">Deskripsi</label>
              <textarea 
                rows={4}
                placeholder="Berikan detail fitur dan isi aset ini..."
                className="w-full bg-white border-4 border-on-background rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-primary/5 transition-all resize-none bento-shadow-sm"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-6 rounded-4xl font-headline font-black text-xl transition-all border-4 border-on-background bento-shadow ${
              isSubmitting 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50" 
                : "bg-primary text-white hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "Sedang Mengirim..." : "Publikasikan Aset"}
          </button>
        </div>
      </form>
    </div>
  );
}

