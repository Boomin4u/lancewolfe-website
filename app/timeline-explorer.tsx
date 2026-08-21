"use client";

import { useMemo, useState } from "react";
import { timelineSections } from "./timeline-data";

type TimelineKind = "all" | "check-in" | "hosted";
type TimelineEntry = {
  id: string;
  kind: "check-in" | "hosted";
  year: number;
  dateLabel: string;
  title: string;
  place: string;
  note?: string;
  raw: string;
};

const kindOrder: TimelineKind[] = ["all", "check-in", "hosted"];

const allEntries = timelineSections.flatMap((section) =>
  section.entries.map((raw, index) => {
    const [dateLabel = "", title = "", place = "", extra = ""] = raw
      .split(" — ")
      .map((part) => part.trim());

    return {
      id: `${section.kind}-${section.year}-${index}`,
      kind: section.kind,
      year: section.year,
      dateLabel,
      title,
      place,
      note: extra.replace(/^Event by\s+/i, "") || undefined,
      raw,
    } satisfies TimelineEntry;
  }),
);

function parseQuery(value: string) {
  return value.trim().toLowerCase();
}

function kindLabel(kind: TimelineEntry["kind"]) {
  return kind === "check-in" ? "Check-in" : "Hosted event";
}

function kindTone(kind: TimelineEntry["kind"]) {
  return kind === "check-in"
    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
    : "border-amber-300/30 bg-amber-300/10 text-amber-100";
}

function kindDot(kind: TimelineEntry["kind"]) {
  return kind === "check-in" ? "bg-cyan-300" : "bg-amber-300";
}

function summaryTone(kind: TimelineEntry["kind"]) {
  return kind === "check-in"
    ? "from-cyan-500/35 to-sky-500/10"
    : "from-amber-500/35 to-rose-500/10";
}

export function TimelineExplorer() {
  const years = useMemo(
    () => [...new Set(allEntries.map((entry) => entry.year))].sort((a, b) => b - a),
    [],
  );
  const [mode, setMode] = useState<TimelineKind>("all");
  const [year, setYear] = useState<number | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(allEntries[0]?.id ?? "");

  const visibleEntries = useMemo(() => {
    const queryValue = parseQuery(query);
    return allEntries.filter((entry) => {
      const matchesMode = mode === "all" || entry.kind === mode;
      const matchesYear = year === "all" || entry.year === year;
      const matchesQuery =
        queryValue.length === 0 ||
        [entry.dateLabel, entry.title, entry.place, entry.note ?? "", entry.raw]
          .join(" ")
          .toLowerCase()
          .includes(queryValue);

      return matchesMode && matchesYear && matchesQuery;
    });
  }, [mode, year, query]);

  const selectedEntryId = visibleEntries.some((entry) => entry.id === selectedId)
    ? selectedId
    : visibleEntries[0]?.id;

  const selectedEntry = useMemo(
    () => visibleEntries.find((entry) => entry.id === selectedEntryId) ?? visibleEntries[0],
    [selectedEntryId, visibleEntries],
  );

  const groupedEntries = useMemo(() => {
    return visibleEntries.reduce<Array<[number, TimelineEntry[]]>>((groups, entry) => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup?.[0] === entry.year) {
        lastGroup[1].push(entry);
      } else {
        groups.push([entry.year, [entry]]);
      }
      return groups;
    }, []);
  }, [visibleEntries]);

  const totalMoments = allEntries.length;
  const checkIns = allEntries.filter((entry) => entry.kind === "check-in").length;
  const hosted = allEntries.filter((entry) => entry.kind === "hosted").length;
  const yearsCovered = years.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.1),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.08),_transparent_28%),linear-gradient(135deg,#07111f_0%,#0f172a_52%,#111827_100%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
        <header className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.34)] backdrop-blur-xl sm:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/18 bg-amber-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/85">
              Timeline View
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your life, mapped by year.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300/85 sm:text-base">
              Explore check-ins, hosted nights, and the places that stitched the
              timeline together. Filter by year, search a memory, and open any
              moment for a closer look.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-100"
                type="button"
                onClick={() => {
                  setMode("all");
                  setYear("all");
                  setQuery("");
                }}
              >
                Reset filters
              </button>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200">
                {totalMoments} moments
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <SummaryCard
              label="Check-ins"
              value={checkIns}
              blurb="Places marked while traveling, festival hopping, and wandering."
              tone="from-cyan-500/30 to-sky-500/10"
            />
            <SummaryCard
              label="Hosted events"
              value={hosted}
              blurb="Parties, meetups, and nights built around your own rooms."
              tone="from-amber-500/30 to-rose-500/10"
            />
            <SummaryCard
              label="Years covered"
              value={yearsCovered}
              blurb="A span that runs from 2016 through 2026."
              tone="from-emerald-500/25 to-teal-500/10"
            />
          </div>
        </header>

        <section className="mt-8 grid flex-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.34)] backdrop-blur-xl sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <label className="flex items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                <span className="text-slate-400">Search</span>
                <input
                  aria-label="Search timeline"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Search a city, venue, or event"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {kindOrder.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={mode === option}
                    onClick={() => setMode(option)}
                    className={`rounded-full border px-4 py-3 text-sm font-medium transition ${
                      mode === option
                        ? "border-white/20 bg-white text-slate-950 shadow-sm shadow-white/10"
                        : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20 hover:bg-white/[0.08]"
                    }`}
                  >
                    {option === "all" ? "All moments" : kindLabel(option)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip
                active={year === "all"}
                label="All years"
                onClick={() => setYear("all")}
              />
              {years.map((candidate) => (
                <FilterChip
                  key={candidate}
                  active={year === candidate}
                  label={String(candidate)}
                  onClick={() => setYear(candidate)}
                />
              ))}
            </div>

            <div className="mt-6">
              {visibleEntries.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] px-6 py-12 text-center">
                  <p className="text-lg font-medium text-white">
                    No moments match those filters.
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Try a broader search or clear the current year and category.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("all");
                      setYear("all");
                      setQuery("");
                    }}
                    className="mt-5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/12"
                  >
                    Clear everything
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {groupedEntries.map(([groupYear, entries]) => (
                    <section key={groupYear} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold text-white">
                          {groupYear}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {entries.length} events
                        </div>
                      </div>
                      <div className="space-y-3">
                        {entries.map((entry) => {
                          const selected = selectedEntry?.id === entry.id;
                          return (
                            <button
                              key={entry.id}
                              type="button"
                              onClick={() => setSelectedId(entry.id)}
                              className={`grid w-full gap-4 rounded-[1.35rem] border px-4 py-4 text-left transition sm:grid-cols-[120px_minmax(0,1fr)] sm:px-5 ${
                                selected
                                  ? "border-white/20 bg-white/[0.09] shadow-sm shadow-slate-950/30"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="text-sm font-medium text-slate-200">
                                  {entry.dateLabel}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`inline-flex h-2.5 w-2.5 rounded-full ${kindDot(entry.kind)}`}
                                  />
                                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                                    {entry.kind === "check-in"
                                      ? "Check-in"
                                      : "Hosted"}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${kindTone(
                                      entry.kind,
                                    )}`}
                                  >
                                    {kindLabel(entry.kind)}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    {entry.year}
                                  </span>
                                </div>
                                <h3 className="text-base font-medium tracking-tight text-white">
                                  {entry.title}
                                </h3>
                                <p className="text-sm leading-6 text-slate-300/85">
                                  {entry.place}
                                </p>
                                {entry.note ? (
                                  <p className="text-sm text-slate-400">
                                    Hosted by {entry.note}
                                  </p>
                                ) : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-4 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.34)] backdrop-blur-xl sm:p-5">
              {selectedEntry ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${kindTone(
                        selectedEntry.kind,
                      )}`}
                    >
                      {kindLabel(selectedEntry.kind)}
                    </span>
                    <span className="text-sm text-slate-400">
                      {selectedEntry.dateLabel}
                    </span>
                  </div>

                  <div
                    className={`mt-5 rounded-[1.35rem] border border-white/10 bg-gradient-to-br ${summaryTone(
                      selectedEntry.kind,
                    )} p-5`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                      Highlight
                    </p>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
                      {selectedEntry.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-200/90">
                      {selectedEntry.place}
                    </p>
                  </div>

                  <dl className="mt-6 grid gap-3 text-sm">
                    <DetailRow label="Year" value={String(selectedEntry.year)} />
                    <DetailRow
                      label="Type"
                      value={kindLabel(selectedEntry.kind)}
                    />
                    <DetailRow label="Place" value={selectedEntry.place} />
                    <DetailRow
                      label="Memory"
                      value={
                        selectedEntry.note
                          ? `Hosted by ${selectedEntry.note}`
                          : "A personal check-in recorded in the timeline."
                      }
                    />
                  </dl>

                  <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-slate-950/35 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      Why it matters
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      This moment stays in the record as part of a larger arc of
                      festival stops, city checkpoints, and nights you helped
                      shape yourself.
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-6 text-slate-300">
                  No matching moments are visible right now.
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  blurb,
  tone,
}: {
  label: string;
  value: number;
  blurb: string;
  tone: string;
}) {
  return (
    <div
      className={`rounded-[1.35rem] border border-white/10 bg-gradient-to-br ${tone} p-4 shadow-lg shadow-slate-950/20 backdrop-blur`}
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
        {label}
      </p>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200/85">
        {blurb}
      </p>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
        active
          ? "border-white/20 bg-white text-slate-950 shadow-sm shadow-white/10"
          : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20 hover:bg-white/[0.08]"
      }`}
    >
      {label}
    </button>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-1 rounded-[1.1rem] border border-white/10 bg-white/[0.035] px-4 py-3 sm:grid-cols-[92px_minmax(0,1fr)] sm:items-start">
      <dt className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        {label}
      </dt>
      <dd className="text-sm leading-6 text-slate-200">{value}</dd>
    </div>
  );
}
