"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getGallery, createGalleryImage, deleteGalleryImage } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { GalleryImage } from "@/lib/types";

const CATEGORIES = ["Tour", "Bus", "Wedding", "Corporate", "School", "Airport"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tour");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadImages(); }, []);

  const loadImages = async () => {
    setImages(await getGallery());
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) { toast.error("Select at least one image."); return; }
    if (!title) { toast.error("Please enter a title."); return; }
    setUploading(true);
    let success = 0;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage("gallery-images", files[i], "gallery");
      if (url) {
        const maxOrder = images.reduce((max, img) => Math.max(max, img.display_order), 0);
        await createGalleryImage({ title, image_url: url, category, display_order: maxOrder + i + 1 });
        success++;
      }
    }
    toast.success(`${success} image(s) uploaded.`);
    setUploading(false);
    setFiles(null);
    if (fileRef.current) fileRef.current.value = "";
    loadImages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    toast.success("Image deleted.");
    loadImages();
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Gallery Management</h1>
        <p className="text-sm text-muted">Upload and manage gallery images.</p>
      </div>

      <Card className="mb-6 p-6">
        <h2 className="font-bold text-primary mb-4">Upload Images</h2>
        <div className="space-y-4 max-w-2xl">
          <Input label="Image Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Family Trip to Ooty" />
          <div>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label>Images (select one or more)</label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="w-full text-sm" />
          </div>
          <Button onClick={handleUpload} loading={uploading} variant="accent">
            <Upload size={16} /> Upload
          </Button>
        </div>
      </Card>

      {images.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon size={48} className="mx-auto text-muted/30 mb-4" />
          <p className="text-sm text-muted">No gallery images yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-bg-light">
              <div className="aspect-square">
                {img.image_url ? (
                  <img src={img.image_url} alt={img.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted/30">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="w-full">
                  <p className="text-xs font-semibold text-white">{img.title}</p>
                  <span className="text-[10px] text-white/60">{img.category}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-danger text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
