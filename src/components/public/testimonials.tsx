"use client";

import { useEffect, useState } from "react";
import { getApprovedReviews } from "@/lib/supabase-admin";
import type { Review } from "@/lib/types";

const DEFAULT_REVIEWS = [
  {
    id: "1",
    customer_name: "Ramesh K.",
    rating: 5,
    review: "Best bus rental in Coimbatore! DK Holidays arranged our family trip to Ooty perfectly. Clean bus, professional driver, on time. Highly recommend!",
    approved: true,
    created_at: "",
  },
  {
    id: "2",
    customer_name: "Priya S.",
    rating: 5,
    review: "Used DK Holidays for our company outing. Excellent service, very punctual and the bus was spotless. Will definitely book again for our next corporate event.",
    approved: true,
    created_at: "",
  },
  {
    id: "3",
    customer_name: "Arun M.",
    rating: 5,
    review: "Airport pickup was seamless. Driver was waiting with my name board, helped with luggage and knew the city well. 5 stars without any doubt!",
    approved: true,
    created_at: "",
  },
];

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getApprovedReviews().then((data) => {
      setReviews(data.length ? data : DEFAULT_REVIEWS);
    });
  }, []);

  return (
    <section className="py-20 bg-primary" id="testimonials">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-bold text-accent mb-3">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            13,400+ followers trust us. Here&apos;s why.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < review.rating ? "text-accent" : "text-white/20"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4 italic">
                &ldquo;{review.review}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                  {review.customer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong className="text-sm text-white">{review.customer_name}</strong>
                  <span className="block text-xs text-white/50">Happy Traveler</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
