"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MessageSquare, Search, Trash2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/supabase-admin";
import { formatDate } from "@/lib/utils";
import type { Enquiry } from "@/lib/types";

const STATUS_BADGE: Record<string, "warning" | "info" | "success" | "danger"> = {
  new: "warning",
  contacted: "info",
  closed: "success",
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => { loadEnquiries(); }, []);

  const loadEnquiries = async () => {
    setEnquiries(await getEnquiries());
    setLoading(false);
  };

  const handleStatus = async (id: string, status: "contacted" | "closed") => {
    await updateEnquiryStatus(id, status);
    toast.success(`Marked as ${status}.`);
    loadEnquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await deleteEnquiry(id);
    toast.success("Enquiry deleted.");
    loadEnquiries();
  };

  const filtered = enquiries
    .filter((e) => filter === "all" || e.status === filter)
    .filter((e) => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search));

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Enquiries</h1>
        <p className="text-sm text-muted">View and manage contact form submissions.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9"
          />
        </div>
        {(["all", "new", "contacted", "closed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              filter === f ? "bg-accent text-white" : "bg-gray-100 text-muted hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((enquiry) => (
          <Card
            key={enquiry.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${selected?.id === enquiry.id ? "ring-2 ring-accent" : ""}`}
            onClick={() => setSelected(selected?.id === enquiry.id ? null : enquiry)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <strong className="text-sm text-primary">{enquiry.name}</strong>
                  <Badge variant={STATUS_BADGE[enquiry.status]}>{enquiry.status}</Badge>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Phone size={12} /> {enquiry.phone}</span>
                  {enquiry.email && <span className="flex items-center gap-1"><Mail size={12} /> {enquiry.email}</span>}
                  {enquiry.service && <span className="flex items-center gap-1"><MessageSquare size={12} /> {enquiry.service}</span>}
                  <span>{formatDate(enquiry.created_at)}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                {enquiry.status === "new" && (
                  <button onClick={() => handleStatus(enquiry.id, "contacted")} className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200" title="Mark Contacted">
                    <CheckCircle size={16} />
                  </button>
                )}
                {enquiry.status === "contacted" && (
                  <button onClick={() => handleStatus(enquiry.id, "closed")} className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200" title="Close">
                    <CheckCircle size={16} />
                  </button>
                )}
                <button onClick={() => handleDelete(enquiry.id)} className="p-2 rounded-lg bg-red-100 text-danger hover:bg-red-200" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {selected?.id === enquiry.id && enquiry.message && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted font-medium mb-1">Message:</p>
                <p className="text-sm text-primary">{enquiry.message}</p>
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted text-center py-10">No enquiries found.</p>}
      </div>
    </div>
  );
}
