type ProofStat = {
  label: string;
  value: string;
};

export function ProofStrip({ stats }: { stats: ProofStat[] }) {
  return (
    <section className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(4,11,26,0.14)] backdrop-blur-xl">
      <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0">
        {stats.map((stat) => (
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
