"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getBlogPosts, updateBlogPost } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((posts) => {
      const post = posts.find((p) => p.id === id);
      if (post) {
        setForm({
          title: post.title,
          slug: post.slug,
          content: post.content,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          published: post.published,
          featured_image: post.featured_image,
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required.");
      return;
    }
    setUploading(true);
    let imageUrl = form.featured_image;
    if (imageFile) {
      const url = await uploadImage("blog-images", imageFile, "blog");
      if (url) imageUrl = url;
    }
    await updateBlogPost(id, { ...form, featured_image: imageUrl });
    toast.success("Blog post updated!");
    setUploading(false);
    router.push("/admin/blog");
  };

  if (loading) return <div className="animate-pulse"><div className="h-8 w-48 bg-gray-200 rounded mb-4" /><div className="h-64 bg-gray-200 rounded" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Edit Blog Post</h1>
        <p className="text-sm text-muted">Update your blog post.</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <div>
            <label>Content *</label>
            <textarea rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full resize-y font-mono text-sm" />
          </div>
          <Input label="Meta Title" value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
          <TextArea label="Meta Description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
          <div>
            <label>Featured Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
            {form.featured_image && <p className="text-xs text-muted mt-1">Current image: {form.featured_image.split("/").pop()}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            <label className="mb-0">Published</label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={uploading}>Update Post</Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/blog")}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
