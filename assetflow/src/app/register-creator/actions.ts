"use server";
import { createClient } from "@/lib/supabase/server";

export async function submitApplication(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Anda harus masuk untuk mendaftar." };
  }

  const portfolioUrl = formData.get("portfolioUrl") as string;
  const message = formData.get("message") as string;

  // Since assetflow-admin uses Prisma for the CreatorApplication model, Prisma mapped it to "CreatorApplication" table.
  const { error } = await supabase
    .from("CreatorApplication")
    .insert({
      userId: user.id,
      portfolioUrl,
      message,
      status: "PENDING"
    });

  if (error) {
    console.error("Error submitting application:", error);
    // Try Profile fallback if profile doesn't exist
    if (error.code === '23503') { // foreign key constraint (Profile doesn't exist)
      // We can try creating the profile first
      await supabase.from("Profile").insert({
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
        avatar: user.user_metadata?.avatar_url,
        role: "USER"
      });
      // Retry application
      const retry = await supabase.from("CreatorApplication").insert({
        userId: user.id,
        portfolioUrl,
        message,
        status: "PENDING"
      });
      if (retry.error) {
        return { error: retry.error.message };
      }
      return { success: true };
    }
    return { error: error.message };
  }

  return { success: true };
}
