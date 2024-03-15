import localFont from "next/font/local";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

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
