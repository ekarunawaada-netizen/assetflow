"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

// Ensure a creator exists for the current user and return their ID
async function getCurrentCreatorId() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fallback if no user
    if (!user) {
      const fallback = await prisma.creator.findFirst();
      if (fallback) return fallback.id;
      throw new Error("Sesi habis. Silakan login kembali.");
    }

    // Use UPSERT to handle profile creation safely
    const profile = await prisma.profile.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Kreator",
        username: user.user_metadata?.username || `user_${user.id.slice(0, 5)}`,
        role: "CREATOR"
      }
    });

    const creator = await prisma.creator.upsert({
      where: { userId: profile.id },
      update: {},
      create: {
        userId: profile.id,
        bio: "Kreator AssetFlow",
      }
    });

    return creator.id;
  } catch (err: any) {
    console.error("Error in getCurrentCreatorId:", err);
    // Try to get a fallback creator one last time
    const lastResort = await prisma.creator.findFirst();
    if (lastResort) return lastResort.id;
    throw new Error("Gagal mengidentifikasi kreator: " + err.message);
  }
}

export async function getAssets() {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return assets.map(asset => ({
    ...asset,
    price: asset.price.toString()
  }));
}

export async function createAsset(data: {
  title: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
}) {
  try {
    const creatorId = await getCurrentCreatorId();

    const newAsset = await prisma.asset.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        imageUrl: data.imageUrl,
        status: "Aktif",
        creatorId,
      }
    });

    // Note: Removed revalidatePath temporarily to diagnose Vercel crashes
    return { success: true, id: newAsset.id };
  } catch (error: any) {
    console.error("CREATE_ASSET_ERROR:", error);
    return { success: false, error: error.message || "Gagal menyimpan ke database" };
  }
}

export async function deleteAsset(id: string) {
  await prisma.asset.delete({
    where: { id }
  });
  revalidatePath("/assets");
}
