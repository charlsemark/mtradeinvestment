
import './globals.css';
import GlobalState from '@/context';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import WithdrawalNotifications from '@/components/Alerts/WithdrawalNotifications';
import LanguageTranslate from '@/components/LanguageTranslate';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Spiketraderfx - Built for investors interested in high yields, stable returns and also high liquidity.',
  description: 'Invest with confidence on worlds leading asset management and investment platform.',
  icons: {
    icon: '/favicon.ico', // Assuming the favicon is in the public directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <LanguageTranslate />
        <GlobalState>
          <Navbar />
          <WithdrawalNotifications className="toast-container" />

          <main className="flex flex-col min-h-screen">
            {children}
          </main>
          {/* <Footer /> */}
          
        </GlobalState>
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        ></script>

      </body>
    </html>
  );
}
