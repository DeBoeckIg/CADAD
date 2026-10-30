import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "CADAD · Software con identidad local, hecho en Tucumán";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · CADAD" },
  description: site.description,
  applicationName: "CADAD",
  keywords: ["CADAD", "VetNet", "software a medida", "Tucumán", "NOA", "gestión veterinaria", "software veterinario"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "CADAD",
    title,
    description: site.description,
    url: "/",
    images: [{ url: "/screens/dashboard.webp", width: 1920, height: 1200, alt: "Panel de VetNet, de CADAD" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/screens/dashboard.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#172554",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
