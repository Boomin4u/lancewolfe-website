import { eventHistorySections } from "./event-history-data";

const timelineRows = eventHistorySections.flatMap((section) =>
  section.years.flatMap((year) =>
    year.entries.map((entry) => ({
      year: year.year,
      location: entry.location,
      status: entry.status,
    })),
  ),
);

const completedTimelineRows = timelineRows.filter((row) => row.status !== "Scheduled");

const eventStartYear = Math.min(...completedTimelineRows.map((row) => row.year));
const eventEndYear = Math.max(...completedTimelineRows.map((row) => row.year));
const stateCodes = new Set(
  completedTimelineRows
    .map((row) => row.location.split(",").pop()?.trim())
    .filter((state): state is string => /^[A-Z]{2}$|^DC$/.test(state)),
);

export const proofStats = [
  {
    label: "Years in events",
    value: `${eventEndYear - eventStartYear + 1}+`,
  },
  {
    label: "States reached",
    value: `${stateCodes.size}`,
  },
  {
    label: "Events worked",
    value: `${completedTimelineRows.length}`,
  },
] as const;
