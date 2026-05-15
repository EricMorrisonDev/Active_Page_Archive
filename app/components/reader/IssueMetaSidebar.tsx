import Link from "next/link";

import type { Issue } from "@/lib/types";

function formatDisplayDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) {
    return isoDate;
  }
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function tagLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function IssueMetaSidebar({ issue }: { issue: Issue }) {
  return (
    <div className="p-6 pb-10">
      <Link
        href="/"
        className="font-sans text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← All issues
      </Link>
      <h1 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {issue.title}
      </h1>
        <p className="mt-1 font-sans text-sm text-neutral-500 dark:text-neutral-400">
          {formatDisplayDate(issue.publication_date)}
        </p>
        {(issue.issue_number != null || issue.volume != null) && (
          <p className="mt-2 font-sans text-xs text-neutral-500 dark:text-neutral-400">
            {issue.volume != null ? `Vol. ${issue.volume}` : null}
            {issue.volume != null && issue.issue_number != null ? " · " : null}
            {issue.issue_number != null ? `No. ${issue.issue_number}` : null}
          </p>
        )}
        {issue.summary ? (
          <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {issue.summary}
          </p>
        ) : null}
        {issue.tags.length > 0 ? (
          <div className="mt-6">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Tags
            </h2>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {issue.tags.map((slug) => (
                <li
                  key={slug}
                  className="rounded-sm border border-neutral-200 bg-white px-2 py-0.5 font-sans text-[11px] font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                >
                  {tagLabel(slug)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {issue.featured_articles.length > 0 ? (
          <div className="mt-6">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              In this issue
            </h2>
            <ul className="mt-2 space-y-2">
              {issue.featured_articles.map((article) => (
                <li key={`${article.page}-${article.title}`}>
                  <Link
                    href={`/issues/${issue.id}?page=${article.page}`}
                    className="font-sans text-sm text-neutral-800 underline-offset-2 hover:underline dark:text-neutral-200"
                  >
                    <span className="font-medium">{article.title}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {" "}
                      (p. {article.page})
                    </span>
                  </Link>
                  {article.author ? (
                    <p className="mt-0.5 font-sans text-xs text-neutral-500 dark:text-neutral-400">
                      {article.author}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
    </div>
  );
}
