import type { Metadata } from "next";

import "@/styles/globals.css";
import { poppins } from "@/styles/fonts";
import Nav from "@components/nav";

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
        className={`h-screen w-full ${poppins.className} overflow-y-auto antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
