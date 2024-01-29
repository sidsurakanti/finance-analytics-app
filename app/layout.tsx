import type { Metadata } from "next";

import "@/app/ui/globals.css";
import { poppins } from "@/app/ui/fonts";
import NavBar from "@/app/ui/NavBar"

export const metadata: Metadata = {
  title: "Prototype",
  description: "Wolhaikso - 1/26/2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen ${poppins.className} antialiased overflow-hidden`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
