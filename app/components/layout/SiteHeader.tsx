"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MASTHEAD = "The Magazine";

export function SiteHeader() {
  const pathname = usePathname();

  const onArchive =
    pathname === "/" || pathname.startsWith("/issues");

  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
        >
          {MASTHEAD}
        </Link>
        <p
          className={
            onArchive
              ? "font-sans text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
              : "font-sans text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500"
          }
        >
          Archive demo
        </p>
      </div>
    </header>
  );
}
