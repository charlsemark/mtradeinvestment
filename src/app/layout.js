
import './globals.css';
import GlobalState from '@/context';
import Navbar from '@/components/Navbar';
import WithdrawalNotifications from '@/components/Alerts/WithdrawalNotifications';
import LanguageTranslate from '@/components/LanguageTranslate';
import Script from 'next/script';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Spiketraderfx - Built for investors interested in high yields, stable returns and also high liquidity.',
  description: 'Invest with confidence on worlds leading asset management and investment platform.',
  icons: {
    icon: '/favicon.ico',
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
         <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/66c7b0fb50c10f7a009f7709/1i5u0mm2k';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
      </body>
    </html>
  );
}
