import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { DynamicFavicon } from "@/components/layout/dynamic-favicon";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "DK Holidays – Best Travels in Coimbatore | Tours & Travel Agency",
    template: "%s | DK Holidays Coimbatore",
  },
  description:
    "DK Holidays is the best travel agency in Coimbatore offering tours and travels, tourist bus rental, holiday packages, family tours, corporate transport, airport pickup & wedding transport. Call +91 9944890203.",
  keywords: [
    "DK Holidays",
    "DK Holidays Coimbatore",
    "best travels in coimbatore",
    "tours and travels in coimbatore",
    "best travel agency in coimbatore",
    "travel agency coimbatore",
    "tour operator coimbatore",
    "holiday packages coimbatore",
    "tour packages from coimbatore",
    "family tour packages coimbatore",
    "affordable travel agency coimbatore",
    "tourist bus rental coimbatore",
    "DK Holidays Travels",
    "DK Holidays Tours and Travels",
    "DK Holidays Travel Agency",
    "DK Holidays Tamil Nadu",
    "DK Holidays Tour Packages",
    "DK Holidays Holiday Packages",
    "DK Holidays Contact Number",
    "DK Holidays Travel Planner",
    "coimbatore travels",
    "bus booking coimbatore",
    "corporate transport coimbatore",
    "airport pickup coimbatore",
    "wedding transport coimbatore",
    "ooty tour package from coimbatore",
    "kodaikanal tour package from coimbatore",
    "kerala tour package from coimbatore",
    "munnar tour package from coimbatore",
    "south india tour packages",
    "weekend getaway packages coimbatore",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dd-sepia-nine.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DK Holidays",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "DK Holidays – Best Travels in Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-white antialiased">
        <DynamicFavicon />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
