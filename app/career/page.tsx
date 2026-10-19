import type { Metadata } from "next";
import { buildPageMetadata } from "../seo";
import { ResumeHub } from "./resume-hub";

export const metadata: Metadata = buildPageMetadata({
  title: "Lance Wolfe | Event Production Career & Resumes",
  description:
    "Explore 11+ years of Lance Wolfe’s event production, talent buying & marketing, operations, staffing, and premium hospitality experience. View resumes and event history.",
  path: "/career/",
});

export default function CareerPage() {
  return <ResumeHub />;
}
