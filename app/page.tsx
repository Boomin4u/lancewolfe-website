import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "./site-shell";
import { buildPageMetadata } from "./seo";
import { ProofOverview } from "./career/proof-overview";
import { ReviewSection } from "./review-section";
import { OpportunityCta } from "./opportunity-cta";
import { contactHref } from "./contact";

export const metadata: Metadata = buildPageMetadata({
  title: "Lance Wolfe | Live Event Operations & Staffing",
  description:
    "Official website of Lance Wolfe, a Florida-based live-event operations, staffing, hospitality, and festival professional with nationwide experience.",
  path: "/",
});

export default function Home() {
  return (
    <SiteShell
      eyebrow="Lance Wolfe"
      title="Lance Wolfe"
      subtitle="Florida-based. Nationwide experience."
      body="Live-event operations leader with 11+ years across hospitality, festival staffing, and national event programs."
      primary={{ href: "/career/", label: "View resumes" }}
      secondary={{ href: contactHref, label: "Contact Lance" }}
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
      <ProofOverview />

      <ReviewSection />

      <OpportunityCta compact />
    </SiteShell>
  );
}
