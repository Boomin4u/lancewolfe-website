import type { Metadata } from "next";
import { SiteShell } from "../../site-shell";
import { eventHistorySections } from "../event-history-data";
import { ProofStrip } from "../proof-strip";
import { proofStats } from "../proof-data";
import { buildPageMetadata } from "../../seo";
import { TimelineExplorer, type TimelineRow } from "./timeline-explorer";

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const monthIndex = new Map(monthOrder.map((month, index) => [month, index]));

function parseStartDate(year: number, dateLabel: string, monthLabel: string) {
  const label = dateLabel.trim();
  const leadingMonth = monthOrder.find((month) => label.startsWith(month));
  const monthName = leadingMonth ?? monthLabel;
  const monthNumber = monthIndex.get(monthName as (typeof monthOrder)[number]);
  if (monthNumber === undefined) return new Date(year, 11, 31);

  const dayMatch = label.match(/\b(\d{1,2})\b/);
  const day = dayMatch ? Number(dayMatch[1]) : 1;

  return new Date(year, monthNumber, day);
}

const timelineRows: TimelineRow[] = eventHistorySections
  .flatMap((section) =>
    section.years.flatMap((year) =>
      year.entries.map((entry, index) => ({
        year: year.year,
        index,
        monthLabel: entry.monthLabel ?? "Unsorted",
        dateLabel: entry.dateLabel,
        sortDate: parseStartDate(year.year, entry.dateLabel, entry.monthLabel ?? "Unsorted").getTime(),
        title: entry.name,
        location: entry.location,
        employer: entry.employer ?? "Event Aces",
        role: entry.role ?? "Bartender",
        status: entry.status,
        href: entry.href,
      })),
    ),
  )
  .sort((left, right) => {
    if (left.sortDate !== right.sortDate) return right.sortDate - left.sortDate;
    return right.index - left.index;
  });

export const metadata: Metadata = buildPageMetadata({
  title: "Lance Wolfe | Nationwide Live Event History",
  description:
    "Explore 11+ years of Lance Wolfe’s nationwide event production, talent buying & marketing, operations, staffing, and hospitality history.",
  path: "/career/timeline/",
});

export default function CareerTimelinePage() {
  return (
    <SiteShell
      eyebrow="Event timeline"
      title="Event history"
      body="11+ years of nationwide event experience."
      widthClassName="max-w-7xl"
    >
      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_50px_rgba(4,11,26,0.16)] backdrop-blur-xl sm:p-5">
        <div className="hidden flex-col gap-2 sm:flex">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
            Event history
          </p>
          <h2 className="text-xl font-semibold text-white">Overview</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-300/80">
            Browse the complete record or narrow it to the experience most relevant to your team.
          </p>
        </div>

        <div className="mt-4 hidden sm:block">
          <ProofStrip stats={proofStats} />
        </div>

        <TimelineExplorer rows={timelineRows} />

        <div className="mt-5 text-sm text-slate-400">
          Tip: open any linked event name to jump to the event’s official site when available.
        </div>
      </section>
    </SiteShell>
  );
}
