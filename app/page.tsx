import type { Metadata } from "next";
import { Suspense } from "react";

import { ArchiveBrowse } from "@/app/components/archive/ArchiveBrowse";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse past issues of the magazine.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[var(--background)]">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-900">
          Archive
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-neutral-600">
          Browse by year, then open an issue to read it in full.
        </p>
        <Suspense
          fallback={
            <p className="mt-10 font-sans text-sm text-neutral-500">
              Loading archive…
            </p>
          }
        >
          <ArchiveBrowse />
        </Suspense>
      </main>
    </div>
  );
}
