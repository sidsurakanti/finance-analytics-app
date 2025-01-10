import type { Metadata } from "next";

import { poppins } from "@/styles/fonts";
import "@/styles/globals.css";

import { ThemeProvider } from "@components/ui/themes";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A simple, clean dashboard to manage your personal finances.",
  metadataBase: new URL("https://pbd.vercel.app"),
  keywords: [
    "dashboard",
    "expenses",
    "personal",
    "management",
    "budgeting",
    "money",
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
        className={`min-h-screen w-full ${poppins.className} overflow-x-hidden antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
