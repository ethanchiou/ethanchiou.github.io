import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Ethan Chiou | Portfolio",
  description: "Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <main className="pt-20 px-6 w-full w-full sm:w-[80%] lg:w-[55%] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
