import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";

const overusedgrotesk = localFont({
  src: [
    {
      path: "../public/fonts/OverusedGrotesk-VF.woff2",
    },
  ],
  display: "block",
  variable: "--font-overusedgrotesk",
});

export const metadata = {
  metadataBase: new URL("https://meme.own3r.me"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Meme Finder",
  description:
    "A great project to keep track of your Memes!",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({ children }) {
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
