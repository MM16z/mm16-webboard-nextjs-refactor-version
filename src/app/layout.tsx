'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'

import Navbar from "@/components/navbar/Navbar";
import StoreProvider from "@/redux/providerComponent/storeProvider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          {/* <div className="absolute bottom-0">GIT LOGO IMG</div> */}
        </body>
      </StoreProvider>
    </html>
  );
}


