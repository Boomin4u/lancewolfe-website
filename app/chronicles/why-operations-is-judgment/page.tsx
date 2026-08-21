import type { Metadata } from "next";
import { ChronicleArticle } from "../chronicle-article";
import { chronicles, getChronicleIndex } from "../chronicles-data";
import entry from "../entries/why-operations-is-judgment";

export const metadata: Metadata = {
  title: `Lance Wolfe | ${entry.title}`,
  description: entry.excerpt,
};

export default function WhyOperationsIsJudgmentPage() {
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
