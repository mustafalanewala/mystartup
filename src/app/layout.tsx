import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyStartup News - Latest News & Updates",
  description:
    "Your trusted source for the latest news across business, technology, sports, and world events.",
  keywords:
    "news, business, technology, sports, world, economy, politics, general",
  authors: [{ name: "MyStartup News Team" }],
  openGraph: {
    title: "MyStartup News - Latest News & Updates",
    description:
      "Your trusted source for the latest news across business, technology, sports, and world events.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyStartup News - Latest News & Updates",
    description:
      "Your trusted source for the latest news across business, technology, sports, and world events.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">{children}</body>
    </html>
  );
}
