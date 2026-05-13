// Data simulasi untuk marketplace AssetFlow
export type Asset = {
  id: string;
  title: string;
  category: string;
  price: number;
  priceEth?: string;
  image: string;
  badge?: "Hot" | "Baru" | "Diskon" | "Unggulan";
  creator: {
    name: string;
    avatar: string;
    handle: string;
  };
  tags: string[];
  description: string;
  downloads: number;
  rating: number;
  reviews: number;
};

export type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  followers: number;
  assets: number;
  sales: number;
  category: string;
  verified: boolean;
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  image: string;
  assetCount: number;
  curator: string;
  tags: string[];
};

export const assets: Asset[] = [
  {
    id: "1",
    title: "Dinamika Fluida Nebula",
    category: "Seni Digital",
    price: 49,
    priceEth: "0.8 ETH",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    badge: "Hot",
    creator: { name: "Alex Creative", handle: "@alex_creative", avatar: "https://i.pravatar.cc/100?img=4" },
    tags: ["Abstrak", "Tekstur", "Branding"],
    description: "50 tekstur fluida abstrak resolusi ultra-tinggi yang sempurna untuk branding premium dan proyek seni digital.",
    downloads: 1240,
    rating: 4.9,
    reviews: 98,
  },
  {
    id: "2",
    title: "Maket Perangkat Minimalis",
    category: "Templat",
    price: 24,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=500&q=80",
    badge: "Baru",
    creator: { name: "Studio Pixel", handle: "@studio_pixel", avatar: "https://i.pravatar.cc/100?img=5" },
    tags: ["Maket", "PSD", "Perangkat"],
    description: "Adegan maket perangkat yang bersih dan minimalis untuk mempresentasikan karya UI Anda dengan penuh gaya.",
    downloads: 830,
    rating: 4.7,
    reviews: 54,
  },
  {
    id: "3",
    title: "SaaS Admin Pro",
    category: "Templat",
    price: 59,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    creator: { name: "DesignOps", handle: "@designops", avatar: "https://i.pravatar.cc/100?img=6" },
    tags: ["React", "UI Kit", "Dasbor"],
    description: "Kit UI React komprehensif untuk dasbor admin SaaS dengan lebih dari 120 komponen.",
    downloads: 2100,
    rating: 4.8,
    reviews: 176,
  },
  {
    id: "4",
    title: "Bentuk Abstrak Vol.3",
    category: "Model 3D",
    price: 39,
    priceEth: "0.5 ETH",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
    badge: "Hot",
    creator: { name: "3D Master", handle: "@3D_Mstr", avatar: "https://i.pravatar.cc/100?img=7" },
    tags: ["3D", "Blender", "Abstrak"],
    description: "Bentuk 3D abstrak skulptural untuk seni digital, branding, dan seni sampul.",
    downloads: 640,
    rating: 4.6,
    reviews: 41,
  },
  {
    id: "5",
    title: "UI Dasbor FinTech",
    category: "Templat",
    price: 79,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    creator: { name: "Alex Creative", handle: "@alex_creative", avatar: "https://i.pravatar.cc/100?img=4" },
    tags: ["Figma", "Dasbor", "Keuangan"],
    description: "Sistem desain Figma lengkap untuk aplikasi FinTech, dengan mode gelap dan terang.",
    downloads: 3200,
    rating: 4.9,
    reviews: 230,
  },
  {
    id: "6",
    title: "Paket Seni Glitch",
    category: "Seni Digital",
    price: 19,
    image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=500&q=80",
    badge: "Diskon",
    creator: { name: "Neon Studio", handle: "@neon_studio", avatar: "https://i.pravatar.cc/100?img=8" },
    tags: ["Glitch", "Seni", "Tekstur"],
    description: "20 overlay dan tekstur seni glitch resolusi tinggi untuk desain visual yang berani.",
    downloads: 890,
    rating: 4.5,
    reviews: 63,
  },
  {
    id: "7",
    title: "Sistem Ikon 2024",
    category: "Ikon",
    price: 29,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=500&q=80",
    badge: "Baru",
    creator: { name: "Vector Forge", handle: "@vectorforge", avatar: "https://i.pravatar.cc/100?img=9" },
    tags: ["Ikon", "SVG", "UI"],
    description: "Lebih dari 1200 ikon SVG pixel-perfect dalam berbagai gaya — outline, filled, dan duotone.",
    downloads: 5400,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "8",
    title: "Kit Web Brutalis",
    category: "Templat",
    price: 89,
    image: "https://images.unsplash.com/photo-1545239351-cefa43af60f3?auto=format&fit=crop&w=500&q=80",
    creator: { name: "Studio Pixel", handle: "@studio_pixel", avatar: "https://i.pravatar.cc/100?img=5" },
    tags: ["Webflow", "Brutalis", "Landing"],
    description: "Templat halaman landas yang berani terinspirasi brutalisme untuk Webflow dan Framer.",
    downloads: 720,
    rating: 4.7,
    reviews: 48,
  },
];

export const categories = ["Semua Aset", "Seni Digital", "Model 3D", "Templat", "Ikon"];

export const creators: Creator[] = [
  {
    id: "c1",
    name: "Alex Creative",
    handle: "@alex_creative",
    avatar: "https://i.pravatar.cc/200?img=4",
    banner: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    bio: "Seniman digital pemenang penghargaan yang berspesialisasi dalam dinamika fluida dan seni generatif.",
    followers: 12400,
    assets: 34,
    sales: 3200,
    category: "Seni Digital",
    verified: true,
  },
  {
    id: "c2",
    name: "Studio Pixel",
    handle: "@studio_pixel",
    avatar: "https://i.pravatar.cc/200?img=5",
    banner: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    bio: "Membuat adegan maket premium dan templat web sejak 2019.",
    followers: 8900,
    assets: 22,
    sales: 1800,
    category: "Templat",
    verified: true,
  },
  {
    id: "c3",
    name: "3D Master",
    handle: "@3D_Mstr",
    avatar: "https://i.pravatar.cc/200?img=7",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    bio: "Pemahat Blender dan generalis 3D yang menciptakan bentuk dan lingkungan abstrak.",
    followers: 6500,
    assets: 18,
    sales: 980,
    category: "Model 3D",
    verified: false,
  },
  {
    id: "c4",
    name: "Neon Studio",
    handle: "@neon_studio",
    avatar: "https://i.pravatar.cc/200?img=8",
    banner: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=800&q=80",
    bio: "Seniman visual yang mendorong batas seni glitch dan estetika neon.",
    followers: 4200,
    assets: 12,
    sales: 620,
    category: "Seni Digital",
    verified: false,
  },
  {
    id: "c5",
    name: "Vector Forge",
    handle: "@vectorforge",
    avatar: "https://i.pravatar.cc/200?img=9",
    banner: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
    bio: "Desainer ikon dengan gairah untuk sistem SVG yang bersih dan serbaguna.",
    followers: 15800,
    assets: 8,
    sales: 5400,
    category: "Ikon",
    verified: true,
  },
  {
    id: "c6",
    name: "DesignOps",
    handle: "@designops",
    avatar: "https://i.pravatar.cc/200?img=6",
    banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    bio: "Tim desain full-stack yang merilis kit UI siap produksi dan sistem desain.",
    followers: 22000,
    assets: 41,
    sales: 8900,
    category: "Templat",
    verified: true,
  },
];

export const collections: Collection[] = [
  {
    id: "col1",
    title: "Paket Bento UI",
    description: "Koleksi terbaik komponen UI yang terinspirasi bento-grid untuk aplikasi web modern.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    assetCount: 12,
    curator: "@designops",
    tags: ["UI", "Bento", "Komponen"],
  },
  {
    id: "col2",
    title: "Esensial Mode Gelap",
    description: "Aset bertema gelap yang dikurasi secara khusus untuk pecinta mode tengah malam.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    assetCount: 8,
    curator: "@alex_creative",
    tags: ["Gelap", "UI", "Branding"],
  },
  {
    id: "col3",
    title: "Kit Glassmorphism",
    description: "Elemen UI kaca buram dan latar belakang untuk antarmuka yang memukau.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    assetCount: 15,
    curator: "@studio_pixel",
    tags: ["Kaca", "UI", "Modern"],
  },
  {
    id: "col4",
    title: "Rilis Seni Abstrak",
    description: "Seni digital abstrak premium yang sempurna untuk NFT dan cetakan dinding.",
    image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=800&q=80",
    assetCount: 20,
    curator: "@neon_studio",
    tags: ["Abstrak", "Seni", "NFT"],
  },
  {
    id: "col5",
    title: "Paket Dasar Motion",
    description: "Aset animasi Framer dan Lottie untuk menghidupkan UI Anda.",
    image: "https://images.unsplash.com/photo-1545239351-cefa43af60f3?auto=format&fit=crop&w=800&q=80",
    assetCount: 9,
    curator: "@vectorforge",
    tags: ["Motion", "Framer", "Animasi"],
  },
  {
    id: "col6",
    title: "Galeri Render 3D",
    description: "Render dan adegan 3D sinematik untuk penceritaan visual yang menakjubkan.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
    assetCount: 16,
    curator: "@3D_Mstr",
    tags: ["3D", "Render", "Blender"],
  },
];
