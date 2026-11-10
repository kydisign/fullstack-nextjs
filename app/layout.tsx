// import metadata type from next
import type { Metadata } from "next";

// import global styles
import "./globals.css";

// import font
import { Quicksand } from "next/font/google";

// init font
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

// import Navbar component
import Navbar from "@/components/layout/navbar";

// define metadata for the application
export const metadata: Metadata = {
  title: "FullStack Next.js - Kydimac",
  description: "Belajar Next.js dari dasar hingga mahir bersama Kydimac",
};

// define the root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-zinc-100`}>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
