import type { Metadata } from "next";
import { ResumeHub } from "./resume-hub";

export const metadata: Metadata = {
  title: "Lance Wolfe | Resumes",
  description: "Simple resume hub with view and download links for Lance Wolfe's current resumes.",
};

export default function CareerPage() {
  return <ResumeHub />;
}
