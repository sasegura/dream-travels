import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { StoreProvider } from './storeProvider';

const oakesSans = localFont({
  src: './fonts/oakes-grotesk-regular.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Dream Travels',
  description: 'Dream Travels App',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StoreProvider>
        <body className={`${oakesSans.variable}`}>
          {children}
          {modal}
        </body>
      </StoreProvider>
    </html>
  );
}
