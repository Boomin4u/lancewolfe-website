import Link from "next/link";
import { SiteShell } from "./site-shell";

export default function NotFound() {
  return (
    <SiteShell
      eyebrow="404"
      title="Page not found"
      body="That page may have moved or never existed. Let’s get you back to the useful parts of the site."
      primary={{ href: "/", label: "Back home" }}
      secondary={{ href: "/career", label: "View resumes" }}
    >
      <section className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/75">
          Try one of these
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Link
            href="/chronicles"
            className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition hover:-translate-y-0.5 hover:border-sky-200/35 hover:bg-white/[0.06]"
          >
            <h2 className="text-lg font-semibold text-white">Chronicles</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">
              Read short entries about the work behind the work.
            </p>
          </Link>
          <Link
            href="/about"
            className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition hover:-translate-y-0.5 hover:border-sky-200/35 hover:bg-white/[0.06]"
          >
            <h2 className="text-lg font-semibold text-white">About</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">
              Get a quick sense of my background and working style.
            </p>
          </Link>
          <Link
            href="/"
            className="rounded-[1.35rem] border border-white/10 bg-slate-950/22 p-4 transition hover:-translate-y-0.5 hover:border-sky-200/35 hover:bg-white/[0.06]"
          >
            <h2 className="text-lg font-semibold text-white">Home</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300/85">
              Return to the main page and start from the top.
            </p>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
