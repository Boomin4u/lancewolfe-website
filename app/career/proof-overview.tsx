import { ProofStrip } from "./proof-strip";
import { proofStats } from "./proof-data";

export function ProofOverview() {
  return (
    <section
      aria-label="Career at a glance"
      className="relative z-30 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3.5 shadow-[0_18px_48px_rgba(4,11,26,0.14)] backdrop-blur-xl sm:p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-100/78">
          At a glance
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Overview
        </div>
      </div>
      <div className="mt-3">
        <ProofStrip stats={proofStats} />
      </div>
    </section>
  );
}
