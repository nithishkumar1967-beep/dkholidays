"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts, deleteBlogPost, updateBlogPost } from "@/lib/supabase-admin";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    setPosts(await getBlogPosts());
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    toast.success("Post deleted.");
    loadPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    await updateBlogPost(post.id, { published: !post.published });
    toast.success(post.published ? "Post unpublished." : "Post published!");
    loadPosts();
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Blog Management</h1>
          <p className="text-sm text-muted">Create and manage blog posts.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="accent"><Plus size={16} /> New Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-primary">{post.title}</h3>
                  <Badge variant={post.published ? "success" : "warning"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.created_at)}</span>
                  <span>/blog/{post.slug}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => togglePublish(post)} className="p-2 rounded-lg hover:bg-gray-100 text-muted" title={post.published ? "Unpublish" : "Publish"}>
                  {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <Link href={`/admin/blog/${post.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-muted" title="Edit">
                  <Edit2 size={16} />
                </Link>
                <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-gray-100 text-danger" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted mb-4">No blog posts yet.</p>
            <Link href="/admin/blog/new"><Button variant="accent"><Plus size={16} /> Create First Post</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
