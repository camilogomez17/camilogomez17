import "./globals.css";

import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.c6m1lo.com";

const valencia = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-valencia",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Camilo Valencia — Software Engineer",
    template: "%s | Camilo Valencia",
  },
  description:
    "Camilo Valencia is a software engineering student building web applications with TypeScript, React, and Next.js while learning Python for backend development.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Camilo Gomez", "C6m1lo", "software engineering", "resume", "TypeScript", "React", "Python"],
  openGraph: {
    title: "Camilo Valencia — Software Engineering",
    description:
      "Software engineering portfolio for Camilo Valencia.",
    url: SITE_URL,
    siteName: "c6m1lo",
    images: [
      {
        url: `${SITE_URL}/sistineChapel.jpg`,
        width: 1200,
        height: 630,
        alt: "c6m1lo — Sistine Chapel",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={valencia.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9659879669905345"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <nav className="top-nav" aria-label="Primary">
          <div className="content top-nav-inner">
            <div className="nav-links">
              <Link className="nav-link" href="/">
                Home
              </Link>
              <Link className="nav-link" href="/resume">
                Resume
              </Link>
              <Link className="nav-link" href="/projects">
                Projects
              </Link>
            </div>
          </div>
        </nav>

        <main id="main-content" className="app-main" tabIndex={-1}>
          <div className="content">{children}</div>
        </main>

        <footer className="site-footer">
          <div className="content footer-row">
            <p>
              © {new Date().getFullYear()} CAMILO VALENCIA. All rights reserved.
            </p>
            <div className="footer-links">
              <a className="footer-link" href="/privacy">
                Privacy Policy
              </a>
              <a className="footer-link" href="/support">
                Support
              </a>
              <a className="footer-link" href="/tos">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
