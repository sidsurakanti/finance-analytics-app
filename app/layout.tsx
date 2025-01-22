import type { Metadata } from "next";

import { poppins } from "@/styles/fonts";
import "@/styles/globals.css";

import { ThemeProvider } from "@components/ui/themes";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/base/footer";
import "intro.js/introjs.css";

export const metadata: Metadata = {
  title: "PBD",
  description:
    "A free, simple, clean dashboard to manage your personal finances.",
  metadataBase: new URL("https://pbd.vercel.app"),
  keywords: [
    "dashboard",
    "expenses",
    "personal",
    "management",
    "budgeting",
    "money",
    "free",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen w-full ${poppins.className} overflow-x-hidden antialiased scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
