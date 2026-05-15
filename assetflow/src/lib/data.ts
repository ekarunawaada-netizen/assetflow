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

import { createClient } from "./supabase/client";

export const assets: Asset[] = [];

export async function getDynamicAssets() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Asset')
    .select('*, creator:Creator(*)')
    .eq('status', 'Aktif')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error("Error fetching assets:", error);
    return [];
  }

  return data.map((asset: any) => ({
    id: asset.id,
    title: asset.title,
    category: asset.category,
    price: parseFloat(asset.price),
    image: asset.imageUrl,
    creator: {
      name: asset.creator?.name || "Kreator",
      avatar: asset.creator?.avatar || "https://i.pravatar.cc/100",
      handle: asset.creator?.handle || "@kreator",
    },
    tags: [asset.category],
    description: asset.title,
    downloads: 0,
    rating: 5,
    reviews: 0
  }));
}

export const categories = ["Semua Aset", "Seni Digital", "Model 3D", "Templat", "Ikon"];
export const creators: Creator[] = [];
export const collections: Collection[] = [];
