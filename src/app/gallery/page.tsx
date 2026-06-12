"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { getGallery, getSiteSettings } from "@/lib/supabase-admin";
import type { GalleryImage } from "@/lib/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [heroTitle, setHeroTitle] = useState('Moments from <span class="text-accent">the Road</span>');
  const [heroSubtitle, setHeroSubtitle] = useState("Real trips, real smiles — a glimpse of the journeys we've made memorable.");
  const [categories, setCategories] = useState(["All", "Tour", "Bus", "Wedding", "Corporate", "School", "Airport"]);

  useEffect(() => {
    getGallery().then(setImages);
    getSiteSettings().then((settings) => {
      if (settings) {
        if (settings.gallery_hero_title) setHeroTitle(settings.gallery_hero_title);
        if (settings.gallery_hero_subtitle) setHeroSubtitle(settings.gallery_hero_subtitle);
        try {
          const cat = JSON.parse(settings.gallery_categories || "[]");
          if (cat.length) setCategories(["All", ...cat.filter((c: string) => c !== "All")]);
        } catch {}
      }
    });
  }, []);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active);

  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Best Travel Agency in Coimbatore — Gallery</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          <p className="text-white/70 max-w-2xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  active === cat
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-muted hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-muted/40 text-6xl mb-4">📷</div>
              <p className="text-muted">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelected(img)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-bg-light"
                >
                  {img.image_url ? (
                    <img
                      src={img.image_url}
                      alt={img.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted/30">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs font-semibold text-white">{img.title}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm"
            >
              Close ✕
            </button>
            {selected.image_url ? (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full rounded-xl max-h-[80vh] object-contain"
              />
            ) : (
              <div className="aspect-video rounded-xl bg-bg-light flex items-center justify-center text-muted">
                Image Preview
              </div>
            )}
            <p className="text-white text-center mt-3 text-sm font-semibold">{selected.title}</p>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
