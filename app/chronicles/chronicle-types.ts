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
  tag: string;
  readTime: string;
  excerpt: string;
  featuredSummary: string;
  sections: ChronicleSection[];
};
