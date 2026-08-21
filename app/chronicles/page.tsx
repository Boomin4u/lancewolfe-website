import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "../site-shell";
import { chronicles } from "./chronicles-data";

export const metadata: Metadata = {
  title: "Lance Wolfe | Chronicles",
  description:
    "The Chronicles of Lance Wolfe, a personal writing space for career stories, lessons, and behind-the-scenes notes.",
};

export default function ChroniclesPage() {
  const featuredPost = chronicles[0];

  return (
    <SiteShell
      eyebrow="The Chronicles of Lance Wolfe"
      title="The Chronicles of Lance Wolfe"
      subtitle="Stories, lessons, and behind-the-scenes notes"
      body=""
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
      primary={{ href: `/chronicles/${featuredPost.slug}`, label: "Read the latest" }}
      secondary={{ href: "/career", label: "View Resumes" }}
    >
      <section className="grid gap-4">
        <Link
          href={`/chronicles/${featuredPost.slug}`}
          aria-label={`Open featured post: ${featuredPost.title}`}
          className="group block overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.045] transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
                Featured post
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300/85">
                {featuredPost.featuredSummary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                <span>{featuredPost.tag}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>
              <div className="mt-5">
                <span className="inline-flex rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition group-hover:border-white/20 group-hover:bg-white/[0.12]">
                  Open article
                </span>
              </div>
            </div>

            <div className="relative min-h-[220px] overflow-hidden border-t border-white/10 bg-slate-900 lg:min-h-full lg:border-l lg:border-t-0">
              <Image
                src="/chronicles-featured-post.png"
                alt="Backstage production desk with notes and headphones"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={{ objectPosition: "center 38%" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,32,0.08),rgba(7,17,32,0.35))]" />
            </div>
          </div>
        </Link>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3 md:items-stretch">
        {chronicles.map((entry) => (
          <Link
            key={entry.slug}
            href={`/chronicles/${entry.slug}`}
            className="h-full rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition hover:border-white/20 hover:bg-slate-950/30"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              {entry.tag}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{entry.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/85">{entry.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
              <span>{entry.date}</span>
              <span>•</span>
              <span>{entry.readTime}</span>
            </div>
          </Link>
        ))}
      </section>

    </SiteShell>
  );
}
