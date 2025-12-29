import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🔥 FIX: relative import + extension
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
