import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Othmane Makkour | Full Stack Developer",
  description:
    "Hi, I'm Othmane Makkour, a full stack developer specializing in React.js, Next.js, Laravel, and Node.js. This is my personal portfolio.",
  keywords: [
    "Othmane Makkour",
    "Full Stack Developer",
    "Front end",
    "back end",
    "React Developer",
    "Next.js Portfolio",
    "Laravel Developer",
    "Web Developer Morocco",
  ],
  authors: [{ name: "Othmane Makkour" }],
  creator: "Othmane Makkour",
  openGraph: {
    title: "Othmane Makkour | Full Stack Developer",
    description:
      "Explore the portfolio of Othmane Makkour, a full stack developer focused on building modern and performant web applications.",
    url: "https://othmanemakkour.vercel.app",
    siteName: "Othmane Makkour",
    images: [
      {
        url: "https://othmanemakkour.vercel.app/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Othmane Makkour",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://othmanemakkour.vercel.app"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
