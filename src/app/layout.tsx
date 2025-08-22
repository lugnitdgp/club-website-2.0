import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import CustomThemeProvider from "@/providers/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "GNU/Linux Users' Group",
    template: "%s | GNU/Linux Users' Group"
  },
  description: "Official website of GNU/Linux Users' Group, NIT Durgapur",

}

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en scroll-smooth">
      <body data-scroll-container className={montserrat.className} id="page-wrap no-scrollbar">
        <CustomThemeProvider>
          <Navbar />
          <div className="md:ml-20 ">{children}</div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}




