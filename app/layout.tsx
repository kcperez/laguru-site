import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "La Guru",
  description: "Colombian. Miami. Latin hip-hop & R&B.",
  openGraph: {
    title: "La Guru",
    description: "Colombian. Miami. Latin hip-hop & R&B.",
    images: ["/images/laguru-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${outfit.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
