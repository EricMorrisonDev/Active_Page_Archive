"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import type { Issue } from "@/lib/types";

import { PdfReader } from "./PdfReader";

export function IssueReaderPanel({ issue }: { issue: Issue }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    const raw = searchParams.get("page");
    const n = raw ? parseInt(raw, 10) : 1;
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, [searchParams]);

  const onPageChange = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(next));
      }
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="flex min-h-[50vh] flex-1 flex-col lg:min-h-0">
      <PdfReader fileUrl={issue.pdf_url} page={page} onPageChange={onPageChange} />
    </div>
  );
}
