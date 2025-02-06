import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quikmemo",
  description: "Your modern and elegant note-taking app",
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
  keywords: ["quikmemo", "note-taking", "app"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Quikmemo",
    description: "Your modern and elegant note-taking app",
    url: "URL_ADDRESSikmemo.vercel.app/",
    siteName: "Quikmemo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
        alt: "Quikmemo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quikmemo",
    description: "Your modern and elegant note-taking app",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
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
      <body className={`${raleway.className} bg-white`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
