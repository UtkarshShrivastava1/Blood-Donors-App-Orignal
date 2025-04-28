import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomToast from "@/components/CustomToast"; // ✅ Import the fixed client component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Saviour Blood Donors",
  description:
    "Find and register blood donors across India. Saving lives made simpler.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Ensure proper character encoding */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CustomToast /> {/* ✅ Use the Client Component */}
      </body>
    </html>
  );
}
