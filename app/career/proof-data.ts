import { eventHistorySections } from "./event-history-data";

const timelineRows = eventHistorySections.flatMap((section) =>
  section.years.flatMap((year) =>
    year.entries.map((entry) => ({
      year: year.year,
      name: entry.name,
      location: entry.location,
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

const featuredEventDefinitions = [
  { name: "Formula 1", matches: (name: string) => /Formula (?:1|One)/i.test(name) },
  { name: "Electric Forest", matches: (name: string) => /^Electric Forest/i.test(name) },
  { name: "Hulaween", matches: (name: string) => /^Hulaween/i.test(name) },
  { name: "Ultra", matches: (name: string) => /^Ultra/i.test(name) },
  {
    name: "PGA Events",
    matches: (name: string) => /^(?:The Players Championship|Valspar Championship|John Deere Classic|3M Open|Hoag Classic|American Family Insurance Championship|Ryder Cup)$/i.test(name),
  },
  { name: "EDC", matches: (name: string) => /^EDC\s/i.test(name) },
] as const;

const featuredEvents = featuredEventDefinitions
  .map((event) => ({
    name: event.name,
    count: completedTimelineRows.filter((row) => event.matches(row.name)).length,
  }))
  .filter((event) => event.count > 0)
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
    label: "Events worked",
    value: `${completedTimelineRows.length}`,
    featuredEvents,
  },
] as const;
