import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Lance Wolfe | Resumes",
  description: "Redirects to the simple resume hub.",
};

export default function StaffingPage() {
  redirect("/career");
}
