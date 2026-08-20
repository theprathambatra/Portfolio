import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const display = Newsreader({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://theprathambatra.com"),
  title: { default: "Pratham Batra | Websites, brands and digital systems", template: "%s | Pratham Batra" },
  description: "The portfolio of Pratham Batra, a website builder and multidisciplinary digital creative.",
  openGraph: { title: "Pratham Batra", description: "Websites, brands and practical digital systems built with personality.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>
    <a className="skip" href="#main">Skip to content</a>
    <header className="siteHeader"><Link className="wordmark" href="/" aria-label="Pratham Batra, home">PB<span>.</span></Link><nav aria-label="Primary"><Link href="/">Home</Link><Link href="/work">Work Orbit</Link><Link href="/music">Music Vault</Link><Link href="/contact">Contact</Link></nav></header>
    {children}
  </body></html>;
}
