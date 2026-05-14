"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet,
  MapPin,
  Clock,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const lineData: any[] = [];

const pieData: any[] = [];

const COLORS = ['#2346d5', '#ae2f34', '#006449', '#4361ee'];

export default function AnalyticsPage() {
  const [liveVisitors, setLiveVisitors] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-12 space-y-12 bg-background min-h-screen">
      {/* Header with Live Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="font-headline font-black text-5xl text-on-background tracking-tight">Analisis Trafik</h1>
          <p className="text-outline font-bold mt-2 text-lg">Laporan real-time pengunjung dan performa website.</p>
        </div>
        <div className="bg-tertiary-container border-4 border-on-background p-8 rounded-4xl flex items-center gap-6 bento-shadow">
          <div className="relative">
            <div className="w-5 h-5 bg-tertiary border-2 border-on-background rounded-full" />
            <div className="absolute inset-0 w-5 h-5 bg-tertiary rounded-full animate-ping opacity-50" />
          </div>
          <div>
            <p className="text-xs font-black text-on-background uppercase tracking-widest leading-none mb-1">Live Sekarang</p>
            <p className="text-4xl font-black text-on-background tracking-tight">{liveVisitors}</p>
          </div>
          <div className="h-12 w-1 bg-on-background/20 mx-2 rounded-full" />
          <div className="text-on-background text-sm font-black leading-tight uppercase tracking-wider">
            Pengunjung Aktif<br/>Global
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Visitor Chart */}
        <div className="lg:col-span-2 bg-white border-4 border-on-background rounded-[2.5rem] p-8 bento-shadow">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl border-2 border-on-background bento-shadow-sm">
                <Clock size={24} strokeWidth={3} className="text-primary" />
              </div>
              <h2 className="font-headline font-black text-2xl tracking-tight">Aktivitas 24 Jam</h2>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-on-background" />
                <span className="text-xs font-black text-on-background uppercase tracking-wider">Hari Ini</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-outline-variant border-2 border-on-background" />
                <span className="text-xs font-black text-on-background uppercase tracking-wider">Kemarin</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e3e4" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#747686', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#747686', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '3px solid #191c1d', borderRadius: '16px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="value" stroke="#2346d5" strokeWidth={5} dot={{ r: 6, fill: '#ffffff', stroke: '#2346d5', strokeWidth: 3 }} activeDot={{ r: 10, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-surface border-4 border-on-background rounded-[2.5rem] p-8 flex flex-col bento-shadow">
          <h2 className="font-headline font-black text-2xl mb-10 tracking-tight">Perangkat</h2>
          <div className="h-[250px] w-full mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="#191c1d"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-6 flex-1">
            {[].map((device: any) => (
              <div key={device.label} className="flex items-center justify-between p-4 bg-white border-2 border-on-background rounded-2xl bento-shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg border-2 border-on-background ${device.bg}`}>
                    <device.icon size={18} strokeWidth={3} className={device.color} />
                  </div>
                  <span className="text-sm font-black text-on-background uppercase tracking-wider">{device.label}</span>
                </div>
                <span className="text-lg font-black text-on-background tracking-tight">{device.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Geo Locations */}
        <div className="lg:col-span-2 bg-white border-4 border-on-background rounded-[2.5rem] p-8 bento-shadow">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-headline font-black text-2xl tracking-tight">Top Lokasi</h2>
            <Link href="#" className="text-xs font-black text-primary uppercase tracking-widest border-b-2 border-primary pb-1">Lihat Peta</Link>
          </div>
          <div className="space-y-6">
            {[].map((loc: any) => (
              <div key={loc.country} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-black text-on-background">{loc.flag} {loc.country}</span>
                  <span className="text-sm font-black text-primary uppercase tracking-wider">{loc.visitors}</span>
                </div>
                <div className="h-4 bg-background border-2 border-on-background rounded-full overflow-hidden bento-shadow-inset">
                  <div className="h-full bg-primary border-r-2 border-on-background rounded-full" style={{ width: `${loc.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Sources */}
        <div className="lg:col-span-2 bg-surface border-4 border-on-background rounded-[2.5rem] p-8 bento-shadow">
          <h2 className="font-headline font-black text-2xl mb-10 tracking-tight">Sumber Referensi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[].map((ref: any) => (
              <div key={ref.source} className="p-6 bg-white border-2 border-on-background rounded-4xl flex items-center justify-between bento-shadow-sm">
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">{ref.source}</p>
                  <p className="text-2xl font-black tracking-tight">{ref.value}</p>
                </div>
                {ref.trend === "up" ? (
                  <div className="p-3 bg-tertiary-container text-tertiary border-2 border-on-background rounded-2xl bento-shadow-sm">
                    <ArrowUp size={24} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="p-3 bg-secondary/10 text-secondary border-2 border-on-background rounded-2xl bento-shadow-sm">
                    <ArrowDown size={24} strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-5 bg-primary text-white border-2 border-on-background rounded-2xl text-sm font-black uppercase tracking-widest bento-shadow hover:scale-105 transition-all">
            Lihat Analitik Lengkap
          </button>
        </div>
      </div>
    </div>
  );
}

