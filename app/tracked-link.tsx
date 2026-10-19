"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function TrackedLink({
  eventName,
  eventLocation,
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName: string;
  eventLocation: string;
  children: ReactNode;
}) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;

        const detail = { location: eventLocation, destination: href };
        window.plausible?.(eventName, { props: detail });
        window.dispatchEvent(new CustomEvent("lancewolfe:analytics", { detail: { eventName, ...detail } }));
      }}
    >
      {children}
    </a>
  );
}
