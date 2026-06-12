"use client";

import { useEffect, useState } from "react";
import { Trash2, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUsers, updateUserRole, deleteUser } from "@/lib/supabase-admin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { canManageUsers } from "@/lib/auth";
import type { User } from "@/lib/types";

const ROLE_ICON: Record<string, React.ReactNode> = {
  super_admin: <ShieldAlert size={16} />,
  admin: <ShieldCheck size={16} />,
  editor: <Shield size={16} />,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAdminAuth();

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setUsers(await getUsers());
    setLoading(false);
  };

  const handleRoleChange = async (id: string, role: User["role"]) => {
    await updateUserRole(id, role);
    toast.success("Role updated!");
    loadUsers();
  };

  const handleDelete = async (id: string) => {
    if (id === currentUser?.id) {
      toast.error("You cannot delete your own account.");
      return;
    }
    const target = users.find((u) => u.id === id);
    if (target?.role === "super_admin") {
      const otherSuperAdmins = users.filter(
        (u) => u.role === "super_admin" && u.id !== id
      );
      if (otherSuperAdmins.length === 0) {
        toast.error("Cannot delete the last super admin.");
        return;
      }
    }
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    await deleteUser(id);
    toast.success("User deleted.");
    loadUsers();
  };

  const isSuperAdmin = currentUser && canManageUsers(currentUser.role);

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-32 bg-gray-200 rounded" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Admin Users</h1>
        <p className="text-sm text-muted">Manage admin accounts and roles. First user is super admin.</p>
      </div>

      {!isSuperAdmin && (
        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-700 mb-6">
          Only Super Admins can manage users.
        </div>
      )}

      <div className="space-y-3">
        {users.map((u) => (
          <Card key={u.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                  {u.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">{u.email}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={u.role === "super_admin" ? "danger" : u.role === "admin" ? "info" : "default"}>
                      <span className="flex items-center gap-1">
                        {ROLE_ICON[u.role]}
                        {u.role.replace("_", " ")}
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>

              {isSuperAdmin && currentUser?.id !== u.id && (
                <div className="flex items-center gap-2">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as User["role"])}
                    className="text-xs py-1 px-2"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-danger"
                    title="Delete User"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
              {isSuperAdmin && currentUser?.id === u.id && (
                <span className="text-xs text-muted italic">(you)</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
