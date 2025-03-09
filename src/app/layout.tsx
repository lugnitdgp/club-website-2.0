import "./globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import StateProvider from "@/providers/StateProvider";
import LayoutProvider from "@/providers/LayoutProvider";

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
    <html lang="en scroll-smooth" className="overflow-x-hidden">
      <body
        data-scroll-container
        className={montserrat.className + "  overflow-x-hidden"}
        id="page-wrap no-scrollbar relative"
      >
        <StateProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </StateProvider>
      </body>
    </html>
  );
}
