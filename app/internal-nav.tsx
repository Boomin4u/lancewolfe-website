"use client";

import type { ReactNode } from "react";

type InternalNavProps = {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  title?: string;
};

export function InternalNav({
  href,
  className,
  children,
  ...props
}: InternalNavProps) {
  return (
    <a
      href={href}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
