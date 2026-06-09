"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  getFleet,
  createFleetItem,
  updateFleetItem,
  deleteFleetItem,
} from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { Fleet } from "@/lib/types";

export default function AdminFleetPage() {
  const [items, setItems] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Fleet | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    capacity: "",
    vehicle_type: "bus",
    display_order: 0,
    active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getFleet();
    setItems(data);
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", capacity: "", vehicle_type: "bus", display_order: 0, active: true });
    setImageFile(null);
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Vehicle name is required.");
      return;
    }
    setUploading(true);
    let imageUrl = editing?.image_url || "";

    if (imageFile) {
      const url = await uploadImage("fleet-images", imageFile, "fleet");
      if (url) imageUrl = url;
    }

    if (editing) {
      await updateFleetItem(editing.id, { ...form, image_url: imageUrl });
      toast.success("Vehicle updated!");
    } else {
      const maxOrder = items.reduce((max, i) => Math.max(max, i.display_order), 0);
      await createFleetItem({ ...form, image_url: imageUrl, display_order: maxOrder + 1 });
      toast.success("Vehicle added!");
    }
    setUploading(false);
    resetForm();
    loadItems();
  };

  const handleEdit = (item: Fleet) => {
    setForm({
      title: item.title,
      description: item.description,
      capacity: item.capacity,
      vehicle_type: item.vehicle_type,
      display_order: item.display_order,
      active: item.active,
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    await deleteFleetItem(id);
    toast.success("Vehicle deleted.");
    loadItems();
  };

  const toggleActive = async (item: Fleet) => {
    await updateFleetItem(item.id, { active: !item.active });
    loadItems();
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Fleet Management</h1>
          <p className="text-sm text-muted">Manage your vehicle fleet.</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }} variant="accent">
          <Plus size={16} /> {showForm ? "Cancel" : "Add Vehicle"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 p-6">
          <h2 className="font-bold text-primary mb-4">{editing ? "Edit Vehicle" : "Add New Vehicle"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <Input label="Vehicle Name *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input label="Capacity (e.g. 40-52 Seats)" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
            <div>
              <label>Vehicle Type</label>
              <select value={form.vehicle_type} onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} className="w-full">
                <option value="bus">Bus</option>
                <option value="minibus">Mini Bus</option>
                <option value="suv">SUV</option>
                <option value="tempo">Tempo Traveller</option>
                <option value="luxury">Luxury Coach</option>
                <option value="car">Car</option>
              </select>
            </div>
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
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-primary">{item.title}</h3>
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
            <p className="text-xs text-muted mb-1">Capacity: {item.capacity}</p>
            <p className="text-xs text-muted mb-1">Type: {item.vehicle_type}</p>
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {item.active ? "Active" : "Hidden"}
            </span>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted col-span-full text-center py-10">No vehicles yet. Add your first vehicle!</p>
        )}
      </div>
    </div>
  );
}
