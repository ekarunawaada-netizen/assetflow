"use client";

import { useState } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // New States for OTP Flow
  const [view, setView] = useState<"login" | "forgot" | "otp">("login");
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
      let message = "Kombinasi email atau kata sandi salah.";
      if (error.message.includes("Email not confirmed")) {
        message = "Email kamu belum dikonfirmasi. Silakan cek inbox kamu.";
      }
      setErrorMsg(message);
      setIsLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMsg("Silakan masukkan alamat email Anda untuk mengirim kode OTP.");
      return;
    }
    
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsResetting(true);
    const supabase = createClient();
    
    // Supabase sends a recovery OTP if configured, or we can use the default link 
    // but here we will treat it as an OTP flow as requested.
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setErrorMsg("Gagal mengirim kode: " + error.message);
    } else {
      setSuccessMsg("Kode OTP telah dikirim ke email Anda!");
      setView("otp");
    }
    setIsResetting(false);
  };

  const handleVerifyOtpAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const supabase = createClient();
    
    // 1. Verify OTP
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'recovery',
    });

    if (verifyError) {
      setErrorMsg("Kode OTP salah atau sudah kadaluarsa.");
      setIsLoading(false);
      return;
    }

    // 2. Update Password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setErrorMsg("Gagal memperbarui sandi: " + updateError.message);
    } else {
      alert("Kata sandi berhasil diperbarui! Silakan login kembali.");
      setView("login");
      setSuccessMsg("Sandi berhasil direset. Silakan masuk.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary text-white rounded-4xl flex items-center justify-center font-headline font-black text-3xl mx-auto mb-6 bento-shadow border-4 border-on-background">
            AF
          </div>
          <h1 className="font-headline font-black text-4xl text-on-background tracking-tight mb-2">Login Admin</h1>
          <p className="text-outline font-bold">Hanya kreator terdaftar yang dapat masuk.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border-4 border-on-background bento-shadow relative overflow-hidden">
          
          {/* Messages */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-secondary/10 border-4 border-secondary rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle className="text-secondary shrink-0 mt-0.5" size={20} strokeWidth={3} />
              <p className="text-sm font-black text-secondary leading-tight">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-tertiary-container border-4 border-tertiary rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="bg-tertiary text-white rounded-full p-0.5 shrink-0">
                <ArrowRight className="-rotate-45" size={14} strokeWidth={4} />
              </div>
              <p className="text-sm font-black text-tertiary leading-tight">{successMsg}</p>
            </div>
          )}

          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-background uppercase tracking-widest">Email Kreator</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="admin@assetflow.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-primary/5 border-2 border-on-background rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none focus:border-4 focus:bg-white transition-all bento-shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-on-background uppercase tracking-widest">Kata Sandi</label>
                  <button 
                    type="button" 
                    onClick={() => setView("forgot")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-primary/5 border-2 border-on-background rounded-2xl pl-12 pr-12 py-4 text-sm font-bold outline-none focus:border-4 focus:bg-white transition-all bento-shadow-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-background transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 rounded-2xl font-headline font-black text-lg flex items-center justify-center gap-3 border-4 border-on-background transition-all bento-shadow ${
                  isLoading 
                    ? "bg-outline text-white opacity-50 cursor-not-allowed"
                    : "bg-primary text-white hover:scale-105 active:scale-95"
                }`}
              >
                {isLoading ? "Memeriksa..." : "Masuk ke Panel"} 
                {!isLoading && <ArrowRight size={24} strokeWidth={3} />}
              </button>
            </form>
          ) : view === "forgot" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-background uppercase tracking-widest">Email Pemulihan</label>
                <input 
                  type="email" 
                  required
                  placeholder="admin@assetflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary/5 border-2 border-on-background rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-4 focus:bg-white transition-all bento-shadow-sm"
                />
              </div>
              <button 
                onClick={handleResetPassword}
                disabled={isResetting}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black border-4 border-on-background bento-shadow hover:scale-105 transition-all"
              >
                {isResetting ? "Mengirim Kode..." : "Kirim Kode OTP"}
              </button>
              <button onClick={() => setView("login")} className="w-full text-xs font-black text-outline uppercase tracking-widest hover:text-on-background">Kembali ke Login</button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtpAndReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-background uppercase tracking-widest">Masukkan Kode OTP</label>
                <input 
                  type="text" 
                  required
                  placeholder="6 digit kode"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-primary/5 border-2 border-on-background rounded-2xl px-6 py-4 text-center text-2xl font-black tracking-[0.5em] outline-none focus:border-4 focus:bg-white transition-all bento-shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-on-background uppercase tracking-widest">Kata Sandi Baru</label>
                <input 
                  type="password" 
                  required
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-primary/5 border-2 border-on-background rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-4 focus:bg-white transition-all bento-shadow-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black border-4 border-on-background bento-shadow hover:scale-105 transition-all"
              >
                {isLoading ? "Memproses..." : "Reset & Masuk"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
