import type { Metadata } from "next";
import Link from "next/link";

import { IssueGrid } from "@/app/components/archive/IssueGrid";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse past issues of the magazine.",
};

export default function ArchivePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
          >
            The Magazine
          </Link>
          <nav
            className="flex gap-6 font-sans text-sm text-neutral-600 dark:text-neutral-400"
            aria-label="Primary"
          >
            <Link
              href="/archive"
              className="font-medium text-neutral-900 dark:text-neutral-100"
              aria-current="page"
            >
              Archive
            </Link>
            <Link
              href="/"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Archive
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Every issue, sorted newest first. Year navigation and filters can plug
          in above the grid as the demo grows.
        </p>
        <div className="mt-10">
          <IssueGrid />
        </div>
      </main>
    </div>
  );
}
