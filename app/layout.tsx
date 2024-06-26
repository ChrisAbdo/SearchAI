import type { Metadata } from "next";
import "./globals.css";
import { GeistMono } from "geist/font/mono";

import { AuthProvider } from "@/lib/auth/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import Sidebar from "@/components/layout/sidebar";
import TopNav from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.className} suppressHydrationWarning>
      <AuthProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="pl-[53px]">
              <TooltipProvider delayDuration={0}>
                <Sidebar />
                <TopNav />
                {children}
              </TooltipProvider>
            </div>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
