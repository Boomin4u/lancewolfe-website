import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "../site-shell";
import { buildPageMetadata } from "../seo";
import { InternalNav } from "../internal-nav";

const profileLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lance-wolfe-53765154" },
  { label: "Facebook", href: "https://facebook.com/boomin4u" },
  { label: "Instagram", href: "https://instagram.com/boomin4u" },
] as const;

const focusPoints = [
  {
    title: "Core capabilities",
    text: "Event operations, workforce leadership, hospitality, talent buying, venue marketing, and independent production.",
  },
  {
    title: "Working style",
    text: "Calm under pressure, practical in the moment, and focused on systems that help teams execute consistently.",
  },
  {
    title: "Current direction",
    text: "Building dependable teams and repeatable operating systems for festivals, venues, hospitality programs, and large-scale live events.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "About Lance Wolfe | Live Event Operations Professional",
  description:
    "Meet Lance Wolfe, a Florida-based live-event operations, staffing, hospitality, and festival professional with more than a decade of nationwide experience.",
  path: "/about/",
});

export default function AboutPage() {
  const person = {
    "@type": "Person",
    "@id": "https://lancewolfe.com/#person",
    name: "Lance Wolfe",
    url: "https://lancewolfe.com/",
    image: "https://lancewolfe.com/profile-picture.jpg",
    jobTitle: "Live Event Operations Professional",
    description:
      "Florida-based live-event operations, staffing, hospitality, and festival professional with nationwide experience.",
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Florida",
        addressCountry: "US",
      },
    },
    knowsAbout: [
      "Live event operations",
      "Event staffing",
      "Festival operations",
      "Hospitality operations",
      "Event production",
    ],
    sameAs: profileLinks.map((link) => link.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://lancewolfe.com/about/#profile",
            url: "https://lancewolfe.com/about/",
            name: "About Lance Wolfe",
            dateModified: "2026-09-29",
            mainEntity: person,
          }),
        }}
      />
      <SiteShell
        eyebrow="About Lance Wolfe"
        title="Lance Wolfe"
        subtitle="Florida-based. Nationwide experience."
        body="I’m a live-event operations professional with more than a decade of experience across staffing, hospitality, festivals, sporting events, and event production. I help teams stay organized, keep guest experiences moving, and build systems that hold up under pressure."
        portrait={
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/12 bg-slate-900 shadow-[0_0_0_6px_rgba(255,255,255,0.03)] sm:h-32 sm:w-32 md:h-36 md:w-36">
            <Image
              src="/profile-picture.jpg"
              alt="Lance Wolfe, Florida-based live-event operations professional"
              fill
              priority
              sizes="(max-width: 768px) 112px, 144px"
              className="object-cover"
              style={{ objectPosition: "center 28%" }}
            />
          </div>
        }
        primary={{ href: "/career/", label: "Explore My Career" }}
        secondary={{ href: "/chronicles/", label: "Read My Chronicles" }}
      >
        <section className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
            Professional background
          </div>
          <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-300/85 md:grid-cols-2 md:gap-6">
            <p>
              My career spans independently produced events and nationwide programs for major music festivals, sporting events, and premium hospitality environments. That range has shaped a practical approach to operations: understand the people, anticipate pressure points, and make the plan easy to execute.
            </p>
            <p>
              Today, my work centers on event staffing, workforce leadership, hospitality operations, and on-site execution. I’m especially interested in the systems and judgment that help large teams deliver consistent experiences in fast-moving environments.
            </p>
          </div>
        </section>

        <section className="mt-3 grid gap-3 md:grid-cols-3">
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
            Find Lance online
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {profileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1.5 text-sm text-slate-200 transition hover:border-sky-200/30 hover:text-white"
              >
                Lance Wolfe on {link.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300/85">
            For detailed work history, explore <InternalNav href="/career/" className="text-sky-100 underline underline-offset-4">Lance Wolfe’s career and resumes</InternalNav> or view the <InternalNav href="/career/timeline/" className="text-sky-100 underline underline-offset-4">complete event history</InternalNav>.
          </p>
        </section>
      </SiteShell>
    </>
  );
}
