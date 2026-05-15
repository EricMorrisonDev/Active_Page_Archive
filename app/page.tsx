import type { Metadata } from "next";

import { IssueGrid } from "@/app/components/archive/IssueGrid";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse past issues of the magazine.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-neutral-50 dark:bg-neutral-950">
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
