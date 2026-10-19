import { InternalNav } from "./internal-nav";
import { ArrowIcon } from "./arrow-icon";

const paths = [
  {
    title: "Event production",
    description: "Looking toward new event production opportunities, drawing on independently organized events, venue operations, talent buying, and hands-on staffing experience.",
    resume: "/resumes/full-event-resume.pdf",
    resumeLabel: "Full event resume (PDF)",
    history: "/career/timeline/?role=Producer",
    historyLabel: "Production history",
  },
  {
    title: "Staffing & workforce leadership",
    description: "Recruiting, scheduling, onboarding, check-in, and on-site execution. Independently leads 100+ staff and supports deployments of 200–800 workers.",
    resume: "/resumes/staffing-resume.pdf",
    resumeLabel: "Staffing resume (PDF)",
    history: "/career/timeline/?role=Staffing%20%2F%20Staffing%20Management",
    historyLabel: "Staffing history",
  },
  {
    title: "Bar & hospitality operations",
    description: "Hands-on experience from bar builds and POS setup to inventory, live service, troubleshooting, breakdown, and load-out.",
    resume: "/resumes/bar-ops-resume.pdf",
    resumeLabel: "Bar & operations resume (PDF)",
    history: "/career/timeline/?role=Bartender",
    historyLabel: "Bar & hospitality history",
  },
];

export function HiringPaths() {
  return (
    <section aria-labelledby="hiring-paths-heading" className="mb-3 space-y-3">
      <h2 id="hiring-paths-heading" className="px-1 text-lg font-semibold text-white">Where I can help</h2>
      <div className="grid gap-3 lg:grid-cols-3">
        {paths.map((path) => (
          <article key={path.title} className="flex flex-col rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-white">{path.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-slate-300/85">{path.description}</p>
            <a href={path.resume} target="_blank" rel="noreferrer" aria-label={`${path.resumeLabel}, opens in a new tab`} className="mt-3 inline-flex min-h-11 items-center self-start rounded-full border border-sky-200/20 bg-sky-200/10 px-3 text-sm font-medium text-sky-100">
              {path.resumeLabel}<ArrowIcon external />
            </a>
            <InternalNav href={path.history} className="mt-1 inline-flex min-h-11 items-center self-start text-sm text-slate-300">
              {path.historyLabel}<ArrowIcon />
            </InternalNav>
          </article>
        ))}
      </div>
      <article className="rounded-[1.45rem] border border-sky-200/15 bg-sky-200/[0.05] p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-100/75">In practice · Forbidden Kingdom</p>
        <h3 className="mt-2 text-xl font-semibold text-white">40 to 80 staff. One day to adapt.</h3>
        <p className="mt-2 text-sm leading-7 text-slate-300/85">When the staffing request doubled the day before the event, I used applicant forms, a hiring and check-in spreadsheet, call-time pivot tables, and direct staff communications to deliver all 80. I then worked with the client to place additional backups where they were needed.</p>
        <InternalNav href="/chronicles/this-one-was-mine/" className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-sky-100">Read the staffing story<ArrowIcon /></InternalNav>
      </article>
    </section>
  );
}
