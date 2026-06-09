"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getServices, createService, updateService, deleteService } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { Service } from "@/lib/types";

const SERVICE_ICONS = ["Bus", "Briefcase", "Plane", "Users", "BookOpen", "Heart", "ShieldCheck", "MapPin", "Headphones"];

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: "", description: "", icon: "Bus", features: "[]", display_order: 0, active: true });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    setItems(await getServices());
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", icon: "Bus", features: "[]", display_order: 0, active: true });
    setImageFile(null);
    setEditing(null);
    setShowForm(false);
  };

  const prepareData = (f: typeof form) => ({
    title: f.title,
    description: f.description,
    icon: f.icon,
    features: (() => { try { return JSON.parse(f.features); } catch { return []; } })(),
    display_order: f.display_order,
    active: f.active,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { toast.error("Service name is required."); return; }
    setUploading(true);
    let imageUrl = editing?.image_url || "";
    if (imageFile) {
      const url = await uploadImage("service-images", imageFile, "services");
      if (url) imageUrl = url;
    }
    const data = prepareData(form);
    if (editing) {
      await updateService(editing.id, { ...data, image_url: imageUrl });
      toast.success("Service updated!");
    } else {
      const maxOrder = items.reduce((max, i) => Math.max(max, i.display_order), 0);
      await createService({ ...data, image_url: imageUrl, display_order: maxOrder + 1 });
      toast.success("Service added!");
    }
    setUploading(false);
    resetForm();
    loadItems();
  };

  const handleEdit = (item: Service) => {
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon || "Bus",
      features: JSON.stringify(item.features || []),
      display_order: item.display_order,
      active: item.active,
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await deleteService(id);
    toast.success("Service deleted.");
    loadItems();
  };

  const toggleActive = async (item: Service) => {
    await updateService(item.id, { active: !item.active });
    loadItems();
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Services Management</h1>
          <p className="text-sm text-muted">Manage your travel services.</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }} variant="accent">
          <Plus size={16} /> {showForm ? "Cancel" : "Add Service"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 p-6">
          <h2 className="font-bold text-primary mb-4">{editing ? "Edit Service" : "Add New Service"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <Input label="Service Name *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div>
              <label>Icon</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full">
                {SERVICE_ICONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <TextArea label={"Features (JSON array, e.g. [\"Feature 1\", \"Feature 2\"])"} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} />
            <div>
              <label>Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              <label className="mb-0">Active</label>
            </div>
            <div className="flex gap-3">
              <Button type="submit" loading={uploading}>{editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-primary">{item.title}</h3>
                <span className="text-[10px] text-muted">Icon: {item.icon || "Bus"}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleActive(item)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted" title={item.active ? "Hide" : "Show"}>
                  {item.active ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted" title="Edit">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-danger" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {item.active ? "Active" : "Hidden"}
            </span>
          </Card>
        ))}
        {items.length === 0 && <p className="text-sm text-muted col-span-full text-center py-10">No services yet.</p>}
      </div>
    </div>
  );
}
