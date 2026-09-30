"use client";

import { geoAlbersUsa, geoPath } from "d3-geo";
import { useState } from "react";
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
const topology = statesTopology as unknown as Topology<{ states: GeometryCollection }>;
const stateFeatures = feature(topology, topology.objects.states).features;
const projection = geoAlbersUsa().fitExtent([[12, 12], [mapWidth - 12, mapHeight - 12]], {
  type: "FeatureCollection",
  features: stateFeatures,
});
const statePath = geoPath(projection);

function StatesMap({ activeStates }: { activeStates: readonly string[] }) {
  const active = new Set(activeStates);

  return (
    <div className="w-[min(88vw,30rem)] rounded-[1.25rem] border border-sky-200/20 bg-[#07111f]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl">
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
    <div className="w-[min(88vw,30rem)] rounded-[1.25rem] border border-sky-200/20 bg-[#07111f]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl">
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
        className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100/70 transition hover:text-sky-100 focus-visible:text-sky-100 focus-visible:outline-none"
      >
        Explore the full event history
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function YearActivity({ years }: { years: readonly { year: number; count: number }[] }) {
  const peak = years.reduce((highest, year) => year.count > highest.count ? year : highest, years[0]);
  const maximum = Math.max(...years.map((year) => year.count), 1);

  return (
    <div className="w-[min(88vw,30rem)] rounded-[1.25rem] border border-sky-200/20 bg-[#07111f]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl">
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
            <span className="text-[8px] font-semibold text-slate-400 opacity-0 transition group-hover/bar:opacity-100">
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

  function isTouchInteraction() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  function toggleOnTouch(label: string) {
    if (isTouchInteraction()) {
      setOpenStat((current) => current === label ? null : label);
    }
  }

  return (
    <section className="relative z-30 rounded-[1.45rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(4,11,26,0.14)] backdrop-blur-xl">
      <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0">
        {stats.map((stat) => stat.mapStates || stat.roleCounts || stat.yearActivity ? (
          <article
            key={stat.label}
            className="group relative flex-1 text-center md:text-left"
          >
            {stat.roleCounts ? (
              <a
                href="/career/timeline/"
                aria-label={`${stat.value} ${stat.label}. Explore the full event history.`}
                aria-expanded={openStat === stat.label}
                onClick={(event) => {
                  if (isTouchInteraction() && openStat !== stat.label) {
                    event.preventDefault();
                    setOpenStat(stat.label);
                  }
                }}
                className="block w-full cursor-pointer px-4 py-3 text-center outline-none sm:px-5 sm:py-4 md:text-left"
              >
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{stat.value}</span>
                  <span className="text-[10px] text-sky-200/70 transition group-hover:translate-x-0.5 group-hover:text-sky-100 group-focus-within:translate-x-0.5 group-focus-within:text-sky-100">↗</span>
                </div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
                  {stat.label}
                </div>
              </a>
            ) : (
              <button
                type="button"
                aria-label={`${stat.value} ${stat.label}. Show ${stat.yearActivity ? "annual event activity" : "work footprint map"}.`}
                aria-expanded={openStat === stat.label}
                onClick={() => toggleOnTouch(stat.label)}
                className="w-full cursor-pointer px-4 py-3 text-center outline-none sm:px-5 sm:py-4 md:text-left"
              >
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{stat.value}</span>
                  <span className="text-[10px] text-sky-200/70 transition group-hover:translate-x-0.5 group-hover:text-sky-100 group-focus-within:translate-x-0.5 group-focus-within:text-sky-100">↗</span>
                </div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
                  {stat.label}
                </div>
              </button>
            )}

            <div className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 transition duration-200 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 ${openStat === stat.label ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}>
              <button
                type="button"
                aria-label={`Close ${stat.label} details`}
                onClick={() => setOpenStat(null)}
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-sm text-slate-300 backdrop-blur transition hover:border-white/20 hover:text-white md:hidden"
              >
                ×
              </button>
              {stat.mapStates ? (
                <StatesMap activeStates={stat.mapStates} />
              ) : stat.roleCounts ? (
                <RoleBreakdown roles={stat.roleCounts} />
              ) : stat.yearActivity ? (
                <YearActivity years={stat.yearActivity} />
              ) : null}
            </div>
          </article>
        ) : (
          <article
            key={stat.label}
            className="flex-1 px-4 py-3 text-center sm:px-5 sm:py-4 md:text-left"
          >
            <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
              {stat.label}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
