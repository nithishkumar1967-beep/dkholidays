"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Bus,
  ConciergeBell,
  Images,
  Star,
  MessageSquare,
  FileText,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Home,
  Info,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Home, label: "Home", href: "/admin/home" },
  { icon: Info, label: "About", href: "/admin/about" },
  { icon: Bus, label: "Fleet", href: "/admin/fleet" },
  { icon: ConciergeBell, label: "Services", href: "/admin/services" },
  { icon: Images, label: "Gallery", href: "/admin/gallery" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
  { icon: FileText, label: "Packages", href: "/admin/packages" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: Users, label: "Users", href: "/admin/users" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white transform transition-transform duration-200 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-extrabold">
              DK
            </div>
            <span className="text-sm font-bold">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="text-xs text-white/50 mb-2 px-3">
            {user.email}
            <br />
            <span className="capitalize">{user.role}</span>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted hover:text-primary"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
            >
              <ChevronLeft size={14} />
              View Site
            </Link>
            <span className="text-xs text-muted capitalize px-2 py-1 rounded bg-gray-100">
              {user.role.replace("_", " ")}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
