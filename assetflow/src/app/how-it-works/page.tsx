import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Kerja",
  description: "Pelajari cara kerja AssetFlow — dari pencarian hingga pembelian, dan dari unggahan hingga penghasilan.",
};

const buyerSteps = [
  {
    icon: "search",
    step: "01",
    title: "Cari & Temukan",
    desc: "Jelajahi ribuan aset digital premium menggunakan filter cerdas, kategori, dan koleksi terkurasi.",
  },
  {
    icon: "shopping_cart",
    step: "02",
    title: "Tambah ke Keranjang",
    desc: "Pilih aset yang Anda sukai, tinjau detail lisensi, dan tambahkan ke keranjang dengan satu klik.",
  },
  {
    icon: "payment",
    step: "03",
    title: "Pembelian Aman",
    desc: "Bayar dengan aman menggunakan kartu kredit, PayPal, atau kripto. Semua transaksi dienkripsi.",
  },
  {
    icon: "download",
    step: "04",
    title: "Unduhan Instan",
    desc: "Akses aset Anda segera setelah pembelian. Unduh kapan saja dari perpustakaan pribadi Anda.",
  },
];

const creatorSteps = [
  {
    icon: "person_add",
    step: "01",
    title: "Buat Profil Anda",
    desc: "Daftar, siapkan profil kreator Anda, dan tunjukkan portofolio Anda kepada 10rb+ pembeli.",
  },
  {
    icon: "upload_file",
    step: "02",
    title: "Unggah Aset Anda",
    desc: "Unggah file, tambahkan metadata, tetapkan harga, dan pilih lisensi — semua dalam hitungan menit.",
  },
  {
    icon: "storefront",
    step: "03",
    title: "Jadi Unggulan",
    desc: "Aset berkualitas dikurasi dan ditampilkan dalam koleksi, mendorong penjualan organik.",
  },
  {
    icon: "attach_money",
    step: "04",
    title: "Dapatkan Penghasilan",
    desc: "Simpan hingga 80% dari setiap penjualan. Terima pembayaran mingguan ke rekening atau kripto.",
  },
];

const faqs = [
  {
    q: "Format file apa saja yang didukung?",
    a: "Kami mendukung semua format kreatif utama: PNG, SVG, PSD, Figma, Sketch, Blender (.blend), FBX, GLTF, After Effects, dan lainnya.",
  },
  {
    q: "Berapa bagi hasil untuk kreator?",
    a: "Kreator mendapatkan 70-80% dari setiap penjualan tergantung pada tingkatan mereka. Kreator top mendapatkan bagi hasil lebih tinggi.",
  },
  {
    q: "Dapatkah saya menggunakan aset yang dibeli secara komersial?",
    a: "Ya! Semua aset di AssetFlow dilengkapi dengan lisensi komersial standar. Lisensi tambahan tersedia untuk penyiaran dan penjualan kembali.",
  },
  {
    q: "Bagaimana cara kerja pengembalian dana?",
    a: "Karena sifat digital dari aset, pengembalian dana ditangani berdasarkan kasus per kasus. Jika aset tidak sesuai deskripsi, kami akan memperbaikinya.",
  },
  {
    q: "Apakah informasi pembayaran saya aman?",
    a: "Tentu saja. Kami menggunakan Stripe untuk pemrosesan pembayaran, yang memiliki sertifikasi PCI-DSS Level 1 — standar keamanan pembayaran tertinggi.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b-2 border-on-background bg-white px-6 py-20">
          <div className="max-w-[1280px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-on-background text-primary font-bold text-[12px] uppercase tracking-wide bento-shadow-sm mb-8">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Sederhana & Transparan
            </div>
            <h1 className="font-headline text-5xl lg:text-6xl font-black text-on-background tracking-tight mb-6">
              Cara Kerja AssetFlow
            </h1>
            <p className="font-body text-[20px] text-on-surface-variant max-w-2xl mx-auto">
              Baik Anda membeli aset kreatif atau menjual karya Anda, kami telah membuat prosesnya mulus, aman, dan bermanfaat.
            </p>
          </div>
        </section>

        {/* Untuk Pembeli */}
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary border-2 border-on-background flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[24px]">shopping_bag</span>
            </div>
            <div>
              <h2 className="font-headline text-3xl font-black text-on-background tracking-tight">Untuk Pembeli</h2>
              <p className="font-body text-[14px] text-outline">Dapatkan aset kreatif terbaik dalam 4 langkah mudah</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyerSteps.map((step, i) => (
              <article
                key={step.step}
                className="bg-white border-2 border-on-background rounded-2xl p-6 bento-shadow relative group"
              >
                <div className="absolute top-4 right-4 font-headline font-black text-[48px] text-background leading-none select-none overflow-hidden h-12">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-[24px]">{step.icon}</span>
                </div>
                <h3 className="font-headline text-[18px] font-bold text-on-background mb-2">{step.title}</h3>
                <p className="font-body text-[14px] text-on-surface-variant leading-relaxed">{step.desc}</p>
                {i < buyerSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-on-background border-2 border-white flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Pemisah */}
        <div className="border-y-2 border-on-background bg-background py-8 px-6 overflow-hidden">
          <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-6">
            <div className="flex-1 h-0.5 bg-on-background/10" />
            <span className="font-headline font-black text-[20px] text-on-background whitespace-nowrap">ATAU JADI KREATOR</span>
            <div className="flex-1 h-0.5 bg-on-background/10" />
          </div>
        </div>

        {/* Untuk Kreator */}
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-secondary border-2 border-on-background flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[24px]">brush</span>
            </div>
            <div>
              <h2 className="font-headline text-3xl font-black text-on-background tracking-tight">Untuk Kreator</h2>
              <p className="font-body text-[14px] text-outline">Gabung 100% Gratis & mulai hasilkan uang dari karya Anda</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorSteps.map((step, i) => (
              <article
                key={step.step}
                className="bg-white border-2 border-on-background rounded-2xl p-6 bento-shadow relative group"
              >
                <div className="absolute top-4 right-4 font-headline font-black text-[48px] text-background leading-none select-none overflow-hidden h-12">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:border-secondary transition-colors">
                  <span className="material-symbols-outlined text-secondary group-hover:text-white transition-colors text-[24px]">{step.icon}</span>
                </div>
                <h3 className="font-headline text-[18px] font-bold text-on-background mb-2">{step.title}</h3>
                <p className="font-body text-[14px] text-on-surface-variant leading-relaxed">{step.desc}</p>
                {i < creatorSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-on-background border-2 border-white flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>



        {/* FAQ */}
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <h2 className="font-headline text-4xl font-black text-on-background mb-12 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border-2 border-on-background rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-headline font-bold text-[18px] text-on-background list-none">
                  {faq.q}
                  <span className="material-symbols-outlined transition-transform group-open:rotate-45 text-primary">add</span>
                </summary>
                <div className="px-6 pb-5 font-body text-[15px] text-on-surface-variant leading-relaxed border-t border-surface-variant pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Akhir */}
        <section className="mx-6 mb-16 border-2 border-on-background rounded-3xl bg-primary px-12 py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-on-background/20 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-4xl font-black text-white mb-4">Siap untuk memulai?</h2>
            <p className="font-body text-[18px] text-white/80 mb-8 max-w-lg mx-auto">
              Bergabunglah dengan ribuan kreator dan pembeli di marketplace aset digital yang berkembang paling cepat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore" className="font-headline font-bold text-[16px] bg-white text-primary px-8 py-4 rounded-xl border-2 border-white bento-shadow-sm">
                Mulai Menjelajah
              </Link>
              <Link href={(process.env.NEXT_PUBLIC_ADMIN_URL || "") + "/login"} className="font-headline font-bold text-[16px] bg-transparent text-white px-8 py-4 rounded-xl border-2 border-white/50 hover:border-white transition-colors">
                Jadi Kreator
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
