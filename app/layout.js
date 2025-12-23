import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "मेधा बुक्स - हिंदी साहित्य का भंडार | Medha Books Shahdara Delhi",
  description: "मेधा बुक्स शाहदरा, दिल्ली - हिंदी उपन्यास, कविता संग्रह, कहानी, आलोचना और साहित्यिक पुस्तकों का विशाल संग्रह। ऑनलाइन और ऑफलाइन पुस्तकें खरीदें।",
  keywords: "मेधा बुक्स, हिंदी किताबें, हिंदी साहित्य, उपन्यास, कविता संग्रह, कहानी संग्रह, शाहदरा दिल्ली, hindi books, medha books, shahdara bookstore",
  authors: [{ name: "Medha Books" }],
  creator: "Medha Books",
  publisher: "Medha Books, Shahdara",
  openGraph: {
    title: "मेधा बुक्स - हिंदी साहित्य का भंडार",
    description: "हिंदी उपन्यास, कविता, कहानी और साहित्यिक पुस्तकों का विशाल संग्रह",
    url: "https://www.medhabooks.site",
    siteName: "Medha Books",
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "मेधा बुक्स - हिंदी साहित्य का भंडार",
    description: "हिंदी उपन्यास, कविता, कहानी और साहित्यिक पुस्तकों का विशाल संग्रह",
  },
  alternates: {
    canonical: "https://www.medhabooks.site",
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
  verification: {
    // Google Search Console verification को यहाँ add करें
    // google: 'your-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BookStore",
              "name": "मेधा बुक्स",
              "alternateName": "Medha Books",
              "description": "हिंदी साहित्य की पुस्तकों का विशाल संग्रह",
              "url": "https://www.medhabooks.site",
              "telephone": "+91-98910-22477",
              "email": "medhabooks@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "X-11, Near Shiv Mandir, Mohan Park",
                "addressLocality": "Shahdara",
                "addressRegion": "Delhi",
                "postalCode": "110032",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.6863,
                "longitude": 77.2885
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "10:00",
                "closes": "20:00"
              },
              "priceRange": "₹₹",
              "paymentAccepted": "Cash, UPI, Card",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=100089726817350"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}