import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Wangaratta Car Cleaning | Mobile & Studio Auto Detailing Wangaratta VIC",
  description: "Premier vehicle detailing across Wangaratta and North East Victoria. Interior steam extraction, multi-stage paint correction, ceramic coatings, and pre-sale preparation. Call 0479 107 101.",
  keywords: [
    "Wangaratta Car Cleaning",
    "Car Detailing Wangaratta",
    "Auto Detailing Wangaratta VIC 3677",
    "Paint Correction Wangaratta",
    "Ceramic Coating Wangaratta",
    "Car Wash Wangaratta",
    "Interior Steam Clean Car Wangaratta",
    "Mobile Car Detailing North East Victoria"
  ],
  openGraph: {
    title: "Wangaratta Car Cleaning | Auto Detailing & Ceramic Protection",
    description: "Professional interior deep cleans, exterior machine polishing, and ceramic coating protection in Wangaratta & North East VIC.",
    type: "website",
    locale: "en_AU",
    siteName: "Wangaratta Car Cleaning",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
