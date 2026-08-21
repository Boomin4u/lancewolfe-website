import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Lance Wolfe";
const siteDescription =
  "Personal site for Lance Wolfe, with resumes, chronicles, and career information.";
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
        {children}
      </body>
    </html>
  );
}
