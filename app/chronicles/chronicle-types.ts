export type ChronicleSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  link?: { href: string; label: string };
};

export type ChronicleEntry = {
  slug: string;
  title: string;
  date: string;
  sortDate: string;
  storyYear: number;
  storyPeriod?: string;
  tag: string;
  readTime: string;
  excerpt: string;
  featuredSummary: string;
  image?: string;
  imageAlt?: string;
  privacyNote?: string;
  sections: ChronicleSection[];
};
