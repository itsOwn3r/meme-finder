import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import { Viewport } from "next";

const overusedgrotesk = localFont({
  src: [
    {
      path: "../public/fonts/OverusedGrotesk-VF.woff2",
    },
  ],
  display: "block",
  variable: "--font-overusedgrotesk",
});

const APP_NAME = "Meme Finder";
const APP_DEFAULT_TITLE = "Meme Finder";
const APP_TITLE_TEMPLATE = "%s - Meme Finder";
const APP_DESCRIPTION = "A great project to keep track of your Memes!";

export const metadata = {
  metadataBase: new URL("https://meme.own3r.me"),
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${overusedgrotesk.variable}`}>
      <head>
        <link rel="canonical" href="https://own3r.me" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-overusedgrotesk antialiased bg-bg section-padding  text-accent box-border">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
