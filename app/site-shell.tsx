import type { ReactNode } from "react";
import { InternalNav } from "./internal-nav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/career/", label: "Career" },
  { href: "/chronicles/", label: "Chronicles" },
  { href: "/about/", label: "About" },
];

const socialLinks = [
  {
    href: "https://facebook.com/boomin4u",
    label: "Facebook",
    icon: "f",
  },
  {
    href: "https://instagram.com/boomin4u",
    label: "Instagram",
    icon: "ig",
  },
] as const;

export function SiteShell({
  eyebrow,
  title,
  subtitle,
  body,
  primary,
  secondary,
  portrait,
  children,
  childrenSpacingClassName = "mt-3",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  body: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  portrait?: ReactNode;
  children?: ReactNode;
  childrenSpacingClassName?: string;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(91,203,235,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(11,31,59,0.22),_transparent_36%),linear-gradient(180deg,#071120_0%,#091521_100%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-100/78">
            {eyebrow}
          </div>
          <nav className="flex flex-wrap gap-2 text-sm text-slate-300">
            {navLinks.map((item) => (
              <InternalNav
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {item.label}
              </InternalNav>
            ))}
          </nav>
        </header>

        <section className="mt-6 rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(4,11,26,0.24)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {portrait ? <div className="md:shrink-0">{portrait}</div> : null}
            <div className="min-w-0 flex-1">
              <h1
                className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-sora), var(--font-inter), sans-serif" }}
              >
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                  {subtitle}
                </p>
              ) : null}
              {body.trim().length > 0 ? (
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200/84 sm:text-lg">
                  {body}
                </p>
              ) : null}
              {primary || secondary ? (
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {primary ? (
                    <InternalNav
                      href={primary.href}
                      className="rounded-full border border-sky-200/25 bg-sky-200/14 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(91,203,235,0.12)] transition hover:border-sky-200/40 hover:bg-sky-200/18"
                    >
                      {primary.label}
                    </InternalNav>
                  ) : null}
                  {secondary ? (
                    <InternalNav
                      href={secondary.href}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/[0.09]"
                    >
                      {secondary.label}
                    </InternalNav>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {children ? <div className={childrenSpacingClassName}>{children}</div> : null}

        <footer className="mt-10 pt-4">
          <div className="flex flex-col gap-4 border-t border-white/8 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <InternalNav
              href="/"
              className="text-slate-500 transition hover:text-white"
            >
              © {new Date().getFullYear()} Lance Wolfe
            </InternalNav>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="group inline-flex items-center justify-center rounded-full border border-white/8 bg-white/[0.02] p-1.5 text-slate-300/85 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                >
                  <span className="social-badge" aria-hidden="true">
                    {item.icon === "f" ? (
                      <span className="social-facebook">f</span>
                    ) : (
                      <span className="social-instagram">
                        <span className="social-instagram-ring" />
                        <span className="social-instagram-dot" />
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
