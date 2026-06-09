"use client";

import { useState } from "react";
import { X, Send, Star } from "lucide-react";
import toast from "react-hot-toast";
import { createReview } from "@/lib/supabase-admin";

export function ReviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 0, review: "" });
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.review) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await createReview({
        customer_name: form.name,
        rating: form.rating,
        review: form.review,
      });
      toast.success("Review submitted! It will appear after admin approval.");
      setForm({ name: "", rating: 0, review: "" });
      setIsOpen(false);
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mt-10">
        <p className="text-sm text-white/60 mb-3">Had a great experience with DK Holidays?</p>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-accent-light"
        >
          Leave a Review
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-muted hover:text-primary transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-primary mb-2">Share Your Experience</h3>
            <p className="text-sm text-muted mb-6">Your review helps others trust DK Holidays!</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label>Rating *</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm({ ...form, rating: val })}
                      onMouseEnter={() => setHovered(val)}
                      onMouseLeave={() => setHovered(0)}
                      className="transition-colors"
                    >
                      <Star
                        size={32}
                        className={
                          val <= (hovered || form.rating)
                            ? "fill-accent text-accent"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label>Your Review *</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your trip experience with DK Holidays..."
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  className="w-full resize-y"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent-light disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Send size={16} />
                )}
                Submit Review
              </button>
              <p className="text-center text-xs text-muted">Your review will appear after admin approval.</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
