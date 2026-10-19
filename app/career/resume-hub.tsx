import { ArrowIcon } from "../arrow-icon";
import Image from "next/image";
import { SiteShell } from "../site-shell";
import { ProofOverview } from "./proof-overview";
import { InternalNav } from "../internal-nav";
import { OpportunityCta } from "../opportunity-cta";

const resumeCards = [
  {
    title: "Staffing Resume",
    description: "For roles focused on recruiting, workforce leadership, and festival staffing.",
    href: "/resumes/staffing-resume.pdf",
  },
  {
    title: "Bar / Ops Resume",
    description: "For hospitality, operations, venue work, and live-service leadership.",
    href: "/resumes/bar-ops-resume.pdf",
  },
];

const primaryResume = {
  title: "Full Event Resume",
  description: "For a broader look at the full event and production history.",
  href: "/resumes/full-event-resume.pdf",
};

const bestFitLinks = [
  {
    label: "Event production",
    detail: "See independently produced events",
    href: "/career/timeline/?role=Producer",
  },
  {
    label: "Event operations",
    detail: "Explore the complete event record",
    href: "/career/timeline/",
  },
  {
    label: "Workforce leadership",
    detail: "See staffing management credits",
    href: "/career/timeline/?role=Staffing%20%2F%20Staffing%20Management",
  },
  {
    label: "Hospitality programs",
    detail: "See bartender and service experience",
    href: "/career/timeline/?role=Bartender",
  },
  {
    label: "Talent buying & marketing",
    detail: "See venue and talent experience",
    href: "/career/timeline/?role=Talent%20Buying%20%2F%20Marketing",
  },
] as const;

export function ResumeHub() {
  return (
    <SiteShell
      eyebrow="Career"
      title="Lance Wolfe"
      subtitle="Florida-based. Nationwide experience."
      body="Live-event operations professional with 11+ years in hospitality and nationwide experience across major music festivals, sporting events, and premium hospitality programs."
      primary={{ href: "/resumes/full-event-resume.pdf", label: "View résumé", ariaLabel: "View full event résumé (PDF)" }}
      secondary={{ href: "/career/timeline/", label: "Timeline" }}
      portrait={
        <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/12 bg-slate-900 shadow-[0_0_0_6px_rgba(255,255,255,0.03)] sm:h-32 sm:w-32 md:h-36 md:w-36">
          <Image
            src="/profile-picture.jpg"
            alt="Lance Wolfe portrait"
            fill
            priority
            sizes="(max-width: 768px) 112px, 144px"
            className="object-cover"
            style={{ objectPosition: "center 28%" }}
          />
        </div>
      }
      >
      <ProofOverview />

      <section className="mt-2 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-3.5 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-sky-100/75">
          Best-fit work
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {bestFitLinks.map((focus) => (
            <InternalNav
              key={focus.label}
              href={focus.href}
              className="group rounded-[1rem] border border-white/10 bg-slate-950/30 px-3 py-2.5 transition hover:border-sky-200/30 hover:bg-slate-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
            >
              <span className="flex items-center justify-between gap-3 text-sm font-medium text-slate-100">
                {focus.label}
                <ArrowIcon />
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{focus.detail}</span>
            </InternalNav>
          ))}
        </div>
      </section>

      <section aria-labelledby="operational-proof-heading" className="my-6 border-y border-white/10 py-5">
        <h2 id="operational-proof-heading" className="text-lg font-semibold text-white">Staffing in practice</h2>
        <p className="mt-2 text-sm leading-7 text-slate-300/85">Independently leads 100+ staff and supports deployments of 200–800 workers.</p>
        <p className="mt-2 text-sm leading-7 text-slate-300/85">At Forbidden Kingdom, a staffing request doubled from 40 to 80 the day before the event. Applicant tracking, clear staff communications, and organized check-ins helped deliver all 80.</p>
        <InternalNav href="/chronicles/this-one-was-mine/" className="mt-2 inline-flex min-h-11 items-center text-sm text-sky-100">Read the staffing story<ArrowIcon /></InternalNav>
      </section>

      <section className="mt-2 rounded-[1.65rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(4,11,26,0.18)] backdrop-blur-xl sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-100/78">
              Resume hub
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Staffing, operations, and event work in one clean place
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.45rem] border border-sky-200/15 bg-sky-200/6 p-3.5 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{primaryResume.title}</h2>
              <p className="mt-1 max-w-md text-sm leading-6 text-slate-300/85">
                Best for a full picture of event, hospitality, and production work.
              </p>
            </div>
            <div className="text-sm text-slate-400">
              Best for the broadest event-production view
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <a
              href={primaryResume.href}
              aria-label="View full event resume (PDF, opens in a new tab)"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.1]"
            >
              View résumé
            </a>
            <a
              href={primaryResume.href}
              aria-label="Download full event resume (PDF)"
              download
              className="inline-flex min-h-11 items-center text-sm font-medium text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/30"
            >
              Download
            </a>
          </div>
        </div>

        <div className="mt-2 space-y-2.5">
          {resumeCards.map((card) => (
            <article
              key={card.href}
              className="rounded-[1.25rem] border border-white/10 bg-slate-950/22 p-3.5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">{card.title}</h2>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300/85">{card.description}</p>
                </div>
                <div className="text-sm text-slate-400">
                  {card.title === "Staffing Resume"
                    ? "Best for recruiting and workforce leadership"
                    : card.title === "Bar / Ops Resume"
                      ? "Best for hospitality and venue operations"
                      : "Best for the broadest event-production view"}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={card.href}
                  aria-label={`View ${card.title} (PDF, opens in a new tab)`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.1]"
                >
                  View résumé
                </a>
                <a
                  href={card.href}
                  aria-label={`Download ${card.title} (PDF)`}
                  download
                  className="inline-flex min-h-11 items-center text-sm font-medium text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/30"
                >
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-3">
        <OpportunityCta />
      </div>
    </SiteShell>
  );
}
