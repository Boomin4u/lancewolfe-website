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
    <button
      type="button"
      onClick={() => {
        window.location.assign(href);
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
