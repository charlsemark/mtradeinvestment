
import './globals.css';
import GlobalState from '@/context';
import Navbar from '@/components/Navbar';
import WithdrawalNotifications from '@/components/Alerts/WithdrawalNotifications';
import LanguageTranslate from '@/components/LanguageTranslate';
import { useEffect } from 'react';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Spiketraderfx - Built for investors interested in high yields, stable returns and also high liquidity.',
  description: 'Invest with confidence on worlds leading asset management and investment platform.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/66c7b0fb50c10f7a009f7709/1i5u0mm2k';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
