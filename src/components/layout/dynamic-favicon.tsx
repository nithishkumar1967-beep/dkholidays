"use client";

import { useEffect } from "react";
import { getSiteSettings } from "@/lib/supabase-admin";

export function DynamicFavicon() {
  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (settings?.favicon_url) {
        const existing = document.querySelector('link[rel="icon"]');
        if (existing) existing.setAttribute("href", settings.favicon_url);
      }
    });
  }, []);

  return null;
}
