import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'محمد عبدالعليم داود - عضو البرلمان',
  description: 'الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود - مقالات، أخبار، وأنشطة برلمانية',
  keywords: ['محمد عبدالعليم داود', 'صحفي', 'برلمان', 'مقالات', 'سياسة', 'إعلام'],
  authors: [{ name: 'محمد عبدالعليم داود' }],
  creator: 'محمد عبدالعليم داود',
  publisher: 'محمد عبدالعليم داود',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mohammed-journalist.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'محمد عبدالعليم داود - عضو البرلمان',
    description: 'الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود',
    url: 'https://mohammed-journalist.com',
    siteName: 'محمد عبدالعليم داود',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'محمد عبدالعليم داود',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'محمد عبدالعليم داود - عضو البرلمان',
    description: 'الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${tajawal.className} font-arabic`}>
        {children}
      </body>
    </html>
  );
}