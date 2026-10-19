"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type DragEvent,
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
  { key: "date", label: "Date" },
  { key: "event", label: "Event" },
  { key: "location", label: "Location" },
  { key: "employer", label: "Employer" },
  { key: "role", label: "Role" },
] as const;

type ColumnKey = (typeof columnSettings)[number]["key"];
type SortDirection = "asc" | "desc";

const defaultColumnOrder = columnSettings.map((column) => column.key);
const columnOrderStorageKey = "lancewolfe:timeline-column-order";

function getState(location: string) {
  const state = location.split(",").pop()?.trim() ?? "";
  return /^[A-Z]{2}$|^DC$/.test(state) ? state : "Other";
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export function TimelineExplorer({ rows }: { rows: TimelineRow[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [urlReady, setUrlReady] = useState(false);
  const [columnOrder, setColumnOrder] = useState<ColumnKey[]>(defaultColumnOrder);
  const [draggedColumn, setDraggedColumn] = useState<ColumnKey | null>(null);
  const [sort, setSort] = useState<{ key: ColumnKey; direction: SortDirection }>({
    key: "date",
    direction: "desc",
  });
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
  const [collapsedYears, setCollapsedYears] = useState(() => new Set<number>());

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

  const sortedRows = useMemo(() => {
    const direction = sort.direction === "asc" ? 1 : -1;
    const getSortValue = (row: TimelineRow) => {
      if (sort.key === "date") return row.sortDate;
      if (sort.key === "event") return row.title;
      return row[sort.key];
    };

    return [...filteredRows].sort((left, right) => {
      if (left.year !== right.year) return right.year - left.year;
      const leftValue = getSortValue(left);
      const rightValue = getSortValue(right);
      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return (leftValue - rightValue) * direction;
      }
      return String(leftValue).localeCompare(String(rightValue), undefined, {
        numeric: true,
        sensitivity: "base",
      }) * direction;
    });
  }, [filteredRows, sort]);

  const groupedByYear = sortedRows.reduce<Array<[number, TimelineRow[]]>>((groups, row) => {
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
    const restoreOrder = window.setTimeout(() => {
      try {
        const storedOrder = JSON.parse(window.localStorage.getItem(columnOrderStorageKey) ?? "[]") as ColumnKey[];
        const isValidOrder = storedOrder.length === defaultColumnOrder.length
          && defaultColumnOrder.every((key) => storedOrder.includes(key));
        if (isValidOrder) setColumnOrder(storedOrder);
      } catch {
        window.localStorage.removeItem(columnOrderStorageKey);
      }
    }, 0);

    return () => window.clearTimeout(restoreOrder);
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

  function sortByColumn(key: ColumnKey) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  }

  function dropColumn(target: ColumnKey, event: DragEvent<HTMLTableCellElement>) {
    event.preventDefault();
    if (!draggedColumn || draggedColumn === target) return;

    setColumnOrder((current) => {
      const next = current.filter((key) => key !== draggedColumn);
      next.splice(next.indexOf(target), 0, draggedColumn);
      window.localStorage.setItem(columnOrderStorageKey, JSON.stringify(next));
      return next;
    });
    setDraggedColumn(null);
  }

  function resetColumnOrder() {
    setColumnOrder(defaultColumnOrder);
    window.localStorage.removeItem(columnOrderStorageKey);
  }

  function toggleYear(year: number) {
    setCollapsedYears((current) => {
      const next = new Set(current);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  }

  return (
    <div>
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
            <p className="mt-1 hidden text-[11px] text-slate-500 md:block">
              Select a header to sort. Drag headers to reorder.
            </p>
            <button
              type="button"
              onClick={resetColumnOrder}
              className="mt-1 hidden text-[11px] text-slate-500 underline decoration-white/10 underline-offset-4 transition hover:text-slate-200 md:inline"
            >
              Reset column order
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

      <div className="mt-4">
        {filteredRows.length > 0 ? (
          <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-slate-950/18">
            <div className="timeline-scroll overflow-x-auto">
              <table className="timeline-table table-fixed border-separate border-spacing-0">
                <thead className="bg-white/[0.055]">
                  <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {columnOrder.map((columnKey) => {
                      const column = columnSettings.find((item) => item.key === columnKey)!;
                      const isSorted = sort.key === column.key;
                      return (
                      <th
                        key={column.key}
                        draggable
                        onDragStart={() => setDraggedColumn(column.key)}
                        onDragEnd={() => setDraggedColumn(null)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => dropColumn(column.key, event)}
                        className={`timeline-column-${column.key} px-3 py-1.5 ${draggedColumn === column.key ? "opacity-45" : ""}`}
                      >
                        <button
                          type="button"
                          onClick={() => sortByColumn(column.key)}
                          aria-label={`Sort by ${column.label}${isSorted ? `, currently ${sort.direction === "asc" ? "ascending" : "descending"}` : ""}`}
                          className="flex w-full items-center gap-2 py-1.5 text-left outline-none transition hover:text-white focus-visible:text-white"
                        >
                          <span>{column.label}</span>
                          <span className={`text-[11px] transition ${isSorted ? "text-sky-200" : "text-slate-600"}`} aria-hidden="true">
                            {isSorted ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}
                          </span>
                        </button>
                      </th>
                    )})}
                  </tr>
                </thead>
                {groupedByYear.map(([year, yearRows]) => {
                  const isCollapsed = collapsedYears.has(year);

                  return (
                    <tbody key={year} className="bg-slate-950/20">
                      <tr className="timeline-year-row">
                        <th colSpan={5} className="border-t border-white/10 bg-white/[0.035] p-0 text-left">
                          <button
                            type="button"
                            onClick={() => toggleYear(year)}
                            aria-expanded={!isCollapsed}
                            className="timeline-year-toggle flex items-center gap-3 px-4 py-3 outline-none transition hover:bg-white/[0.025] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-200/60"
                          >
                            <span className="text-lg font-semibold text-white">{year}</span>
                            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                              {yearRows.length} events
                            </span>
                            <span className={`text-slate-400 transition ${isCollapsed ? "" : "rotate-180"}`} aria-hidden="true">⌄</span>
                          </button>
                        </th>
                      </tr>
                      {!isCollapsed ? yearRows.map((entry, index) => (
                        <tr
                          key={`${entry.year}-${entry.title}-${entry.dateLabel}-${index}`}
                          className="timeline-row border-t border-white/6 text-sm text-slate-200/90 hover:bg-white/[0.03]"
                        >
                          {columnOrder.map((columnKey) => (
                            <TimelineCell key={columnKey} column={columnKey} entry={entry} />
                          ))}
                        </tr>
                      )) : null}
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        ) : null}

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

function TimelineCell({ column, entry }: { column: ColumnKey; entry: TimelineRow }) {
  if (column === "date") {
    return (
      <td className="timeline-date whitespace-nowrap px-3 py-2.5 align-top text-[12px] text-slate-400">
        {entry.dateLabel}
      </td>
    );
  }

  if (column === "event") {
    return (
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
    );
  }

  return (
    <td className={`timeline-${column} whitespace-nowrap px-3 py-2.5 align-top text-slate-300`}>
      {entry[column]}
    </td>
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
