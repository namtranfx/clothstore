import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/LandingPage/NavBar";

import { Nunito } from 'next/font/google'


export const metadata: Metadata = {
  title: "ClothStore",
  description: "Fashion Ecommerce website",
};
const nunitoFont = Nunito({subsets: ['latin']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoFont.className} > 
        <NavBar/>
        {children} 
        </body>
    </html>
  );
}
