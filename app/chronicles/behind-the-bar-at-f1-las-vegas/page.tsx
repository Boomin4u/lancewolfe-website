import type { Metadata } from "next";
import { ChronicleArticle } from "../chronicle-article";
import { chronicles, getChronicleIndex } from "../chronicles-data";
import entry from "../entries/behind-the-bar-at-f1-las-vegas";
import { buildPageMetadata } from "../../seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Lance Wolfe | ${entry.title}`,
  description: entry.excerpt,
  path: `/chronicles/${entry.slug}/`,
  image: entry.image,
  imageAlt: entry.imageAlt,
});

export default function BehindTheBarAtF1LasVegasPage() {
  const currentIndex = getChronicleIndex(entry.slug);
  const previousEntry = chronicles[currentIndex - 1];
  const nextEntry = chronicles[currentIndex + 1];

  return (
    <ChronicleArticle
      entry={entry}
      previousHref={previousEntry ? `/chronicles/${previousEntry.slug}/` : undefined}
      previousTitle={previousEntry?.title}
      nextHref={nextEntry ? `/chronicles/${nextEntry.slug}/` : undefined}
      nextTitle={nextEntry?.title}
    />
  );
}
