"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { roleCategory } from "../role-categories";

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
  query: string;
  year: string;
  role: string;
  employer: string;
  state: string;
};

const emptyFilters: Filters = {
  query: "",
  year: "",
  role: "",
  employer: "",
  state: "",
};

const columnSettings = [
  { label: "Date", variable: "--timeline-date-width", defaultWidth: 192, minWidth: 128 },
  { label: "Event", variable: "--timeline-event-width", defaultWidth: 384, minWidth: 224 },
  { label: "Location", variable: "--timeline-location-width", defaultWidth: 160, minWidth: 136 },
  { label: "Employer", variable: "--timeline-employer-width", defaultWidth: 176, minWidth: 144 },
  { label: "Role", variable: "--timeline-role-width", defaultWidth: 240, minWidth: 168 },
] as const;

const columnStorageKey = "lancewolfe:timeline-column-widths";

function getState(location: string) {
  const state = location.split(",").pop()?.trim() ?? "";
  return /^[A-Z]{2}$|^DC$/.test(state) ? state : "Other";
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export function TimelineExplorer({ rows }: { rows: TimelineRow[] }) {
  const explorerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [urlReady, setUrlReady] = useState(false);
  const deferredFilters = useDeferredValue(filters);

  const options = useMemo(
    () => ({
      years: [...new Set(rows.map((row) => row.year))].sort((left, right) => right - left),
      roles: uniqueSorted(rows.map((row) => roleCategory(row.role))),
      employers: uniqueSorted(rows.map((row) => row.employer)),
      states: uniqueSorted(rows.map((row) => getState(row.location))),
    }),
    [rows],
  );

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        if (deferredFilters.query) {
          const searchText = [row.title, row.location, row.employer, row.role, roleCategory(row.role)]
            .join(" ")
            .toLocaleLowerCase();
          if (!searchText.includes(deferredFilters.query.trim().toLocaleLowerCase())) return false;
        }
        if (deferredFilters.year && row.year !== Number(deferredFilters.year)) return false;
        if (deferredFilters.role && roleCategory(row.role) !== deferredFilters.role) return false;
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

  const activeRoleBreakdown = useMemo(() => {
    if (!deferredFilters.role) return [];

    return [...filteredRows.reduce((counts, row) => {
      counts.set(row.role, (counts.get(row.role) ?? 0) + 1);
      return counts;
    }, new Map<string, number>())]
      .map(([role, count]) => ({ role, count }))
      .sort((left, right) => right.count - left.count || left.role.localeCompare(right.role));
  }, [deferredFilters.role, filteredRows]);

  const hasFilters = Object.values(filters).some(Boolean);

  useEffect(() => {
    function readUrlFilters() {
      const params = new URLSearchParams(window.location.search);
      setFilters({
        year: params.get("year") ?? "",
        query: params.get("query") ?? "",
        role: roleCategory(params.get("role") ?? ""),
        employer: params.get("employer") ?? "",
        state: params.get("state") ?? "",
      });
      setUrlReady(true);
    }

    readUrlFilters();
    window.addEventListener("popstate", readUrlFilters);
    return () => window.removeEventListener("popstate", readUrlFilters);
  }, []);

  useEffect(() => {
    const root = explorerRef.current;
    if (!root) return;

    try {
      const storedWidths = JSON.parse(window.localStorage.getItem(columnStorageKey) ?? "[]") as number[];
      columnSettings.forEach((column, index) => {
        const width = storedWidths[index];
        if (Number.isFinite(width) && width >= column.minWidth) {
          root.style.setProperty(column.variable, `${width}px`);
        }
      });
    } catch {
      window.localStorage.removeItem(columnStorageKey);
    }
  }, []);

  useEffect(() => {
    if (!urlReady) return;

    const url = new URL(window.location.href);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, "", url);
  }, [filters, urlReady]);

  function updateFilter(filter: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [filter]: value }));
    if (filter === "query") return;

    window.plausible?.("Timeline Filter", { props: { filter, value: value || "All" } });
    window.dispatchEvent(
      new CustomEvent("lancewolfe:analytics", {
        detail: { eventName: "Timeline Filter", filter, value: value || "All" },
      }),
    );
  }

  const activeFilters = [
    { key: "query", label: "Search", value: filters.query },
    { key: "year", label: "Year", value: filters.year },
    { key: "role", label: "Role", value: filters.role },
    { key: "employer", label: "Employer", value: filters.employer },
    { key: "state", label: "State", value: filters.state },
  ].filter((filter) => filter.value) as Array<{ key: keyof Filters; label: string; value: string }>;

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  async function copyFilteredLink() {
    const url = new URL(window.location.href);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });

    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      const field = document.createElement("textarea");
      field.value = url.toString();
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopyStatus("copied");
    window.setTimeout(() => setCopyStatus("idle"), 1800);
    window.plausible?.("Timeline Share", { props: { filters: String(activeFilters.length) } });
  }

  function getColumnWidths() {
    const root = explorerRef.current;
    return columnSettings.map((column) => {
      const value = root?.style.getPropertyValue(column.variable);
      const parsed = value ? Number.parseFloat(value) : column.defaultWidth;
      return Number.isFinite(parsed) ? parsed : column.defaultWidth;
    });
  }

  function setColumnWidth(index: number, width: number) {
    const root = explorerRef.current;
    const column = columnSettings[index];
    if (!root || !column) return;

    const widths = getColumnWidths();
    widths[index] = Math.max(column.minWidth, Math.round(width));
    root.style.setProperty(column.variable, `${widths[index]}px`);
    window.localStorage.setItem(columnStorageKey, JSON.stringify(widths));
  }

  function startColumnResize(index: number, event: ReactPointerEvent<HTMLButtonElement>) {
    const startX = event.clientX;
    const startWidth = getColumnWidths()[index];
    event.currentTarget.setPointerCapture(event.pointerId);

    function handlePointerMove(pointerEvent: PointerEvent) {
      setColumnWidth(index, startWidth + pointerEvent.clientX - startX);
    }

    function stopResize() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  }

  function resizeColumnWithKeyboard(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 16 : -16;
    setColumnWidth(index, getColumnWidths()[index] + direction);
  }

  function resetColumnWidths() {
    const root = explorerRef.current;
    if (!root) return;

    columnSettings.forEach((column) => root.style.removeProperty(column.variable));
    window.localStorage.removeItem(columnStorageKey);
  }

  return (
    <div ref={explorerRef}>
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
          <div className="text-left sm:text-right" aria-live="polite">
            <p className="text-xs font-medium text-slate-400">
              Showing {filteredRows.length} of {rows.length} events
            </p>
            {activeRoleBreakdown.length > 1 ? (
              <p className="mt-1 text-[11px] text-slate-500">
                {activeRoleBreakdown.map(({ role, count }) => `${count} ${role}`).join(" + ")}
              </p>
            ) : null}
            <button
              type="button"
              onClick={resetColumnWidths}
              className="mt-1 hidden text-[11px] text-slate-500 underline decoration-white/10 underline-offset-4 transition hover:text-slate-200 md:inline"
            >
              Reset column widths
            </button>
          </div>
        </div>

        <label htmlFor="timeline-filter-query" className="mt-3 grid gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Search
          <input
            id="timeline-filter-query"
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="Event, city, venue, employer, or role"
            className="w-full rounded-xl border border-white/10 bg-[#0a1727] px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sky-200/40 focus:ring-2 focus:ring-sky-200/15"
          />
        </label>

        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => updateFilter(filter.key, "")}
                aria-label={`Remove ${filter.label} filter: ${filter.value}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/15 bg-sky-200/[0.07] px-2.5 py-1.5 text-[11px] text-sky-50 transition hover:border-sky-200/30 hover:bg-sky-200/[0.11]"
              >
                <span className="text-sky-100/65">{filter.label}:</span> {filter.value}
                <span aria-hidden="true">×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="px-1 text-xs font-medium text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-white"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={copyFilteredLink}
              className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              {copyStatus === "copied" ? "Link copied" : "Copy filtered link"}
            </button>
          </div>
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
                <table className="timeline-table table-fixed border-separate border-spacing-0">
                  <colgroup>
                    <col style={{ width: "var(--timeline-date-width, 192px)" }} />
                    <col style={{ width: "var(--timeline-event-width, 384px)" }} />
                    <col style={{ width: "var(--timeline-location-width, 160px)" }} />
                    <col style={{ width: "var(--timeline-employer-width, 176px)" }} />
                    <col style={{ width: "var(--timeline-role-width, 240px)" }} />
                  </colgroup>
                  <thead className="bg-white/[0.04]">
                    <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {columnSettings.map((column, columnIndex) => (
                        <th key={column.label} className="relative px-3 py-3">
                          {column.label}
                          <button
                            type="button"
                            aria-label={`Resize ${column.label} column`}
                            title={`Drag to resize ${column.label}. Use left and right arrow keys for precise adjustment.`}
                            onPointerDown={(event) => startColumnResize(columnIndex, event)}
                            onKeyDown={(event) => resizeColumnWithKeyboard(columnIndex, event)}
                            className="absolute inset-y-0 right-0 hidden w-3 cursor-col-resize touch-none items-center justify-center outline-none after:h-5 after:w-px after:bg-white/15 hover:after:bg-sky-200/70 focus-visible:after:bg-sky-200 md:flex"
                          />
                        </th>
                      ))}
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
    </div>
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
