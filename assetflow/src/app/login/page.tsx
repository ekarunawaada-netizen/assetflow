"use client";

import { useState } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle, Github, Globe, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [view, setView] = useState<"login" | "signup" | "forgot" | "otp">("login");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message === "Invalid login credentials" ? "Email atau kata sandi salah." : error.message);
      setIsLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Pendaftaran berhasil! Silakan cek email kamu untuk konfirmasi.");
      setView("login");
    }
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'twitter') => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Kode OTP telah dikirim ke email kamu.");
      setView("otp");
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'recovery',
    });

    if (verifyError) {
      setErrorMsg("Kode OTP salah atau kadaluarsa.");
      setIsLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setErrorMsg(updateError.message);
    } else {
      alert("Sandi berhasil diperbarui!");
      setView("login");
      setSuccessMsg("Sandi diperbarui. Silakan login.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6 bg-white px-6 py-3 rounded-full border-2 border-black bento-shadow-sm">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rotate-45" />
            </div>
            <span className="font-headline font-black text-xl">AssetFlow</span>
          </div>
          <h1 className="font-headline font-black text-4xl mb-2 tracking-tight">
            {view === "login" ? "Selamat Datang" : view === "signup" ? "Buat Akun Baru" : "Pemulihan Akun"}
          </h1>
          <p className="text-gray-500 font-bold">
            {view === "login" ? "Masuk untuk mengakses library aset kamu." : "Mulai perjalanan kreatif kamu di sini."}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border-4 border-black rounded-[2.5rem] bento-shadow p-10 relative overflow-hidden">
          
          {/* Messages */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-2xl flex gap-3 items-center animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle className="text-red-500 shrink-0" size={20} />
              <p className="text-sm font-bold text-red-600">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-2xl flex gap-3 items-center animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <ArrowRight className="text-white -rotate-45" size={12} strokeWidth={4} />
              </div>
              <p className="text-sm font-bold text-green-600">{successMsg}</p>
            </div>
          )}

          {view === "login" || view === "signup" ? (
            <div className="space-y-6">
              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-3 py-4 border-2 border-black rounded-2xl font-black hover:bg-gray-50 transition-all active:scale-95 bento-shadow-sm"
                >
                  <Globe size={20} />
                  Google
                </button>
                <button 
                  onClick={() => handleSocialLogin('twitter')}
                  className="flex items-center justify-center gap-3 py-4 border-2 border-black rounded-2xl font-black hover:bg-gray-50 transition-all active:scale-95 bento-shadow-sm"
                >
                  <User size={20} />
                  Twitter
                </button>
              </div>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <span className="relative px-4 bg-white text-xs font-black text-gray-400 uppercase tracking-widest">Atau via Email</span>
              </div>

              <form onSubmit={view === "login" ? handleLogin : handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="email" 
                      required
                      placeholder="kamu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-4 pl-12 pr-4 border-2 border-black rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/20 transition-all bento-shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Kata Sandi</label>
                    {view === "login" && (
                      <button type="button" onClick={() => setView("forgot")} className="text-xs font-black text-primary hover:underline">Lupa Sandi?</button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-4 pl-12 pr-12 border-2 border-black rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/20 transition-all bento-shadow-sm"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-5 bg-black text-white rounded-2xl font-headline font-black text-lg border-2 border-black bento-shadow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isLoading ? "Memproses..." : view === "login" ? "Masuk Sekarang" : "Daftar Akun"}
                </button>
              </form>

              <p className="text-center text-sm font-bold text-gray-500">
                {view === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button 
                  onClick={() => setView(view === "login" ? "signup" : "login")}
                  className="text-black underline font-black"
                >
                  {view === "login" ? "Daftar Gratis" : "Masuk di Sini"}
                </button>
              </p>
            </div>
          ) : view === "forgot" ? (
            <div className="space-y-6">
               <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Pemulihan</label>
                <input 
                  type="email" 
                  required
                  placeholder="admin@assetflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 px-6 border-2 border-black rounded-2xl font-bold outline-none bento-shadow-sm"
                />
              </div>
              <button 
                onClick={handleResetPassword}
                className="w-full py-5 bg-black text-white rounded-2xl font-black bento-shadow hover:scale-105 transition-all"
              >
                Kirim Kode OTP
              </button>
              <button onClick={() => setView("login")} className="w-full text-xs font-black text-gray-400 uppercase tracking-widest">Kembali</button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2 text-center">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Masukkan Kode OTP</label>
                <input 
                  type="text" 
                  required
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-6 text-center text-3xl font-black tracking-[0.5em] border-2 border-black rounded-2xl bento-shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Sandi Baru</label>
                <input 
                  type="password" 
                  required
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-4 px-6 border-2 border-black rounded-2xl font-bold outline-none bento-shadow-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-black text-white rounded-2xl font-black bento-shadow hover:scale-105 transition-all"
              >
                Ganti Sandi & Masuk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
