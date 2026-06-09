"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPackages, deletePackage, updatePackage } from "@/lib/supabase-admin";
import { formatDate } from "@/lib/utils";
import type { Package } from "@/lib/types";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setPackages(await getPackages());
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    await deletePackage(id);
    toast.success("Package deleted.");
    load();
  };

  const togglePublish = async (pkg: Package) => {
    await updatePackage(pkg.id, { published: !pkg.published });
    toast.success(pkg.published ? "Package unpublished." : "Package published!");
    load();
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Package Management</h1>
          <p className="text-sm text-muted">Create and manage tour packages.</p>
        </div>
        <Link href="/admin/packages/new">
          <Button variant="accent"><Plus size={16} /> New Package</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-primary">{pkg.title}</h3>
                  <Badge variant={pkg.published ? "success" : "warning"}>
                    {pkg.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(pkg.created_at)}</span>
                  <span>{pkg.duration}</span>
                  <span>{pkg.price}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => togglePublish(pkg)} className="p-2 rounded-lg hover:bg-gray-100 text-muted" title={pkg.published ? "Unpublish" : "Publish"}>
                  {pkg.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <Link href={`/admin/packages/${pkg.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-muted" title="Edit">
                  <Edit2 size={16} />
                </Link>
                <button onClick={() => handleDelete(pkg.id)} className="p-2 rounded-lg hover:bg-gray-100 text-danger" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {packages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted mb-4">No packages yet.</p>
            <Link href="/admin/packages/new"><Button variant="accent"><Plus size={16} /> Create First Package</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
