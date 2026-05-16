import { getAllIssues } from "@/lib/issues";
import type { Issue } from "@/lib/types";

import { IssueCard } from "./IssueCard";

export type IssueGridProps = {
  /** When omitted, all issues from the data source are shown (newest first). */
  issues?: Issue[];
  emptyMessage?: string;
  className?: string;
};

export function IssueGrid({
  issues,
  emptyMessage = "No issues in the archive yet.",
  className = "",
}: IssueGridProps) {
  const list = issues ?? getAllIssues();

  if (list.length === 0) {
    return (
      <p
        className={`font-sans text-sm text-neutral-500 ${className}`}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {list.map((issue) => (
        <li key={issue.id} className="min-w-0">
          <IssueCard issue={issue} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
