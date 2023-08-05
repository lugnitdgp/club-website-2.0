import './globals.css';
import { Inter,Montserrat,Montserrat_Alternates } from 'next/font/google';
import Navbar from '@/components/Navbar';
import CustomThemeProvider from '@/providers/Providers';

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
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </div>
      </body>
    </html>
  );
}
