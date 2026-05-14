"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure a default creator exists and return their ID
async function getDefaultCreatorId() {
  const existingCreator = await prisma.creator.findFirst();
  if (existingCreator) return existingCreator.id;

  // Create a default profile and creator
  const newProfile = await prisma.profile.create({
    data: {
      name: "Admin Creator",
      role: "ADMIN",
    }
  });

  const newCreator = await prisma.creator.create({
    data: {
      userId: newProfile.id,
      bio: "Official Admin Asset Creator",
      verified: true
    }
  });

  return newCreator.id;
}

export async function getAssets() {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  // Convert decimals to strings for serialization
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
  const creatorId = await getDefaultCreatorId();

  await prisma.asset.create({
    data: {
      title: data.title,
      category: data.category,
      price: parseFloat(data.price),
      imageUrl: data.imageUrl,
      status: "Aktif",
      creatorId,
    }
  });

  revalidatePath("/assets");
}

export async function deleteAsset(id: string) {
  await prisma.asset.delete({
    where: { id }
  });
  revalidatePath("/assets");
}
