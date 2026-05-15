"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

// Ensure a creator exists for the current user and return their ID
async function getCurrentCreatorId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Anda harus login untuk menambahkan aset.");

  let profile = await prisma.profile.findUnique({
    where: { id: user.id }
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        id: user.id,
        name: user.user_metadata.full_name || "New Creator",
        username: user.user_metadata.username || `user_${user.id.slice(0, 5)}`,
        role: "CREATOR"
      }
    });
  }

  let creator = await prisma.creator.findUnique({
    where: { userId: profile.id }
  });

  if (!creator) {
    creator = await prisma.creator.create({
      data: {
        userId: profile.id,
        bio: "Kreator AssetFlow",
      }
    });
  }

  return creator.id;
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

    await prisma.asset.create({
      data: {
        title: data.title,
        category: data.category,
        price: data.price, // Prisma Decimal accepts string
        imageUrl: data.imageUrl,
        status: "Aktif",
        creatorId,
      }
    });

    revalidatePath("/assets");
    return { success: true };
  } catch (error: any) {
    console.error("Create Asset Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteAsset(id: string) {
  await prisma.asset.delete({
    where: { id }
  });
  revalidatePath("/assets");
}
