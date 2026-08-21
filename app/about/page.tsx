import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "../site-shell";

const focusPoints = [
  {
    title: "Career focus",
    text: "Live events, staffing, hospitality, and operations across festivals and venues.",
  },
  {
    title: "Working style",
    text: "Calm, practical, and process-minded. I like systems that keep teams moving well under pressure.",
  },
  {
    title: "Current direction",
    text: "A clearer personal site, current resumes, and more writing over time.",
  },
];

export const metadata: Metadata = {
  title: "Lance Wolfe | About",
  description:
    "Short bio for Lance Wolfe, including career focus, working style, and current direction.",
};

export default function AboutPage() {
  return (
    <SiteShell
      eyebrow="About"
      title="Lance Wolfe"
      body="I work in live events, staffing, hospitality, and operations. My career has focused on helping teams stay organized, keeping experiences running smoothly, and building systems that hold up under pressure."
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
      primary={{ href: "/career", label: "View Resumes" }}
      secondary={{ href: "/chronicles", label: "Read The Chronicles" }}
    >
      <section className="grid gap-3 md:grid-cols-3">
        {focusPoints.map((point) => (
          <article
            key={point.title}
            className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-3.5"
          >
            <h2 className="text-lg font-semibold text-white">{point.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">{point.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-3 rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
          A few notes
        </div>
        <p className="mt-2.5 max-w-2xl text-sm leading-7 text-slate-300/85">
          If you’re looking for my work history, the career page has the current
          resume downloads.
        </p>
      </section>
    </SiteShell>
  );
}