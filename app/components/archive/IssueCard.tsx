import Image from "next/image";
import Link from "next/link";

import type { Issue } from "@/lib/types";


// this converts the date to a human readabel string
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

// this converts slugs to readable strings with each word capitalized
function tagLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type IssueCardProps = {
  issue: Issue;
  className?: string;
};

const TAGS_ON_CARD = 3;

export function IssueCard({ issue, className = "" }: IssueCardProps) {
  const href = `/issues/${issue.id}`;
  const visibleTags = issue.tags.slice(0, TAGS_ON_CARD);
  const extraTagCount = issue.tags.length - visibleTags.length;

  return (
    <article className={`group ${className}`}>
      <Link
        href={href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={issue.cover_image}
            alt={`Cover — ${issue.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h2 className="font-serif text-base font-semibold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
            {issue.title}
          </h2>
          <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
            {formatDisplayDate(issue.publication_date)}
          </p>
          {visibleTags.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {visibleTags.map((slug) => (
                <li
                  key={slug}
                  className="rounded-sm border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tagLabel(slug)}
                </li>
              ))}
              {extraTagCount > 0 ? (
                <li className="font-sans text-[11px] text-neutral-400 dark:text-neutral-500">
                  +{extraTagCount}
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
