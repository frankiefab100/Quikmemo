import "../styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quikmemo | Note-Taking App",
  description:
    "A modern and elegant note-taking app designed to help users capture, organize, and manage their notes efficiently.",
  applicationName: "Quikmemo",
  themeColor: "#000000",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
  ],
  manifest: "/manifest.json",
  keywords: [
    "note-taking",
    "productivity",
    "organization",
    "task management",
    "event planning ",
    "project management",
    "personal journaling",
    "creative writing",
    "brainstorming sessions",
    "notes",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  authors: [{ name: "Franklin Ohaegbulam", url: "https://frankiefab.com" }],
  openGraph: {
    title: "Quikmemo | Note-Taking App",
    description:
      "A modern and elegant note-taking app designed to help users capture, organize, and manage their notes efficiently.",
    url: "https://quikmemo.vercel.app/",
    siteName: "Quikmemo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Quikmemo",
      },
    ],
  },
  twitter: {
    title: "Quikmemo | Note-Taking App",
    description:
      "A modern and elegant note-taking app designed to help users capture, organize, and manage their notes efficiently.",
    card: "summary_large_image",
    creator: "@frankiefab100",
    site: "https://frankiefab.com",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Quikmemo",
      },
    ],
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
        <link
          rel="apple-touch-icon"
          href="/favicon/android-chrome-192x192.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Quikmemo PWA App" />
      </head>
      <body className={`${montserrat.className} bg-white`}>
        <SessionProvider>{children}</SessionProvider>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.UMAMI_WEBSITE_ID}
        />
      </body>
    </html>
  );
}
