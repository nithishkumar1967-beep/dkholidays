"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createPackage } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";

export default function NewPackagePage() {
  const router = useRouter();
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

  const generateSlug = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) { toast.error("Title and slug are required."); return; }
    setSaving(true);
    let imageUrl = "";
    if (imageFile) {
      const url = await uploadImage("packages-images", imageFile, "packages");
      if (url) imageUrl = url;
    }
    const { error } = await createPackage({
      title,
      slug,
      description,
      duration,
      price,
      places,
      image_url: imageUrl,
      itinerary,
      included,
      not_included: notIncluded,
      published: false,
      display_order: 0,
    });
    if (error) {
      toast.error("Failed to create: " + error.message);
    } else {
      toast.success("Package created!");
      router.push("/admin/packages");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">New Package</h1>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title *" value={title} onChange={(e) => generateSlug(e.target.value)} />
          <Input label="Slug *" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <TextArea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Duration (e.g. 3 Days / 2 Nights)" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <Input label="Price (e.g. ₹14,000 per person)" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <Input label="Places Visited (comma-separated)" value={places} onChange={(e) => setPlaces(e.target.value)} />
          <TextArea label="Itinerary (JSON array of day-wise plans)" value={itinerary} onChange={(e) => setItinerary(e.target.value)} rows={4} />
          <TextArea label="Included (comma-separated)" value={included} onChange={(e) => setIncluded(e.target.value)} rows={3} />
          <TextArea label="Not Included (comma-separated)" value={notIncluded} onChange={(e) => setNotIncluded(e.target.value)} rows={3} />
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Featured Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
          <div className="flex gap-3">
            <Button type="submit" loading={saving}>Create Package</Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/packages")}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
