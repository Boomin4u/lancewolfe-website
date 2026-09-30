import type { Metadata } from "next";
import { buildPageMetadata } from "../seo";
import { ResumeHub } from "./resume-hub";

export const metadata: Metadata = buildPageMetadata({
  title: "Lance Wolfe | Event Operations Career & Resumes",
  description:
    "Explore Lance Wolfe’s live-event operations, staffing, hospitality, and festival career with current resumes and nationwide event history.",
  path: "/career/",
});

export default function CareerPage() {
  return <ResumeHub />;
}
