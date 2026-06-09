import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/layout/public-layout";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/supabase-admin";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.content.slice(0, 160),
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.content.slice(0, 160),
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <PublicLayout>
      <article className="py-16">
        <div className="container-custom max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted mb-4">
            <Calendar size={12} />
            {formatDate(post.created_at)}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          {post.featured_image && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-muted prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </PublicLayout>
  );
}
