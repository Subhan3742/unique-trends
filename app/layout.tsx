import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniqueTrends",
  description: "Premium watches and jewelry",
  icons: [
    { rel: "icon", url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23111'/><polygon points='16,4 24,4 28,16 24,28 16,28 12,16' fill='none' stroke='%23fff' stroke-width='1.5'/><polygon points='16,4 24,4 20,11' fill='%23fff'/><polygon points='16,28 24,28 20,21' fill='%23fff'/></svg>", type: "image/svg+xml" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
