import type { Metadata } from "next";

import "@/styles/globals.css";
import { poppins } from "@/styles/fonts";
import { ThemeProvider } from "@components/ui/themes";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`h-screen w-full ${poppins.className} overflow-y-auto antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
