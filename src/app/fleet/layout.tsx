import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet",
  description: "Browse DK Holidays' modern fleet of tourist buses, mini buses, SUVs, luxury coaches and more in Coimbatore. 50+ vehicles for every occasion.",
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
