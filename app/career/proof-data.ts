import { eventHistorySections } from "./event-history-data";

const timelineRows = eventHistorySections.flatMap((section) =>
  section.years.flatMap((year) =>
    year.entries.map((entry) => ({
      year: year.year,
      name: entry.name,
      location: entry.location,
      role: entry.role ?? "Bartender",
      status: entry.status,
    })),
  ),
);

const completedTimelineRows = timelineRows.filter((row) => row.status !== "Scheduled");

const eventStartYear = Math.min(...completedTimelineRows.map((row) => row.year));
const eventEndYear = Math.max(...completedTimelineRows.map((row) => row.year));
const yearActivity = Array.from({ length: eventEndYear - eventStartYear + 1 }, (_, index) => {
  const year = eventStartYear + index;
  return {
    year,
    count: completedTimelineRows.filter((row) => row.year === year).length,
  };
});
const stateCodes = new Set(
  completedTimelineRows
    .map((row) => row.location.split(",").pop()?.trim())
    .filter((state): state is string => /^[A-Z]{2}$|^DC$/.test(state)),
);

const roleCounts = [...completedTimelineRows.reduce((counts, row) => {
  counts.set(row.role, (counts.get(row.role) ?? 0) + 1);
  return counts;
}, new Map<string, number>())]
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

export const proofStats = [
  {
    label: "Years in events",
    value: `${eventEndYear - eventStartYear + 1}+`,
    yearActivity,
  },
  {
    label: "States reached",
    value: `${stateCodes.size}`,
    mapStates: [...stateCodes].sort(),
  },
  {
    label: "Career event credits",
    value: `${completedTimelineRows.length}`,
    roleCounts,
  },
] as const;
