export type ChronicleSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ChronicleEntry = {
  slug: string;
  title: string;
  date: string;
  sortDate: string;
  storyYear: number;
  tag: string;
  readTime: string;
  excerpt: string;
  featuredSummary: string;
  image?: string;
  imageAlt?: string;
  privacyNote?: string;
  sections: ChronicleSection[];
};
