import type { Metadata } from "next";

import "@ui/styles/globals.css";
import { poppins } from "@ui/styles/fonts";
import Nav from "@/ui/components/Nav";

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
        <Nav />
        {children}
      </body>
    </html>
  );
}
