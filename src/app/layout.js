// import { Inter } from 'next/font/google';
import './globals.css';
import GlobalState from '@/context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Alert from '@/components/Alerts/WelcomeAlert';
import WithdrawalNotifications from '@/components/Alerts/WithdrawalNotifications';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mutual Trade Investment - Built for investors interested in high yields, stable returns and also high liquidity.',
  description: 'Invest with confidence on worlds leading asset management and investment platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/loh.png" sizes="any" />
      </Head>
      <body>
        <GlobalState>
          <Navbar />
          <WithdrawalNotifications />

          <main className="flex flex-col min-h-screen">
            {children}
          </main>
          {/* <Footer /> */}
        </GlobalState>
      </body>
    </html>
  );
}
