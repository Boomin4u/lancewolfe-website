import { SiteShell } from "../site-shell";
import type { ChronicleEntry } from "./chronicle-types";
import { InternalNav } from "../internal-nav";

export function ChronicleArticle({
  entry,
  previousHref,
  previousTitle,
  nextHref,
  nextTitle,
}: {
  entry: ChronicleEntry;
  previousHref?: string;
  previousTitle?: string;
  nextHref?: string;
  nextTitle?: string;
}) {
  const articleUrl = `https://lancewolfe.com/chronicles/${entry.slug}/`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${articleUrl}#article`,
            mainEntityOfPage: articleUrl,
            headline: entry.title,
            description: entry.excerpt,
            image: `https://lancewolfe.com${entry.image ?? "/chronicles-featured-post.png"}`,
            datePublished: entry.sortDate,
            dateModified: entry.sortDate,
            author: {
              "@id": "https://lancewolfe.com/#person",
              "@type": "Person",
              name: "Lance Wolfe",
              url: "https://lancewolfe.com/about/",
            },
            publisher: {
              "@id": "https://lancewolfe.com/#person",
            },
          }),
        }}
      />
      <SiteShell
        eyebrow="The Chronicles of Lance Wolfe"
        title={entry.title}
        subtitle={entry.tag}
        body={entry.featuredSummary}
        primary={{ href: "/chronicles/", label: "More from Lance Wolfe" }}
        secondary={{ href: "/career/", label: "Explore Lance’s career" }}
        childrenSpacingClassName="mt-4"
      >
      <article className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          <span>{entry.date}</span>
          <span>•</span>
          <span>{entry.readTime}</span>
        </div>

        <div className="mt-4 space-y-6">
          {entry.sections.map((section, sectionIndex) => (
            <section key={`${entry.slug}-${sectionIndex}`} className="space-y-3">
              {section.heading ? (
                <h2 className="text-lg font-semibold text-white">
                  {section.heading}
                </h2>
              ) : null}

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`${entry.slug}-${sectionIndex}-${paragraphIndex}`}
                  className="text-sm leading-7 text-slate-300/88 sm:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className="space-y-2 pl-4 text-sm leading-7 text-slate-300/88">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${entry.slug}-${sectionIndex}-${bulletIndex}`} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        {entry.privacyNote ? (
          <p className="mt-6 text-sm italic leading-7 text-slate-400">
            {entry.privacyNote}
          </p>
        ) : null}
      </article>

      {(previousHref || nextHref) ? (
        <section className="mt-4 grid gap-3 sm:grid-cols-2">
          {previousHref ? (
            <InternalNav
              href={previousHref}
              className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-slate-950/30"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Previous
              </div>
              <h2 className="mt-2 text-lg font-semibold text-white">
                {previousTitle}
              </h2>
            </InternalNav>
          ) : (
            <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 text-sm text-slate-400">
              No previous entry
            </div>
          )}

          {nextHref ? (
            <InternalNav
              href={nextHref}
              className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-slate-950/30"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Next
              </div>
              <h2 className="mt-2 text-lg font-semibold text-white">{nextTitle}</h2>
            </InternalNav>
          ) : (
            <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 text-sm text-slate-400">
              No next entry
            </div>
          )}
        </section>
      ) : null}
      </SiteShell>
    </>
  );
}
