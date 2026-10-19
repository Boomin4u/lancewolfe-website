export function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="ml-2 inline-block h-4 w-4 shrink-0">
      <path d={external ? "M7 17 17 7M7 7h10v10" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}
