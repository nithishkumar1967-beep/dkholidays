"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, onAuthChange } from "@/lib/auth";
import toast from "react-hot-toast";

async function checkAdmin(uid: string) {
  const res = await fetch("/api/auth/sync?uid=" + uid);
  if (!res.ok) return null;
  const data = await res.json();
  return data.user || null;
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const fbUser = await loginAdmin(email, password);
      let adminUser = await checkAdmin(fbUser.uid);
      if (!adminUser) {
        const res = await fetch("/api/auth/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: fbUser.uid, email: fbUser.email }),
        });
        const result = await res.json();
        if (!res.ok || result.error) {
          toast.error("Login failed. Please contact the administrator.", { duration: 5000 });
          return;
        }
        adminUser = await checkAdmin(fbUser.uid);
        if (!adminUser) {
          toast.error("Login failed. Please contact the administrator.", { duration: 5000 });
          return;
        }
      }
      toast.success("Welcome back!");
      setTimeout(() => { window.location.href = "/admin"; }, 500);
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary-light p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-xl font-extrabold text-white">
            DK
          </div>
          <h1 className="text-2xl font-extrabold text-primary">Admin Login</h1>
          <p className="text-sm text-muted mt-1">DK Holidays CMS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@dkholidays.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
              autoFocus
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
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
            ) : null}
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-muted hover:text-accent transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
