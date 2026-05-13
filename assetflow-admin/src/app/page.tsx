"use client";
import { 
  TrendingUp, 
  Users, 
  Package, 
  ArrowUpRight,
  Eye,
  ShoppingBag
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Sen', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Sel', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Rab', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Kam', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Jum', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Sab', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Min', uv: 3490, pv: 4300, amt: 2100 },
];

const stats = [
  { label: "Total Aset", value: "1,284", icon: Package, trend: "+12%", color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Pengunjung", value: "48.5k", icon: Users, trend: "+5.4%", color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Penjualan", value: "Rp 12.4M", icon: ShoppingBag, trend: "+18%", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Tayangan", value: "156.2k", icon: Eye, trend: "+2.1%", color: "text-orange-500", bg: "bg-orange-500/10" },
];

export default function Dashboard() {
  return (
    <div className="p-12 space-y-12 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline font-black text-5xl text-on-background tracking-tight">Panel Utama</h1>
          <p className="text-outline font-bold mt-2 text-lg">Selamat datang kembali, Admin. Pantau performa hari ini.</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-base flex items-center gap-3 border-2 border-on-background bento-shadow">
          Unduh Laporan <ArrowUpRight size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-surface border-4 border-on-background p-8 rounded-[2rem] transition-all hover:-translate-y-1 bento-shadow group">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl border-2 border-on-background ${stat.bg} ${stat.color} bento-shadow-sm`}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>
                <span className="text-tertiary font-black text-sm bg-tertiary-container border-2 border-on-background px-3 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-outline font-black text-sm uppercase tracking-widest">{stat.label}</h3>
              <p className="text-4xl font-black text-on-background mt-2 tracking-tight">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white border-4 border-on-background rounded-[2.5rem] p-8 bento-shadow">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-headline font-black text-2xl tracking-tight">Analisis Pertumbuhan</h2>
            <select className="bg-white border-2 border-on-background rounded-xl px-4 py-2 text-sm font-black outline-none bento-shadow-sm">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2346d5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2346d5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e3e4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#747686', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#747686', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '3px solid #191c1d', borderRadius: '16px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="uv" stroke="#2346d5" strokeWidth={4} fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border-4 border-on-background rounded-[2.5rem] p-8 bento-shadow">
          <h2 className="font-headline font-black text-2xl mb-8 tracking-tight">Aktivitas Real-time</h2>
          <div className="space-y-8">
            {[
              { user: "Alex J.", action: "Membeli UI Kit Pro", time: "2 mnt yang lalu", color: "bg-primary" },
              { user: "Sarah K.", action: "Mengunggah 3D Model", time: "15 mnt yang lalu", color: "bg-primary-container" },
              { user: "Admin", action: "Menghapus aset #124", time: "1 jam yang lalu", color: "bg-secondary" },
              { user: "System", action: "Deploy sukses", time: "3 jam yang lalu", color: "bg-tertiary" },
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className={`w-12 h-12 rounded-2xl border-2 border-on-background ${item.color} flex-shrink-0 flex items-center justify-center text-white font-black text-sm bento-shadow-sm`}>
                  {item.user[0]}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-black text-on-background">
                    {item.user} <span className="text-outline font-bold">{item.action}</span>
                  </p>
                  <p className="text-xs font-black text-primary mt-1 uppercase tracking-wider">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-white border-2 border-on-background rounded-2xl text-sm font-black hover:bg-primary/5 transition-all bento-shadow-sm">
            Lihat Log Lengkap
          </button>
        </div>
      </div>
    </div>
  );
}

