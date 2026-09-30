import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import statesTopology from "us-atlas/states-10m.json";

type ProofStat = {
  label: string;
  value: string;
  mapStates?: readonly string[];
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

export function ProofStrip({ stats }: { stats: readonly ProofStat[] }) {
  return (
    <section className="relative z-30 rounded-[1.45rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(4,11,26,0.14)] backdrop-blur-xl">
      <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0">
        {stats.map((stat) => stat.mapStates ? (
          <article
            key={stat.label}
            className="group relative flex-1 text-center md:text-left"
          >
            <button
              type="button"
              aria-label={`${stat.value} ${stat.label}. Show work footprint map.`}
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

            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto">
              <StatesMap activeStates={stat.mapStates} />
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
