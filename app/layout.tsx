"use client";

import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { useState } from "react";

import { Footer, Navbar } from "@/components";
import StoreProvider from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggle, setToggle] = useState(false);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
        <StoreProvider>
          <main className="flex flex-col gap-16 min-h-screen">
            <Navbar {...{ setToggle }} />
            {children}
            <Footer />
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
