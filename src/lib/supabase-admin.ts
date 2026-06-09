import { supabase } from "./supabase";
import type {
  SiteSettings,
  Fleet,
  Service,
  GalleryImage,
  Review,
  Enquiry,
  BlogPost,
  Package,
  User,
} from "./types";

// ─── Site Settings ───
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  return data;
}

export async function updateSiteSettings(
  id: string | null,
  settings: Record<string, unknown>
) {
  let query = supabase
    .from("site_settings")
    .update({ ...settings, updated_at: new Date().toISOString() });
  if (id) {
    query = query.eq("id", id);
  } else {
    // If no id, update the first row (there should only be one)
    const { data: rows } = await supabase.from("site_settings").select("id").limit(1);
    if (rows && rows.length > 0) {
      query = query.eq("id", rows[0].id);
    } else {
      // No rows exist — insert one
      const { error: insertError } = await supabase
        .from("site_settings")
        .insert({ ...settings, updated_at: new Date().toISOString() });
      return { error: insertError };
    }
  }
  const { error } = await query;
  return { error };
}

// ─── Fleet ───
export async function getFleet(): Promise<Fleet[]> {
  const { data } = await supabase
    .from("fleet")
    .select("*")
    .order("display_order", { ascending: true });
  return data || [];
}

export async function getActiveFleet(): Promise<Fleet[]> {
  const { data } = await supabase
    .from("fleet")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });
  return data || [];
}

export async function createFleetItem(item: Omit<Fleet, "id" | "created_at">) {
  const { error } = await supabase.from("fleet").insert([item]);
  return { error };
}

export async function updateFleetItem(
  id: string,
  item: Partial<Omit<Fleet, "id" | "created_at">>
) {
  const { error } = await supabase.from("fleet").update(item).eq("id", id);
  return { error };
}

export async function deleteFleetItem(id: string) {
  const { error } = await supabase.from("fleet").delete().eq("id", id);
  return { error };
}

// ─── Services ───
export async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });
  return data || [];
}

export async function getActiveServices(): Promise<Service[]> {
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });
  return data || [];
}

export async function createService(item: Omit<Service, "id" | "created_at">) {
  const { error } = await supabase.from("services").insert([item]);
  return { error };
}

export async function updateService(
  id: string,
  item: Partial<Omit<Service, "id" | "created_at">>
) {
  const { error } = await supabase.from("services").update(item).eq("id", id);
  return { error };
}

export async function deleteService(id: string) {
  const { error } = await supabase.from("services").delete().eq("id", id);
  return { error };
}

// ─── Gallery ───
export async function getGallery(): Promise<GalleryImage[]> {
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("display_order", { ascending: true });
  return data || [];
}

export async function createGalleryImage(
  item: Omit<GalleryImage, "id" | "created_at">
) {
  const { error } = await supabase.from("gallery").insert([item]);
  return { error };
}

export async function deleteGalleryImage(id: string) {
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  return { error };
}

export async function updateGalleryImage(
  id: string,
  item: Partial<Omit<GalleryImage, "id" | "created_at">>
) {
  const { error } = await supabase.from("gallery").update(item).eq("id", id);
  return { error };
}

// ─── Reviews ───
export async function getReviews(): Promise<Review[]> {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getApprovedReviews(): Promise<Review[]> {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function createReview(
  item: Omit<Review, "id" | "created_at" | "approved">
) {
  const { error } = await supabase
    .from("reviews")
    .insert([{ ...item, approved: false }]);
  return { error };
}

export async function approveReview(id: string) {
  const { error } = await supabase
    .from("reviews")
    .update({ approved: true })
    .eq("id", id);
  return { error };
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  return { error };
}

// ─── Enquiries ───
export async function getEnquiries(): Promise<Enquiry[]> {
  const { data } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function createEnquiry(
  item: Omit<Enquiry, "id" | "created_at" | "status">
) {
  const { error } = await supabase
    .from("enquiries")
    .insert([{ ...item, status: "new" }]);
  return { error };
}

export async function updateEnquiryStatus(
  id: string,
  status: "new" | "contacted" | "closed"
) {
  const { error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id);
  return { error };
}

export async function deleteEnquiry(id: string) {
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  return { error };
}

// ─── Packages ───
export async function getPackages(): Promise<Package[]> {
  const { data } = await supabase
    .from("packages")
    .select("*")
    .order("display_order", { ascending: true });
  return data || [];
}

export async function getPublishedPackages(): Promise<Package[]> {
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });
  return data || [];
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function createPackage(
  item: Omit<Package, "id" | "created_at">
) {
  const { error } = await supabase.from("packages").insert([item]);
  return { error };
}

export async function updatePackage(
  id: string,
  item: Partial<Omit<Package, "id" | "created_at">>
) {
  const { error } = await supabase.from("packages").update(item).eq("id", id);
  return { error };
}

export async function deletePackage(id: string) {
  const { error } = await supabase.from("packages").delete().eq("id", id);
  return { error };
}

// ─── Blog ───
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function createBlogPost(
  item: Omit<BlogPost, "id" | "created_at">
) {
  const { error } = await supabase.from("blog_posts").insert([item]);
  return { error };
}

export async function updateBlogPost(
  id: string,
  item: Partial<Omit<BlogPost, "id" | "created_at">>
) {
  const { error } = await supabase.from("blog_posts").update(item).eq("id", id);
  return { error };
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  return { error };
}

// ─── Users (super_admin only) ───
export async function getUsers(): Promise<User[]> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function updateUserRole(id: string, role: User["role"]) {
  const { error } = await supabase.from("users").update({ role }).eq("id", id);
  return { error };
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id);
  return { error };
}

// ─── Dashboard Stats ───
export async function getDashboardStats() {
  const [fleet, services, gallery, reviews, enquiries] = await Promise.all([
    supabase.from("fleet").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase
      .from("enquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return {
    totalFleet: fleet.count || 0,
    totalServices: services.count || 0,
    totalGallery: gallery.count || 0,
    totalReviews: reviews.count || 0,
    newEnquiries: enquiries.count || 0,
  };
}
