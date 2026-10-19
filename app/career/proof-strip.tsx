"use client";

import { geoAlbersUsa, geoPath } from "d3-geo";
import { ArrowIcon } from "../arrow-icon";
import { useId, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import statesTopology from "us-atlas/states-10m.json";

type ProofStat = {
  label: string;
  value: string;
  mapStates?: readonly string[];
  roleCounts?: readonly {
    name: string;
    count: number;
  }[];
  yearActivity?: readonly {
    year: number;
    count: number;
  }[];
};

const stateCodeByFips: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE",
  "11": "DC", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA",
  "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
  "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM",
  "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
  "54": "WV", "55": "WI", "56": "WY",
};

const mapWidth = 960;
const mapHeight = 560;
const topology = statesTopology as unknown as Topology<{
  states: GeometryCollection<{ name: string }>;
}>;
const stateFeatures = feature(topology, topology.objects.states).features;
const projection = geoAlbersUsa().fitExtent([[12, 12], [mapWidth - 12, mapHeight - 12]], {
  type: "FeatureCollection",
  features: stateFeatures,
});
const statePath = geoPath(projection);

function StatesMap({ activeStates }: { activeStates: readonly string[] }) {
  const active = new Set(activeStates);

  return (
    <div className="mx-auto w-full max-w-lg rounded-[1.25rem] border border-sky-200/20 bg-[#07111f]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/65">Work footprint</p>
          <p className="mt-1 text-sm font-semibold text-white">Where the work has taken me</p>
        </div>
        <p className="whitespace-nowrap text-[10px] text-slate-400">{activeStates.length} highlighted</p>
      </div>

      <svg
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        role="img"
        aria-label={`United States map with ${activeStates.length} worked states highlighted`}
        className="mt-3 h-auto w-full overflow-visible"
      >
        {stateFeatures.map((state) => {
          const fips = String(state.id).padStart(2, "0");
          const code = stateCodeByFips[fips];
          if (!code) return null;

          const isActive = active.has(code);
          const name = state.properties?.name ?? code;
          const path = statePath(state);
          if (!path) return null;

          return (
            <path
              key={code}
              d={path}
              aria-label={`${name}${isActive ? " — worked" : ""}`}
              className={isActive
                ? "fill-sky-300 stroke-sky-950/45 transition-colors hover:fill-sky-200"
                : "fill-white/[0.045] stroke-white/25 transition-colors hover:fill-white/10"
              }
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            >
              <title>{`${name} (${code})${isActive ? " — worked" : ""}`}</title>
            </path>
          );
        })}
      </svg>

      <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] text-slate-400">
        <span className="h-2.5 w-2.5 rounded-[3px] bg-sky-300" />
        States and districts represented in completed event work
      </div>
    </div>
  );
}

function RoleBreakdown({ roles }: { roles: readonly { name: string; count: number }[] }) {
  return (
    <div className="mx-auto w-full max-w-lg rounded-[1.25rem] border border-sky-200/20 bg-[#07111f]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/65">Career range</p>
          <p className="mt-1 text-sm font-semibold text-white">Credits by role</p>
        </div>
        <p className="whitespace-nowrap text-[10px] text-slate-400">Completed work</p>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-400">
        Completed credits spanning production, talent buying, marketing, staffing, hospitality, and operations.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {roles.map((role) => (
          <div
            key={role.name}
            className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2"
          >
            <span className="text-xs font-medium leading-tight text-slate-100">{role.name}</span>
            <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-sky-300 text-[10px] font-bold text-slate-950">
              {role.count}
            </span>
          </div>
        ))}
      </div>

      <a
        href="/career/timeline/"
        className="mt-3 flex min-h-11 items-center justify-between border-t border-white/10 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100/70 transition hover:text-sky-100 focus-visible:text-sky-100 focus-visible:outline-none"
      >
        Explore the full event history
        <ArrowIcon />
      </a>
    </div>
  );
}

function YearActivity({ years }: { years: readonly { year: number; count: number }[] }) {
  const peak = years.reduce((highest, year) => year.count > highest.count ? year : highest, years[0]);
  const maximum = Math.max(...years.map((year) => year.count), 1);

  return (
    <div className="mx-auto w-full max-w-lg rounded-[1.25rem] border border-sky-200/20 bg-[#07111f]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/65">Career momentum</p>
          <p className="mt-1 text-sm font-semibold text-white">Completed events by year</p>
        </div>
        <p className="whitespace-nowrap text-[10px] text-slate-400">{years[0].year}–{years.at(-1)?.year}</p>
      </div>

      <div className="mt-4 flex h-36 items-end gap-1.5 border-b border-white/15 px-1">
        {years.map((year) => (
          <div key={year.year} className="group/bar flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[9px] font-semibold tabular-nums text-sky-100/75">
              {year.count}
            </span>
            <div
              className="w-full rounded-t-md bg-sky-300/85 transition-colors group-hover/bar:bg-sky-200"
              style={{ height: `${Math.max(4, Math.round((year.count / maximum) * 100))}%` }}
              title={`${year.year}: ${year.count} completed events`}
            />
            <span className="pb-1 text-[8px] font-medium text-slate-500">{String(year.year).slice(-2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
        <span>Annual event volume</span>
        <span className="font-medium text-sky-100/70">Peak: {peak.year} · {peak.count} events</span>
      </div>
    </div>
  );
}

export function ProofStrip({ stats }: { stats: readonly ProofStat[] }) {
  const [openStat, setOpenStat] = useState<string | null>(null);
  const panelId = useId();
  const selected = stats.find((stat) => stat.label === openStat);

  return (
    <section className="rounded-[1.45rem] border border-white/10 bg-white/[0.04]">
      <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0">
        {stats.map((stat) => {
          const expandable = Boolean(stat.mapStates || stat.roleCounts || stat.yearActivity);
          const content = <>
            <span className="flex items-center justify-center gap-2 md:justify-start">
              <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{stat.value}</span>
              {expandable ? <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 text-sky-200 ${openStat === stat.label ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg> : null}
            </span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">{stat.label}</span>
          </>;
          return expandable ? (
            <button key={stat.label} type="button" aria-expanded={openStat === stat.label} aria-controls={panelId}
              onClick={() => setOpenStat(openStat === stat.label ? null : stat.label)}
              onKeyDown={(event) => { if (event.key === "Escape") setOpenStat(null); }}
              className="min-h-11 flex-1 cursor-pointer rounded-xl px-4 py-3 text-center hover:bg-white/[0.04] sm:px-5 sm:py-4 md:text-left">
              {content}
            </button>
          ) : <div key={stat.label} className="flex-1 px-4 py-3 text-center sm:px-5 sm:py-4 md:text-left">{content}</div>;
        })}
      </div>
      <div id={panelId} hidden={!selected} className="border-t border-white/10 p-3">
        {selected?.mapStates ? <StatesMap activeStates={selected.mapStates} />
          : selected?.roleCounts ? <RoleBreakdown roles={selected.roleCounts} />
          : selected?.yearActivity ? <YearActivity years={selected.yearActivity} /> : null}
      </div>
    </section>
  );
}
