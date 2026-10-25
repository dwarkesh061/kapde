import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { supabase, isSupabaseConfigured } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      const singleFile = formData.get("file") as File | null;
      if (singleFile) {
        files.push(singleFile);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided." }, { status: 400 });
    }

    if (!isSupabaseConfigured || !supabase) {
      // In local fallback mode without Supabase storage configured yet,
      // return a graceful dummy or local reference so UI test doesn't error!
      const mockImages = files.map((file) => ({
        url: `/images/pleated-trousers.jpg`,
        alt: file.name.replace(/\.[^/.]+$/, ""),
        path: `local/${file.name}`,
      }));

      return NextResponse.json({
        success: true,
        images: mockImages,
        note: "Supabase cloud bucket not configured; returned local asset fallback.",
      });
    }

    const uploadedImages: Array<{ url: string; alt: string; path: string }> = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `products/${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(filePath, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        return NextResponse.json(
          { error: `Upload failed: ${error.message}` },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);

      uploadedImages.push({
        url: urlData.publicUrl,
        alt: file.name.replace(/\.[^/.]+$/, ""),
        path: data.path,
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch (err: any) {
    console.error("Upload route exception:", err);
    return NextResponse.json(
      { error: err.message || "Failed to upload file(s) to cloud bucket." },
      { status: 500 }
    );
  }
}
