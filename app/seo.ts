import type { Metadata } from "next";

const siteTitle = "Lance Wolfe";
const siteDescription =
  "Personal site for Lance Wolfe, with resumes, chronicles, and career information.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/og.png",
  imageAlt = "Lance Wolfe personal website preview",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteTitle,
      type: "website",
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const siteMetadata = {
  title: siteTitle,
  description: siteDescription,
  canonical: "/",
  image: "/og.png",
} as const;
