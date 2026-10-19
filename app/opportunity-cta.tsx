const linkedInUrl = "https://www.linkedin.com/in/lance-wolfe-53765154";

export function OpportunityCta({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="opportunity-heading"
      className={`rounded-[1.45rem] border border-sky-200/15 bg-[linear-gradient(135deg,rgba(91,203,235,0.1),rgba(255,255,255,0.035))] shadow-[0_20px_60px_rgba(4,11,26,0.16)] ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
            Build the next event
          </p>
          <h2 id="opportunity-heading" className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Planning an event or building a team?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300/85">
            I’m Florida-based and available for nationwide event operations, staffing, hospitality, and production opportunities.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-sky-200/25 bg-sky-200/14 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-200/40 hover:bg-sky-200/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
          >
            Connect on LinkedIn ↗
          </a>
          <a
            href="/resumes/full-event-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
          >
            View resume
          </a>
        </div>
      </div>
    </section>
  );
}
