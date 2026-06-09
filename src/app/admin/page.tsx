"use client";

import { useEffect, useState } from "react";
import {
  Bus,
  ConciergeBell,
  Images,
  Star,
  MessageSquare,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { getDashboardStats } from "@/lib/supabase-admin";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFleet: 0,
    totalServices: 0,
    totalGallery: 0,
    totalReviews: 0,
    newEnquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const cards = [
    { icon: Bus, label: "Total Fleet", value: stats.totalFleet, color: "text-blue-600 bg-blue-100" },
    { icon: ConciergeBell, label: "Total Services", value: stats.totalServices, color: "text-purple-600 bg-purple-100" },
    { icon: Images, label: "Gallery Images", value: stats.totalGallery, color: "text-pink-600 bg-pink-100" },
    { icon: Star, label: "Total Reviews", value: stats.totalReviews, color: "text-yellow-600 bg-yellow-100" },
    { icon: MessageSquare, label: "New Enquiries", value: stats.newEnquiries, color: "text-green-600 bg-green-100" },
    { icon: TrendingUp, label: "Total Enquiries", value: 0, color: "text-orange-600 bg-orange-100" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Dashboard</h1>
        <p className="text-sm text-muted">Welcome to DK Holidays admin panel.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted font-medium">{card.label}</p>
                  {loading ? (
                    <div className="h-7 w-16 mt-1 animate-pulse rounded bg-gray-200" />
                  ) : (
                    <p className="text-2xl font-extrabold text-primary mt-1">{card.value}</p>
                  )}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
