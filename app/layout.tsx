import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Lance Wolfe";
const siteDescription =
  "Official website of Lance Wolfe, a Florida-based live-event operations, staffing, hospitality, and festival professional with nationwide experience.";
const siteImage = "/og.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://lancewolfe.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    type: "website",
    images: [
      {
        url: siteImage,
        alt: "Lance Wolfe personal website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://lancewolfe.com/#website",
              url: "https://lancewolfe.com/",
              name: "Lance Wolfe",
              alternateName: "Lance Wolfe Career Portfolio",
              description: siteDescription,
              inLanguage: "en-US",
              publisher: {
                "@id": "https://lancewolfe.com/#person",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
