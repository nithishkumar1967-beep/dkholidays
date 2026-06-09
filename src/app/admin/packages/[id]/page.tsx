"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getPackages, updatePackage } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { Package } from "@/lib/types";

export default function EditPackagePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [places, setPlaces] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [itinerary, setItinerary] = useState("");
  const [included, setIncluded] = useState("");
  const [notIncluded, setNotIncluded] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    getPackages().then((all) => {
      const pkg = all.find((p) => p.id === id);
      if (pkg) {
        setTitle(pkg.title);
        setSlug(pkg.slug);
        setDescription(pkg.description);
        setDuration(pkg.duration);
        setPrice(pkg.price);
        setPlaces(String(pkg.places || ""));
        setItinerary(String(pkg.itinerary || ""));
        setIncluded(pkg.included);
        setNotIncluded(pkg.not_included);
        setPublished(pkg.published);
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) { toast.error("Title and slug are required."); return; }
    setSaving(true);
    let imageUrl = "";
    if (imageFile) {
      const url = await uploadImage("packages-images", imageFile, "packages");
      if (url) imageUrl = url;
    }
    const updates: Record<string, unknown> = {
      title, slug, description, duration, price, places, itinerary, included,
      not_included: notIncluded, published,
    };
    if (imageUrl) updates.image_url = imageUrl;
    const { error } = await updatePackage(id, updates);
    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Package updated!");
      router.push("/admin/packages");
    }
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-64 bg-gray-200 rounded" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Edit Package</h1>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Slug *" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <TextArea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <Input label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <Input label="Places Visited (comma-separated)" value={places} onChange={(e) => setPlaces(e.target.value)} />
          <TextArea label="Itinerary (JSON)" value={itinerary} onChange={(e) => setItinerary(e.target.value)} rows={4} />
          <TextArea label="Included (comma-separated)" value={included} onChange={(e) => setIncluded(e.target.value)} rows={3} />
          <TextArea label="Not Included (comma-separated)" value={notIncluded} onChange={(e) => setNotIncluded(e.target.value)} rows={3} />
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Featured Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            <label className="mb-0">Published</label>
          </div>
          <div className="flex gap-3">
            <Button type="submit" loading={saving}>Update Package</Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/packages")}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
