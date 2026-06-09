export type BucketName = "hero-images" | "gallery-images" | "fleet-images" | "service-images" | "blog-images" | "packages-images" | "company-assets";

export async function uploadImage(
  bucket: BucketName,
  file: File,
  folder?: string
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);
  if (folder) formData.append("folder", folder);

  try {
    const res = await fetch("/api/storage/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      console.error("Upload error:", err.error);
      return null;
    }
    const { url } = await res.json();
    return url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}

export async function deleteImage(bucket: BucketName, url: string) {
  try {
    await fetch("/api/storage/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bucket, url }),
    });
  } catch (err) {
    console.error("Delete error:", err);
  }
}

export async function listImages(bucket: BucketName, folder?: string) {
  const { supabase } = await import("./supabase");
  const prefix = folder ? `${folder}/` : "";
  const { data } = await supabase.storage.from(bucket).list(prefix);
  return data || [];
}
