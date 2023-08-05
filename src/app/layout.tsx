import './globals.css';
import type { Metadata } from 'next';
import { Inter,Montserrat,Montserrat_Alternates } from 'next/font/google';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
      <Navbar/>
      <div className="ml-20">
        <Providers>{children}</Providers>
      </div>
      </body>
    </html>
  );
}
