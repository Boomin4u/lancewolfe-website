import type { Metadata } from "next";
import { SiteShell } from "../../site-shell";
import { InternalNav } from "../../internal-nav";
import { buildPageMetadata } from "../../seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Lance Wolfe | Resume Hub",
  description: "The events resume now lives in the main career hub.",
  path: "/career/events/",
});

export default function EventsPage() {
  return (
    <SiteShell
      eyebrow="Career"
      title="Resume hub"
      body="The events resume is now part of the main career page. Use the hub for the current downloads and the timeline."
      primary={{ href: "/career/", label: "Open career hub" }}
      secondary={{ href: "/career/timeline/", label: "View timeline" }}
    >
      <section className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 text-sm leading-7 text-slate-300/85">
        This section is being folded into the simpler career hub so there is one
        clear place to view current resumes.
        <div className="mt-3">
          <InternalNav href="/career/" className="text-sky-100 underline underline-offset-4">
            Go back to the career hub
          </InternalNav>
        </div>
      </section>
    </SiteShell>
  );
}
