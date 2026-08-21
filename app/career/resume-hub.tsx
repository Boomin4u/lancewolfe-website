import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "../site-shell";
import { ProofStrip } from "./proof-strip";
import { proofStats } from "./proof-data";

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

export function ResumeHub() {
  return (
    <SiteShell
      eyebrow="Resume hub"
      title="Lance Wolfe"
      subtitle="Florida-based. Nationwide experience."
      body="Live-event operations professional with 10+ years in hospitality and nationwide experience across major music festivals, sporting events, and premium hospitality programs."
      primary={{ href: "/resumes/full-event-resume.pdf", label: "View resume" }}
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
      <ProofStrip stats={proofStats} />

      <section className="mt-2 rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_18px_50px_rgba(4,11,26,0.14)] backdrop-blur-xl sm:p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-sky-100/75">
              Event history
            </p>
            <h2 className="mt-1.5 text-lg font-semibold text-white">Timeline</h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-300/80">
              View the full event history in a cleaner timeline layout.
            </p>
          </div>
          <Link
            href="/career/timeline/"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/[0.09]"
          >
            Open timeline
          </Link>
        </div>
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
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.1]"
            >
              View PDF
            </a>
            <a
              href={primaryResume.href}
              download
              className="text-sm font-medium text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/30"
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
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.1]"
                >
                  View PDF
                </a>
                <a
                  href={card.href}
                  download
                  className="text-sm font-medium text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/30"
                >
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
