"use client";

import { useDeferredValue, useMemo, useState } from "react";

export type TimelineRow = {
  year: number;
  monthLabel: string;
  dateLabel: string;
  sortDate: number;
  title: string;
  location: string;
  employer: string;
  role: string;
  status?: "Scheduled";
  href?: string;
};

type Filters = {
  year: string;
  role: string;
  employer: string;
  state: string;
};

const emptyFilters: Filters = {
  year: "",
  role: "",
  employer: "",
  state: "",
};

function getState(location: string) {
  const state = location.split(",").pop()?.trim() ?? "";
  return /^[A-Z]{2}$|^DC$/.test(state) ? state : "Other";
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export function TimelineExplorer({ rows }: { rows: TimelineRow[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const deferredFilters = useDeferredValue(filters);

  const options = useMemo(
    () => ({
      years: [...new Set(rows.map((row) => row.year))].sort((left, right) => right - left),
      roles: uniqueSorted(rows.map((row) => row.role)),
      employers: uniqueSorted(rows.map((row) => row.employer)),
      states: uniqueSorted(rows.map((row) => getState(row.location))),
    }),
    [rows],
  );

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        if (deferredFilters.year && row.year !== Number(deferredFilters.year)) return false;
        if (deferredFilters.role && row.role !== deferredFilters.role) return false;
        if (deferredFilters.employer && row.employer !== deferredFilters.employer) return false;
        if (deferredFilters.state && getState(row.location) !== deferredFilters.state) return false;
        return true;
      }),
    [deferredFilters, rows],
  );

  const groupedByYear = filteredRows.reduce<Array<[number, TimelineRow[]]>>((groups, row) => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.[0] === row.year) {
      lastGroup[1].push(row);
    } else {
      groups.push([row.year, [row]]);
    }
    return groups;
  }, []);

  const hasFilters = Object.values(filters).some(Boolean);

  function updateFilter(filter: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [filter]: value }));
  }

  return (
    <>
      <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-slate-950/24 p-3 sm:p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-100/75">
              Explore the record
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-300/80">
              Filter the event history by the experience most relevant to you.
            </p>
          </div>
          <p className="text-xs font-medium text-slate-400" aria-live="polite">
            Showing {filteredRows.length} of {rows.length} events
          </p>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="Year"
            value={filters.year}
            onChange={(value) => updateFilter("year", value)}
            options={options.years.map(String)}
          />
          <FilterSelect
            label="Role"
            value={filters.role}
            onChange={(value) => updateFilter("role", value)}
            options={options.roles}
          />
          <FilterSelect
            label="Employer"
            value={filters.employer}
            onChange={(value) => updateFilter("employer", value)}
            options={options.employers}
          />
          <FilterSelect
            label="State"
            value={filters.state}
            onChange={(value) => updateFilter("state", value)}
            options={options.states}
          />
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="mt-3 text-xs font-medium text-sky-100 underline decoration-sky-100/25 underline-offset-4 transition hover:text-white"
          >
            Clear all filters
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        {groupedByYear.map(([year, yearRows], groupIndex) => (
          <details
            key={year}
            className="group rounded-[1.2rem] border border-white/10 bg-slate-950/18 open:bg-slate-950/22"
            open={hasFilters || groupIndex === 0}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-200/60">
              <div className="text-lg font-semibold text-white">{year}</div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                {yearRows.length} events
              </div>
              <div className="ml-1 text-slate-400 transition group-open:rotate-180" aria-hidden="true">⌄</div>
            </summary>

            <div className="border-t border-white/10">
              <div className="overflow-x-auto">
                <table className="timeline-table min-w-[72rem] table-fixed border-separate border-spacing-0">
                  <colgroup>
                    <col className="w-[12rem]" />
                    <col className="w-[24rem]" />
                    <col className="w-[10rem]" />
                    <col className="w-[11rem]" />
                    <col className="w-[15rem]" />
                  </colgroup>
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
                    {yearRows.map((entry, index) => (
                      <tr
                        key={`${entry.year}-${entry.title}-${entry.dateLabel}-${index}`}
                        className="timeline-row border-t border-white/6 text-sm text-slate-200/90 hover:bg-white/[0.03]"
                      >
                        <td className="timeline-date whitespace-nowrap px-3 py-2.5 align-top text-[12px] text-slate-400">
                          {entry.dateLabel}
                        </td>
                        <td className="timeline-event px-3 py-2.5 align-top">
                          {entry.href ? (
                            <a
                              href={entry.href}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-white underline decoration-white/0 underline-offset-4 transition hover:text-sky-50 hover:decoration-white/30"
                            >
                              {entry.title}{entry.status === "Scheduled" ? " (Scheduled)" : ""}
                            </a>
                          ) : (
                            <span className="font-medium text-white">
                              {entry.title}{entry.status === "Scheduled" ? " (Scheduled)" : ""}
                            </span>
                          )}
                        </td>
                        <td className="timeline-location whitespace-nowrap px-3 py-2.5 align-top text-slate-300">{entry.location}</td>
                        <td className="timeline-employer whitespace-nowrap px-3 py-2.5 align-top text-slate-300">{entry.employer}</td>
                        <td className="timeline-role whitespace-nowrap px-3 py-2.5 align-top text-slate-300">{entry.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        ))}

        {filteredRows.length === 0 ? (
          <div className="rounded-[1.2rem] border border-dashed border-white/12 bg-white/[0.025] px-4 py-8 text-center">
            <p className="font-medium text-white">No events match this combination.</p>
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="mt-2 text-sm text-sky-100 underline decoration-sky-100/25 underline-offset-4"
            >
              Reset the filters
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const id = `timeline-filter-${label.toLowerCase()}`;

  return (
    <label htmlFor={id} className="grid gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-xl border border-white/10 bg-[#0a1727] px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 outline-none transition focus:border-sky-200/40 focus:ring-2 focus:ring-sky-200/15"
      >
        <option value="">All {label.toLowerCase()}s</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
