import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tapovan-menu.vercel.app"),
  title: {
    default: "Tapovan Menu",
    template: "%s | Tapovan Menu"
  },
  description: "Mobile-first live menu webapp for Tapovan cafes, hotels and hostels.",
  openGraph: {
    title: "Tapovan Menu",
    description: "Mobile-first live menu webapp for Tapovan cafes, hotels and hostels.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
