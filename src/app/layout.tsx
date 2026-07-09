import "./globals.css";
import "@/styles/staggered-menu.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import StateProvider from "@/providers/StateProvider";
import LayoutProvider from "@/providers/LayoutProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

import  AIAssistant  from "@/components/AIAssistant"

export const metadata: Metadata = {
  title: {
    default: "GNU/Linux Users Group",
    template: "%s | GNU/Linux Users Group",
  },
  description: "Official website of GNU/Linux Users Group, NIT Durgapur",
};

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth" suppressHydrationWarning>
      <body
        data-scroll-container
        className={montserrat.className + " overflow-x-hidden"}
        id="page-wrap"
      >
        <ThemeProvider>
          <StateProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </StateProvider>

          <AIAssistant/>
          
        </ThemeProvider>
      </body>
    </html>
  );
}