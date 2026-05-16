"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { IssueGrid } from "@/app/components/archive/IssueGrid";
import { YearNav } from "@/app/components/layout/YearNav";
import {
  getAllIssues,
  getDemoYearNavYears,
  getIssuesByYear,
} from "@/lib/issues";

export function ArchiveBrowse() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Nav labels for the client demo; filtering still uses real issue data. */
  const navYears = useMemo(() => getDemoYearNavYears(), []);

  const selectedYear = useMemo(() => {
    const raw = searchParams.get("year");
    if (!raw) {
      return null;
    }
    const y = parseInt(raw, 10);
    if (!Number.isFinite(y) || !navYears.includes(y)) {
      return null;
    }
    return y;
  }, [searchParams, navYears]);

  const filteredIssues = useMemo(() => {
    if (selectedYear == null) {
      return getAllIssues();
    }
    return getIssuesByYear(selectedYear);
  }, [selectedYear]);

  const onYearChange = useCallback(
    (year: number | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (year == null) {
        params.delete("year");
      } else {
        params.set("year", String(year));
      }
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="mt-10 space-y-8">
      <YearNav
        years={navYears}
        selectedYear={selectedYear}
        onYearChange={onYearChange}
      />
      <IssueGrid
        issues={filteredIssues}
        emptyMessage={
          selectedYear != null
            ? `No issues for ${selectedYear} in the archive yet.`
            : "No issues in the archive yet."
        }
      />
    </div>
  );
}
