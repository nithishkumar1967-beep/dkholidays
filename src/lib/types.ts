export type UserRole = "super_admin" | "admin" | "editor";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  hero_stats: string;
  meta_title: string;
  meta_description: string;
  why_choose_us_heading: string;
  why_choose_us_items: string;
  about_title: string;
  about_description: string;
  about_mission_title: string;
  about_mission_desc: string;
  about_vision_title: string;
  about_vision_desc: string;
  about_image: string;
  about_hero_title: string;
  about_hero_subtitle: string;
  about_story_heading: string;
  about_story_paragraphs: string;
  about_stats: string;
  about_stat_labels: string;
  about_stat_icons: string;
  about_values: string;
  fleet_hero_title: string;
  fleet_hero_subtitle: string;
  services_hero_title: string;
  services_hero_subtitle: string;
  gallery_hero_title: string;
  gallery_hero_subtitle: string;
  gallery_categories: string;
  contact_hero_title: string;
  contact_hero_subtitle: string;
  packages_hero_title: string;
  packages_hero_subtitle: string;
  favicon_url: string;
  updated_at: string;
}

export interface Fleet {
  id: string;
  title: string;
  description: string;
  image_url: string;
  capacity: string;
  vehicle_type: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon: string;
  features: unknown;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string;
  display_order: number;
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  review: string;
  rating: number;
  approved: boolean;
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface Package {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: string;
  places: string;
  image_url: string;
  itinerary: string;
  included: string;
  not_included: string;
  published: boolean;
  display_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  published: boolean;
  created_at: string;
}
