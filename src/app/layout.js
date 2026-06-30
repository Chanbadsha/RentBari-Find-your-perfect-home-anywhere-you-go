import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/Provider/ThemeProviders";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RentBari | Trusted Rental Property Platform",
  description:
    "Explore verified rental properties, apartments, and homes across Bangladesh. RentBari helps tenants and property owners connect seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-mainBackground text-foreground flex flex-col">
        <ThemeProviders>
          <Analytics />
          <Toaster />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
