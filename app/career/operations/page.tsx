import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../../site-shell";

export const metadata: Metadata = {
  title: "Lance Wolfe | Resume Hub",
  description: "The career subpage now lives in the main career hub.",
};

export default function OperationsPage() {
  return (
    <SiteShell
      eyebrow="Career"
      title="Resume hub"
      body="This section now lives in the main career page so the site stays simple and easier to maintain."
      primary={{ href: "/career/", label: "Open career hub" }}
      secondary={{ href: "/career/timeline/", label: "View timeline" }}
    >
      <section className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 text-sm leading-7 text-slate-300/85">
        This page is now a simple pointer back to the main career hub.
        <div className="mt-3">
          <Link href="/career/" className="text-sky-100 underline underline-offset-4">
            Go back to the career hub
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
