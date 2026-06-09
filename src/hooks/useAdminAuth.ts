"use client";

import { useEffect, useState } from "react";
import { onAuthChange, logoutAdmin } from "@/lib/auth";
import type { User } from "@/lib/types";

async function fetchAdminUser(uid: string): Promise<User | null> {
  try {
    const res = await fetch("/api/auth/sync?uid=" + uid);
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<import("firebase/auth").User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const adminUser = await fetchAdminUser(fbUser.uid);
        setUser(adminUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return { user, firebaseUser, loading, logout: logoutAdmin };
}

export function useRequireAdmin() {
  const { user, loading } = useAdminAuth();
  return { user, loading, isAuthenticated: !!user };
}
