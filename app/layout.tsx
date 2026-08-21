import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Lance Wolfe";
const siteDescription =
  "Personal site for Lance Wolfe, with resumes, chronicles, and career information.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lancewolfe.com"),
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
        url: "/profile-picture.jpg",
        alt: "Lance Wolfe portrait",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/profile-picture.jpg"],
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