import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ScrollToTopBtn from "@/components/ScrollToTop/ScrollToTop";

const inter = Inter({
  variable: "--font-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Rent campervans easily and explore Europe with TravelTrucks",
  openGraph: {
    title: "TravelTrucks",
    description: "Rent campervans easily and explore Europe with TravelTrucks",
    url: "https://travel-trucks-rent-five.vercel.app/",
    siteName: "TravelTrucks",
    images: [
      {
        url: "https://travel-trucks-rent-five.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks campervan rental",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelTrucks",
    description: "Rent campervans easily and explore Europe with TravelTrucks",
    images: ["https://travel-trucks-rent-five.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        {children}

        <ScrollToTopBtn />
      </body>
    </html>
  );
}
