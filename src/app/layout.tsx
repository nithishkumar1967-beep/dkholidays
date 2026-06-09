import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "DK Holidays – Best Travel & Tourist Bus Rental in Coimbatore",
    template: "%s | DK Holidays",
  },
  description:
    "Coimbatore's #1 travel & tourist bus rental company. Book bus, SUV, van for family trips, corporate tours, airport pickup, school tours & weddings. Call 9944890203.",
  keywords: [
    "best travels in coimbatore",
    "tourist bus rental coimbatore",
    "coimbatore travels",
    "bus booking coimbatore",
    "corporate transport coimbatore",
    "airport pickup coimbatore",
    "DK Holidays",
    "wedding transport coimbatore",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dkholidays.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DK Holidays",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-white antialiased">
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
