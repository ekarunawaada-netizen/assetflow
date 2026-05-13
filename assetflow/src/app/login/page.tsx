"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login
    router.push("/");
  };

  const socialLogins = [
    {
      name: "Google",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      color: "hover:bg-[#4285F4]/10 hover:border-[#4285F4] hover:text-[#4285F4]",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]",
    },
    {
      name: "X",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239h-2.19L17.607 20.65z" />
        </svg>
      ),
      color: "hover:bg-black/10 hover:border-black hover:text-black",
    },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Elemen Latar Belakang Dinamis */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse" />

      <div className="mb-10 text-center relative z-10">
        <Link href="/" className="font-headline text-[32px] font-black text-on-background tracking-tighter hover:text-primary transition-colors flex items-center gap-2">
          <div className="w-10 h-10 bg-on-background rounded-xl flex items-center justify-center rotate-3 shadow-[4px_4px_0px_0px_#2346d5]">
            <span className="material-symbols-outlined text-white text-[24px]">fluid_meditation</span>
          </div>
          AssetFlow
        </Link>
      </div>

      <div className="w-full max-w-[460px] bg-white border-2 border-on-background rounded-[32px] p-8 md:p-10 bento-shadow relative z-10">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-black text-on-background mb-2">
            {isLogin ? "Selamat Datang Kembali" : "Buat Akun"}
          </h1>
          <p className="font-body text-[15px] text-on-surface-variant">
            {isLogin 
              ? "Masuk untuk mengakses dasbor dan aset premium Anda." 
              : "Bergabunglah dengan marketplace berisi 10.000+ kreator kelas dunia."}
          </p>
        </div>

        {/* Login Sosial */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {socialLogins.map((social) => (
            <button
              key={social.name}
              className={`flex flex-col items-center justify-center gap-2 py-3.5 border-2 border-on-background rounded-2xl transition-all hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_currentColor] active:translate-y-0 active:shadow-none ${social.color}`}
              title={`Masuk dengan ${social.name}`}
            >
              {social.icon}
              <span className="font-headline font-bold text-[11px] uppercase tracking-wider">{social.name}</span>
            </button>
          ))}
        </div>

        <div className="relative flex items-center gap-4 mb-8">
          <div className="flex-1 h-0.5 bg-outline-variant" />
          <span className="font-body text-[12px] font-bold text-outline uppercase tracking-widest">atau email</span>
          <div className="flex-1 h-0.5 bg-outline-variant" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="font-body font-bold text-[13px] text-on-background block mb-2 ml-1">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="misal: Alex River" 
                required
                className="w-full border-2 border-on-background rounded-2xl px-5 py-3.5 font-body text-[15px] outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#2346d5] transition-all bg-background/30"
              />
            </div>
          )}
          <div>
            <label className="font-body font-bold text-[13px] text-on-background block mb-2 ml-1">Alamat Email</label>
            <input 
              type="email" 
              placeholder="alex@example.com" 
              required
              className="w-full border-2 border-on-background rounded-2xl px-5 py-3.5 font-body text-[15px] outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#2346d5] transition-all bg-background/30"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="font-body font-bold text-[13px] text-on-background">Kata Sandi</label>
              {isLogin && (
                <button type="button" className="text-[12px] font-bold text-primary hover:underline">Lupa kata sandi?</button>
              )}
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              className="w-full border-2 border-on-background rounded-2xl px-5 py-3.5 font-body text-[15px] outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#2346d5] transition-all bg-background/30"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white font-headline font-bold text-[16px] py-4 rounded-2xl border-2 border-on-background bento-shadow active:translate-y-1 active:shadow-none transition-all mt-4"
          >
            {isLogin ? "Masuk ke AssetFlow" : "Buat Akun Saya"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t-2 border-outline-variant text-center">
          <p className="font-body text-[15px] text-on-surface-variant">
            {isLogin ? "Belum punya akun?" : "Sudah menjadi bagian dari komunitas?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-primary hover:underline"
            >
              {isLogin ? "Buat akun sekarang" : "Masuk di sini"}
            </button>
          </p>
        </div>
      </div>
      
      {/* Info Footer */}
      <div className="mt-8 text-center relative z-10">
        <p className="font-body text-[12px] text-outline">
          © 2025 AssetFlow Inc. <Link href="/how-it-works" className="underline hover:text-on-background ml-2">Cara kerja</Link>
        </p>
      </div>
    </main>
  );
}
