"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createBlogPost } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import { slugify } from "@/lib/utils";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    meta_title: "",
    meta_description: "",
    published: false,
    featured_image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleTitleChange = (title: string) => {
    setForm({ ...form, title, slug: slugify(title) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required.");
      return;
    }
    setUploading(true);
    let imageUrl = "";
    if (imageFile) {
      const url = await uploadImage("blog-images", imageFile, "blog");
      if (url) imageUrl = url;
    }
    await createBlogPost({
      ...form,
      featured_image: imageUrl,
      meta_title: form.meta_title || form.title,
    });
    toast.success("Blog post created!");
    setUploading(false);
    router.push("/admin/blog");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">New Blog Post</h1>
        <p className="text-sm text-muted">Create a new blog post.</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title *" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <div>
            <label>Content *</label>
            <textarea
              rows={12}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full resize-y font-mono text-sm"
              placeholder="Write your blog content here (HTML supported)..."
            />
          </div>
          <Input label="Meta Title" value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
          <TextArea label="Meta Description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
          <div>
            <label>Featured Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            <label className="mb-0">Publish immediately</label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={uploading}>Create Post</Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/blog")}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
