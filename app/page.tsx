import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "./site-shell";

export const metadata: Metadata = {
  title: "Lance Wolfe | Home",
  description:
    "Personal home page for Lance Wolfe, with quick access to resumes and the Chronicles.",
};

export default function Home() {
  return (
    <SiteShell
      eyebrow="Lance Wolfe"
      title="Lance Wolfe"
      subtitle="Orlando-based. Nationwide experience."
      body="Live-event operations professional with 10+ years in hospitality and nationwide experience across major music festivals, sporting events, and premium hospitality programs."
      primary={{ href: "/career", label: "View resumes" }}
      secondary={{ href: "/chronicles", label: "Read the chronicles" }}
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
      <section className="grid gap-4 md:grid-cols-3 -mt-1 sm:-mt-2">
        <InfoCard
          title="Career"
          text="A clean resume hub with full-event and specialized resume views."
          href="/career"
          action="View resumes"
        />
        <InfoCard
          title="Chronicles"
          text="The thinking behind the mind at work."
          href="/chronicles"
          action="Read the chronicles"
        />
        <InfoCard
          title="About"
          text="A quick bio, what I do, and what I’m building next."
          href="/about"
          action="Learn more"
          tone="soft"
        />
      </section>
    </SiteShell>
  );
}

function InfoCard({
  title,
  text,
  href,
  action,
  tone = "default",
}: {
  title: string;
  text: string;
  href: string;
  action: string;
  tone?: "default" | "soft";
}) {
  const isSoft = tone === "soft";

  return (
    <Link
      href={href}
      className={`group rounded-[1.35rem] border p-4 transition duration-200 hover:-translate-y-0.5 ${
        isSoft
          ? "border-white/8 bg-white/[0.025] hover:border-white/16 hover:bg-white/[0.045]"
          : "border-white/10 bg-white/[0.04] hover:border-sky-200/35 hover:bg-white/[0.06]"
      }`}
    >
      <h2
        className={`text-lg font-semibold transition ${
          isSoft ? "text-slate-100 group-hover:text-white" : "text-white group-hover:text-sky-50"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-2 text-sm leading-6 ${
          isSoft ? "text-slate-400/90" : "text-slate-300/85"
        }`}
      >
        {text}
      </p>
      <div
        className={`mt-4 inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition ${
          isSoft
            ? "border-white/8 bg-slate-950/25 text-slate-300 transition group-hover:border-white/14 group-hover:bg-slate-950/45 group-hover:text-white"
            : "border-white/10 bg-slate-950/35 text-slate-200 group-hover:border-sky-200/25 group-hover:bg-slate-950/55 group-hover:text-white"
        }`}
      >
        {action} →
      </div>
    </Link>
  );
}