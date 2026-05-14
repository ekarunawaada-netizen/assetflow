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

export const assets: Asset[] = [];
export const categories = ["Semua Aset", "Seni Digital", "Model 3D", "Templat", "Ikon"];
export const creators: Creator[] = [];
export const collections: Collection[] = [];
