"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MASTHEAD = "The Magazine";

export function SiteHeader() {
  const pathname = usePathname();

  const homeActive = pathname === "/";
  const archiveActive =
    pathname === "/archive" ||
    pathname.startsWith("/archive/") ||
    pathname.startsWith("/issues");

  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
        >
          {MASTHEAD}
        </Link>
        <nav
          className="flex gap-6 font-sans text-sm text-neutral-600 dark:text-neutral-400"
          aria-label="Primary"
        >
          <Link
            href="/"
            className={
              homeActive
                ? "font-medium text-neutral-900 dark:text-neutral-100"
                : "hover:text-neutral-900 dark:hover:text-neutral-100"
            }
            aria-current={homeActive ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/archive"
            className={
              archiveActive
                ? "font-medium text-neutral-900 dark:text-neutral-100"
                : "hover:text-neutral-900 dark:hover:text-neutral-100"
            }
            aria-current={archiveActive ? "page" : undefined}
          >
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}
