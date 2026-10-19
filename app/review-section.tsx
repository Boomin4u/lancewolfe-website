const reviews = [
  {
    name: "Amber H.",
    topic: "Responsiveness",
    quote:
      "Even while managing communication with hundreds of applicants, he was incredibly responsive and always made time to answer my questions.",
    context: "Staff feedback · Event Aces",
    href: "https://maps.app.goo.gl/Gop8RbLp9kW291Vr7",
  },
  {
    name: "Shannon N.",
    topic: "Team leadership",
    quote:
      "Lance really does a great job communicating and organizing his staff and provides the extra team spirit we all need!",
    context: "Staff feedback · Event Aces",
    href: "https://maps.app.goo.gl/BD9fGoZEuUffg6DS8",
  },
  {
    name: "Debbie C.",
    topic: "Guest experience",
    quote:
      "Our waiter Lance described many menu items since it was our first time. You can tell he likes his job",
    context: "Guest feedback · Luke’s Kitchen and Bar",
    href: "https://maps.app.goo.gl/TMCKLj2YPFLDwS7DA",
  },
] as const;

export function ReviewSection() {
  return (
    <section aria-labelledby="reviews-heading" className="my-8 sm:my-10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-100/78">
        Staff &amp; guest experiences
      </p>
      <h2
        id="reviews-heading"
        className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
      >
        What people say about working with me
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        From clear communication behind the scenes to attentive service in the
        moment.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="flex min-w-0 flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100/80">
              {review.topic}
            </p>
            <blockquote cite={review.href} className="my-5 text-base leading-8 text-slate-100">
              <p>“{review.quote}”</p>
            </blockquote>
            <figcaption className="mt-auto border-t border-white/10 pt-4">
              <p className="text-sm font-semibold text-white">{review.name}</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                {review.context}
              </p>
              <a
                href={review.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${review.name}’s original Google review (opens in a new tab)`}
                className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-xs text-sky-100 underline decoration-sky-200/35 underline-offset-4 transition hover:text-white hover:decoration-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
              >
                Read Google review <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
