import type { ChronicleEntry } from "./chronicle-types";

const entryModules = import.meta.glob("./entries/*.ts", {
  eager: true,
}) as Record<string, { default: ChronicleEntry }>;

const chronicleEntries = Object.values(entryModules).map((module) => module.default);

// Add new entries by copying one file in `app/chronicles/entries/`.
// Read the stories in the order they happened, not their publication order.
export const chronicles = [...chronicleEntries].sort((a, b) =>
  a.storyYear - b.storyYear || a.sortDate.localeCompare(b.sortDate),
);

export function getChronicleBySlug(slug: string) {
  return chronicles.find((entry) => entry.slug === slug);
}

export function getChronicleIndex(slug: string) {
  return chronicles.findIndex((entry) => entry.slug === slug);
}
