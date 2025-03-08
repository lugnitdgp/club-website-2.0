import "./globals.css";
import { Montserrat } from "next/font/google";
import CustomThemeProvider from "@/providers/Providers";
import type { Metadata } from "next";
import { DotPattern } from "@/components/magicui/dots";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: {
    default: "GNU/Linux Users' Group",
    template: "%s | GNU/Linux Users' Group",
  },
  description: "Official website of GNU/Linux Users' Group, NIT Durgapur",
};

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en scroll-smooth">
      <body
        data-scroll-container
        className={montserrat.className}
        id="page-wrap no-scrollbar relative"
      >
        <div className=" h-screen w-screen absolute  ">
          <DotPattern className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )} />
        </div>
        <CustomThemeProvider>
          <Navbar />
          <div className=" ">{children}</div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
