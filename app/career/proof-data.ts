import { eventHistorySections } from "./event-history-data";

const timelineRows = eventHistorySections.flatMap((section) =>
  section.years.flatMap((year) =>
    year.entries.map((entry) => ({
      year: year.year,
      location: entry.location,
    })),
  ),
);

const eventStartYear = Math.min(...timelineRows.map((row) => row.year));
const eventEndYear = Math.max(...timelineRows.map((row) => row.year));
const stateCodes = new Set(
  timelineRows
    .map((row) => row.location.split(",").pop()?.trim())
    .filter((state): state is string => /^[A-Z]{2}$|^DC$/.test(state)),
);

export const proofStats = [
  {
    label: "Events worked",
    value: `${timelineRows.length}`,
  },
  {
    label: "States reached",
    value: `${stateCodes.size}`,
  },
  {
    label: "Years in events",
    value: `${eventEndYear - eventStartYear + 1}+`,
  },
] as const;
