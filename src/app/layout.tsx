import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import MusicToggle from "@/components/ui/MusicToggle";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nir and Mango - Our Story",
  description: "A lovely horizontal storytelling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        {children}
        <MusicToggle />
      </body>
    </html>
  );
}
