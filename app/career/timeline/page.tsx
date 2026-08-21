import type { Metadata } from "next";
import { SiteShell } from "../../site-shell";
import { eventHistorySections } from "../event-history-data";
import { ProofStrip } from "../proof-strip";
import { proofStats } from "../proof-data";
import { buildPageMetadata } from "../../seo";

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

const timelineRows = eventHistorySections
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
        href: entry.href,
      })),
    ),
  )
  .sort((left, right) => {
    if (left.sortDate !== right.sortDate) return right.sortDate - left.sortDate;
    return right.index - left.index;
  });

export const metadata: Metadata = buildPageMetadata({
  title: "Lance Wolfe | Event Timeline",
  description: "A clean timeline of event work, sorted by year and month with employers, roles, and linked events.",
  path: "/career/timeline/",
});

export default function CareerTimelinePage() {
  const groupedByYear = timelineRows.reduce<Array<[number, typeof timelineRows]>>((groups, row) => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.[0] === row.year) {
      lastGroup[1].push(row);
    } else {
      groups.push([row.year, [row]]);
    }
    return groups;
  }, []);

  return (
    <SiteShell
      eyebrow="Event timeline"
      title="Event history"
      body="A clean look at the full event history, grouped by year and sorted newest first."
    >
      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_50px_rgba(4,11,26,0.16)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
            Event history
          </p>
          <h2 className="text-xl font-semibold text-white">Overview</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-300/80">
            View the full event history in a cleaner timeline layout.
          </p>
        </div>

        <div className="mt-4">
          <ProofStrip stats={proofStats} />
        </div>

        <div className="mt-5 space-y-6">
          {groupedByYear.map(([year, rows], groupIndex) => (
            <details
              key={year}
              className="group rounded-[1.2rem] border border-white/10 bg-slate-950/18 open:bg-slate-950/22"
              open={groupIndex === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none">
                <div className="text-lg font-semibold text-white">{year}</div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  {rows.length} events
                </div>
                <div className="ml-1 text-slate-400 transition group-open:rotate-180">⌄</div>
              </summary>

              <div className="border-t border-white/10">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0">
                    <thead className="bg-white/[0.04]">
                      <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        <th className="px-3 py-3">Date</th>
                        <th className="px-3 py-3">Event</th>
                        <th className="px-3 py-3">Location</th>
                        <th className="px-3 py-3">Employer</th>
                        <th className="px-3 py-3">Role</th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-950/20">
                      {rows.map((entry, index) => (
                        <tr
                          key={`${entry.year}-${entry.title}-${entry.dateLabel}-${index}`}
                          className="border-t border-white/6 text-sm text-slate-200/90 hover:bg-white/[0.03]"
                        >
                          <td className="whitespace-nowrap px-3 py-3 align-top text-[12px] text-slate-400">
                            {entry.dateLabel}
                          </td>
                          <td className="px-3 py-3 align-top">
                            {entry.href ? (
                              <a
                                href={entry.href}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-white underline decoration-white/0 underline-offset-4 transition hover:text-sky-50 hover:decoration-white/30"
                              >
                                {entry.title}
                              </a>
                            ) : (
                              <span className="font-medium text-white">{entry.title}</span>
                            )}
                          </td>
                          <td className="px-3 py-3 align-top text-slate-300">{entry.location}</td>
                          <td className="px-3 py-3 align-top text-slate-300">{entry.employer}</td>
                          <td className="px-3 py-3 align-top text-slate-300">{entry.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-5 text-sm text-slate-400">
          Tip: open any linked event name to jump to the event’s official site when available.
        </div>
      </section>
    </SiteShell>
  );
}
