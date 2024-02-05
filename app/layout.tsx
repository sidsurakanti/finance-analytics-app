import type { Metadata } from "next";

import "@ui/styles/globals.css";
import { poppins } from "@ui/styles/fonts";
import NavBar from "@/ui/components/NavBar";

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
      <body
        className={`h-screen w-full ${poppins.className} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
