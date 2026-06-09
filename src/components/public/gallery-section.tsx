"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getGallery } from "@/lib/supabase-admin";
import type { GalleryImage } from "@/lib/types";

const FALLBACK_IMAGES = [
  { title: "Family Trip to Ooty", category: "Tour" },
  { title: "Corporate Outing", category: "Corporate" },
  { title: "Wedding Fleet", category: "Wedding" },
  { title: "School Excursion", category: "School" },
  { title: "Airport Transfer", category: "Airport" },
  { title: "South India Tour", category: "Tour" },
];

export function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    getGallery().then(setImages);
  }, []);

  const display = images.length
    ? images.slice(0, 6)
    : FALLBACK_IMAGES.map((img, idx) => ({
        id: String(idx),
        title: img.title,
        image_url: "",
        category: img.category,
        display_order: idx,
        created_at: "",
      }));

  return (
    <section className="py-20" id="gallery">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-bold text-accent mb-3">Gallery</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
            Moments from the Road
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Real trips, real smiles — a glimpse of the journeys we&apos;ve made memorable.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {display.map((img) => (
            <div
              key={img.id}
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
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
