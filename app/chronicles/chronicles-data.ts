import type { ChronicleEntry } from "./chronicle-types";

const entryModules = import.meta.glob("./entries/*.ts", {
  eager: true,
}) as Record<string, { default: ChronicleEntry }>;

const chronicleEntries = Object.values(entryModules).map((module) => module.default);

// Add new entries by copying one file in `app/chronicles/entries/`.
// The archive sorts newest-first automatically, so file order does not matter.
export const chronicles = [...chronicleEntries].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate),
);

export function getChronicleBySlug(slug: string) {
  return chronicles.find((entry) => entry.slug === slug);
}

export function getChronicleIndex(slug: string) {
  return chronicles.findIndex((entry) => entry.slug === slug);
}
