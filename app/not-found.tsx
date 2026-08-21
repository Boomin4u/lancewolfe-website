import Link from "next/link";
import { SiteShell } from "./site-shell";

export default function NotFound() {
  return (
    <SiteShell
      eyebrow="404"
      title="Page not found"
      subtitle="Broken link or missing page"
      body="That page may have moved, been renamed, or never existed. The good news is the rest of the site is one click away."
      primary={{ href: "/", label: "Back home" }}
      secondary={{ href: "/career", label: "View resumes" }}
    >
      <section className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
              Quick escape routes
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300/80">
              If you were aiming for something specific, try one of these pages instead.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-300">
            Lost in the weeds
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link
            href="/chronicles"
            className="group rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sky-200/35 hover:bg-white/[0.06]"
          >
            <h2 className="text-lg font-semibold text-white transition group-hover:text-sky-50">
              Chronicles
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">
              Read short entries about the work behind the work.
            </p>
          </Link>
          <Link
            href="/about"
            className="group rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sky-200/35 hover:bg-white/[0.06]"
          >
            <h2 className="text-lg font-semibold text-white transition group-hover:text-sky-50">
              About
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">
              Get a quick sense of my background and working style.
            </p>
          </Link>
          <Link
            href="/"
            className="group rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sky-200/35 hover:bg-white/[0.06]"
          >
            <h2 className="text-lg font-semibold text-white transition group-hover:text-sky-50">
              Home
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">
              Return to the main page and start from the top.
            </p>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
