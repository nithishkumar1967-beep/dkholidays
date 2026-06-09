"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getReviews, approveReview, deleteReview } from "@/lib/supabase-admin";
import type { Review } from "@/lib/types";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadReviews(); }, []);

  const loadReviews = async () => {
    setReviews(await getReviews());
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    await approveReview(id);
    toast.success("Review approved!");
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await deleteReview(id);
    toast.success("Review deleted.");
    loadReviews();
  };

  const filtered = filter === "all" ? reviews : reviews.filter((r) => filter === "approved" ? r.approved : !r.approved);

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Reviews Management</h1>
        <p className="text-sm text-muted">Approve, reject or manage customer reviews.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              filter === f ? "bg-accent text-white" : "bg-gray-100 text-muted hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? reviews.length : reviews.filter((r) => f === "approved" ? r.approved : !r.approved).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((review) => (
          <Card key={review.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <strong className="text-sm text-primary">{review.customer_name}</strong>
                  <Badge variant={review.approved ? "success" : "warning"}>
                    {review.approved ? "Approved" : "Pending"}
                  </Badge>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "fill-accent text-accent" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-sm text-muted">&ldquo;{review.review}&rdquo;</p>
              </div>
              <div className="flex gap-1 shrink-0">
                {!review.approved && (
                  <button onClick={() => handleApprove(review.id)} className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors" title="Approve">
                    <Check size={16} />
                  </button>
                )}
                <button onClick={() => handleDelete(review.id)} className="p-2 rounded-lg bg-red-100 text-danger hover:bg-red-200 transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted text-center py-10">No reviews found.</p>
        )}
      </div>
    </div>
  );
}
