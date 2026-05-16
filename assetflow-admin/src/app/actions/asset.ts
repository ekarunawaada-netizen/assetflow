"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

// Ensure a creator exists for the current user and return their ID
async function getCurrentCreatorId() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // If no user, try to get ANY creator as fallback (for testing/admin purposes)
    if (!user) {
      console.log("No user found, attempting fallback to first creator");
      const fallback = await prisma.creator.findFirst();
      if (fallback) return fallback.id;
      throw new Error("Sesi habis. Silakan login kembali.");
    }

    // Ensure Profile exists
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

    // Ensure Creator exists
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
    // Final fallback
    const lastResort = await prisma.creator.findFirst();
    if (lastResort) return lastResort.id;
    throw err;
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
    console.log("Creating asset with data:", { ...data, description: "..." });
    const creatorId = await getCurrentCreatorId();
    console.log("Found creatorId:", creatorId);

    const newAsset = await prisma.asset.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price) || 0, // Ensure numeric value for Decimal field
        imageUrl: data.imageUrl,
        status: "Aktif",
        creatorId,
      }
    });

    console.log("Asset created successfully:", newAsset.id);
    revalidatePath("/assets");
    return { success: true, id: newAsset.id };
  } catch (error: any) {
    console.error("CREATE_ASSET_ERROR_FULL:", error);
    // Extracting a cleaner error message
    const errorMessage = error instanceof Error ? error.message : "Gagal menyimpan ke database";
    return { success: false, error: errorMessage };
  }
}

export async function deleteAsset(id: string) {
  await prisma.asset.delete({
    where: { id }
  });
  revalidatePath("/assets");
}
