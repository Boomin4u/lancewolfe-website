"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribeToNavigation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

type InternalNavProps = {
  href: string;
  className?: string;
  activeClassName?: string;
  markActive?: boolean;
  children: ReactNode;
  "aria-label"?: string;
  title?: string;
};

export function InternalNav({
  href,
  className,
  activeClassName = "",
  markActive = false,
  children,
  ...props
}: InternalNavProps) {
  const path = useSyncExternalStore(
    subscribeToNavigation,
    () => window.location.pathname,
    () => "",
  );
  const destination = href.split(/[?#]/)[0];
  const isActive = markActive && href.startsWith("/") && (
    destination === "/"
      ? path === "/"
      : path === destination || path.startsWith(destination.endsWith("/") ? destination : `${destination}/`)
  );

  return (
    <a
      href={href}
      className={`${className ?? ""}${isActive ? ` ${activeClassName}` : ""}`}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
