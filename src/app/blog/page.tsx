import type { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";
import { getPublishedBlogPosts } from "@/lib/supabase-admin";
import { formatDate, truncate } from "@/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read travel tips, destination guides and updates from DK Holidays, Coimbatore's trusted travel company.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Travel Tips &amp; <span className="text-accent">Updates</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Stories, guides, and insights from DK Holidays.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-accent/10 to-primary/10 overflow-hidden">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted/30">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted mb-3">
                      <Calendar size={12} />
                      {formatDate(post.created_at)}
                    </div>
                    <h2 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {truncate(post.meta_description || post.content, 120)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
