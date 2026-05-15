"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getApplications() {
  const applications = await prisma.creatorApplication.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: 'desc' }
  });
  return applications;
}

export async function updateApplicationStatus(id: string, status: "APPROVED" | "REJECTED") {
  const application = await prisma.creatorApplication.update({
    where: { id },
    data: { status },
    include: { user: true }
  });

  if (status === "APPROVED") {
    // Check if creator profile already exists
    const existingCreator = await prisma.creator.findUnique({
      where: { userId: application.userId }
    });

    if (!existingCreator) {
      await prisma.creator.create({
        data: {
          userId: application.userId,
          bio: application.message || "Kreator baru di AssetFlow",
          verified: true
        }
      });
    } else {
      await prisma.creator.update({
        where: { userId: application.userId },
        data: { verified: true }
      });
    }

    // Also update profile role
    await prisma.profile.update({
      where: { id: application.userId },
      data: { role: "CREATOR" }
    });
  }

  revalidatePath("/applications");
  return application;
}
